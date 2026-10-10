# CLAUDE.md

## 项目概述

这是一个基于 VitePress 的个人内容分享站点，用于分享「Jack要加油」频道的各类内容，涵盖思想实验、商业启蒙、读书笔记等多个栏目。

## 技术栈

- **框架**：VitePress ^1.6.4（默认主题，无自定义 theme/组件）
- **运行时**：Vue ^3.5.41
- **包管理器**：Bun（见 `bun.lock`）
- **模块系统**：ESM（`"type": "module"`）

## 目录结构

```
Jack-member/
├── package.json                # scripts: dev / check / build / serve / deploy
├── scripts/
│   ├── check-commit-msg.js     # commit-msg 门禁（Why:/What:）
│   └── check-sidebars.mjs      # 侧栏↔文件一致性门禁（死链/孤儿/注册关系）
├── .husky/                     # Git 钩子：commit-msg（Why/What）、pre-push（校验+构建）
└── docs/
    ├── .vitepress/
    │   ├── config.ts           # 站点配置（lang/title + 引入 nav/sidebar/search）
    │   ├── theme-config.ts     # 导航栏与侧边栏统一注册
    │   └── search-config.ts    # 本地搜索（中文）配置
    ├── index.md                # 首页
    ├── public/photo/           # 静态图片资源
    ├── SPEC/archify/           # 站点架构图存档
    ├── 365天思想实验/           # 每日思想实验（index.md + sidebar.ts + docs/）
    ├── Jack商业启蒙/            # 每周公司/策略拆解
    ├── 《思考，快与慢》/         # 读书笔记（每日正文 + 答案 + 周总结）
    ├── 《小岛经济学》/           # 读书笔记
    ├── 《穷爸爸富爸爸》/         # 读书笔记
    ├── 《被讨厌的勇气》/         # 读书笔记
    ├── Exquisite/              # 精选内容
    └── Other/                  # 频道思考与分享
```

## 常用命令

```bash
bun install      # 安装依赖
bun run dev      # 启动开发服务器（交由人类启动）
bun run check    # 侧栏一致性校验（不构建）
bun run build    # 校验 + 构建生产版本
bun run serve    # 预览生产构建
```

## 开发约定

- AI 不能自行启动项目，项目启动交给人类操作，AI 只需告知启动指令即可（`bun run build`/`bun run check` 属于校验，可执行）
- 所有内容文件位于 `docs/` 目录下
- 每个栏目拥有独立的 `index.md` 和 `sidebar.ts`
- 各栏目的侧边栏配置在 `docs/.vitepress/theme-config.ts` 中统一导入（新栏目必须同时注册 nav 与 sidebar 映射）
- 静态资源放在 `docs/public/` 目录下
- 内容使用中文（zh-CN）编写
- Markdown 文件在需要时使用 VitePress frontmatter（`layout: doc`）
- 文件名可含全角字符（书名号、全角引号）与空格；**侧栏 link 必须与文件名逐字一致**（半角/全角引号不一致即死链）

## 内容发布门禁（scripts/check-sidebars.mjs）

新增或删除内容后运行 `bun run check`，`bun run build` 会自动先跑该校验；push 时 `.husky/pre-push` 钩子会执行 `bun run build`，校验失败则拒绝 push。它拦截三类事故：

1. **死链**：`sidebar.ts` 的 link 指向不存在的 `.md`（如引号全角/半角不一致）
2. **孤儿**：`docs/<栏目>/docs/` 下的文件没登记进 `sidebar.ts`（文章永远无法被访问）；写草稿时可临时用 `node scripts/check-sidebars.mjs --allow-orphans` 降级为警告
3. **未注册**：新增栏目忘记在 `theme-config.ts` 注册 nav/sidebar

## 提交约定

- 代码变更（`feat` / `fix` / `refactor` / `perf` / `test`）的 commit 必须同时包含 `Why:`（为什么改，根因）与 `What:`（具体做了什么）两行，否则 commit-msg 钩子拒绝提交
- `docs` / `chore` / `style` 变更可省略 `Why:` / `What:`
- 提交前自问：*设计错了？代码错了？测试错了？* 三者均为有效答案
