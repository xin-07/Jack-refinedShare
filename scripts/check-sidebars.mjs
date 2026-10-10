#!/usr/bin/env node

// 侧栏一致性门禁 —— 防止两类真实事故：
//   1. 死链：sidebar.ts 的 link 指向不存在的 .md（例：全角/半角引号不一致导致 404）
//   2. 孤儿：内容文件已写入 docs/<栏目>/docs/ 却没登记进 sidebar.ts（文章永远无法被访问）
// 附加校验：栏目目录 ↔ theme-config.ts 的 nav/sidebar 注册关系（README「添加新内容」第 3 步的执行层）。
//
// 用法：
//   node scripts/check-sidebars.mjs                 # 死链 + 孤儿 + 注册关系，任一失败退出码 1
//   node scripts/check-sidebars.mjs --allow-orphans # 孤儿降级为警告（写草稿时用）

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const DOCS_ROOT = fileURLToPath(new URL('../docs', import.meta.url))
const ALLOW_ORPHANS = process.argv.includes('--allow-orphans')

const errors = []
const warnings = []

// ---------- 工具 ----------

/** 解析 JS 字符串字面量里的转义（ “ ” \' \" \\ ） */
function decodeJsString(raw) {
  return raw.replace(/\\u([0-9a-fA-F]{4})|\\(.)/g, (m, hex, ch) =>
    hex ? String.fromCharCode(parseInt(hex, 16)) : ch
  )
}

/** 从 sidebar.ts 源码提取所有 link 值（已解码） */
function extractLinks(source) {
  return [...source.matchAll(/link:\s*(['"])((?:\\.|(?!\1).)*)\1/g)].map((m) => decodeJsString(m[2]))
}

/** link('/col/docs/xxx') -> 命中的磁盘路径，或 null（不存在/外链） */
function resolveLinkFile(link) {
  if (/^https?:\/\//.test(link)) return null
  const p = decodeURIComponent(link).replace(/^\//, '')
  const candidates = p.endsWith('.md') ? [p] : [`${p}.md`, `${p}/index.md`]
  for (const c of candidates) {
    const full = path.join(DOCS_ROOT, c)
    if (fs.existsSync(full)) return full
  }
  return null
}

/** docs/<栏目>/docs/*.md 相对站点根的规范 link（不含扩展名） */
function fileLink(col, file) {
  return `/${col}/docs/${file.replace(/\.md$/, '')}`
}

// ---------- 1. 扫描栏目 ----------

const columns = fs
  .readdirSync(DOCS_ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
  .map((d) => d.name)
  .filter((name) => fs.existsSync(path.join(DOCS_ROOT, name, 'sidebar.ts')))

/** 第一遍：收集所有侧栏链接（含跨栏目引用），供孤儿判定使用 */
const linksByCol = new Map()
const allLinks = new Set()
for (const col of columns) {
  const links = extractLinks(fs.readFileSync(path.join(DOCS_ROOT, col, 'sidebar.ts'), 'utf8'))
  linksByCol.set(col, links)
  links.forEach((l) => allLinks.add(l))
}

/** 第二遍：逐栏目校验 */
for (const col of columns) {
  const links = linksByCol.get(col)
  const contentDir = path.join(DOCS_ROOT, col, 'docs')
  const files = fs.existsSync(contentDir)
    ? fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'))
    : []

  const dead = [...new Set(links.filter((l) => !resolveLinkFile(l)))]
  for (const l of dead) errors.push(`死链  docs/${col}/sidebar.ts  →  ${l}`)

  const orphan = files.filter((f) => !allLinks.has(fileLink(col, f)))
  if (orphan.length) {
    const msg = `孤儿  docs/${col}/docs/  ${orphan.length} 篇未登记 sidebar.ts：${orphan.join('、')}`
    ;(ALLOW_ORPHANS ? warnings : errors).push(msg)
  }

  if (!fs.existsSync(path.join(DOCS_ROOT, col, 'index.md'))) {
    errors.push(`缺页  docs/${col}/index.md 不存在（约定：每个栏目自带 index.md）`)
  }

  const flags = [dead.length && `死链 ${dead.length}`, orphan.length && `孤儿 ${orphan.length}`]
    .filter(Boolean)
    .join(' / ')
  console.log(`[OK] ${col}：内容 ${files.length} 篇 · 侧栏 ${links.length} 条${flags ? ` · ⚠ ${flags}` : ''}`)
}

// ---------- 2. theme-config.ts 注册关系 ----------

const themeConfigPath = path.join(DOCS_ROOT, '.vitepress', 'theme-config.ts')
if (fs.existsSync(themeConfigPath)) {
  const src = fs.readFileSync(themeConfigPath, 'utf8')

  const mapped = new Set([...src.matchAll(/^\s*'\/([^/']+)\/':/gm)].map((m) => m[1]))
  for (const col of columns) {
    if (!mapped.has(col)) errors.push(`未注册  .vitepress/theme-config.ts 缺少 '/${col}/' 侧栏映射`)
  }
  for (const key of mapped) {
    if (!columns.includes(key)) errors.push(`空注册  theme-config.ts 映射 '/${key}/'，但该目录下没有 sidebar.ts`)
  }

  const navCols = new Set([...src.matchAll(/link:\s*'\/([^/']+)/g)].map((m) => m[1]))
  for (const col of columns) {
    if (!navCols.has(col)) warnings.push(`导航缺失  theme-config.ts 的 nav 未包含栏目「${col}」`)
  }
}

// ---------- 结果 ----------

for (const w of warnings) console.warn(`⚠ ${w}`)

if (errors.length) {
  console.error(`\n✖ 侧栏校验失败（${errors.length} 项）：`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}

console.log(`\n✔ 侧栏校验通过：${columns.length} 个栏目 · ${allLinks.size} 条链接${warnings.length ? ` · ${warnings.length} 条警告` : ''}`)
