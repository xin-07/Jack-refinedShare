# CLAUDE.md

## 项目概述

这是一个基于 VitePress 的个人内容分享站点，用于分享「Jack要加油」频道的各类内容，涵盖思想实验、商业启蒙、读书笔记等多个栏目。

## 技术栈

- **框架**：VitePress 1.0.0-alpha.28
- **运行时**：Vue 3.2.44
- **包管理器**：Bun（见 `bun.lock`）
- **模块系统**：ESM（`"type": "module"`）

## 目录结构

```
docs/
├── .vitepress/
│   ├── config.ts          # 站点配置（标题、导航栏、侧边栏）
│   └── theme-config.ts    # 导航栏与侧边栏定义
├── index.md               # 首页
├── 365天思想实验/          # 每日思想实验
├── Jack商业启蒙/           # 商业启蒙
├── 《思考，快与慢》/        # 《思考，快与慢》读书笔记
├── 《小岛经济学》/          # 《小岛经济学》读书笔记
└── public/
    └── photo/             # 静态图片资源
```

## 常用命令

```bash
bun run dev      # 启动开发服务器
bun run build    # 构建生产版本
bun run serve    # 预览生产构建
```

## 开发约定

- 所有内容文件位于 `docs/` 目录下
- 每个栏目拥有独立的 `index.md` 和 `sidebar.ts`
- 各栏目的侧边栏配置在 `docs/.vitepress/theme-config.ts` 中统一导入
- 静态资源放在 `docs/public/` 目录下
- 内容使用中文（zh-CN）编写
- Markdown 文件在需要时使用 VitePress frontmatter（`layout: doc`）
