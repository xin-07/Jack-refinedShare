# Jack要加油 — 专属会员分享站

基于 VitePress 的会员内容分享网站，涵盖思想实验、商业启蒙、读书笔记等栏目。

**项目网址**：[https://jack.xiny06.workers.dev/](https://jack.xiny06.workers.dev/)

## 项目简介

本站点用于分享「Jack要加油」频道的内容，包含以下栏目：

- **365天思想实验** — 每天围绕一个定律、效应、模型或思想实验，涵盖数学、经济学、物理、生物学、心理学等领域（目前已更新至第119天）
- **Jack商业启蒙** — 每周拆解一家优秀公司或投资策略（麦当劳、开市客、SpaceX、泡泡玛特、美光、Nike 等 16 期）
- **《思考，快与慢》读书笔记** — 丹尼尔·卡尼曼经典著作的逐章解读与思考（已完成 30 天，含每日问题与答案）
- **《小岛经济学》读书笔记** — 用故事理解经济学核心原理（已完成 30 天并附总结）
- **《穷爸爸富爸爸》读书笔记** — 罗伯特·清崎经典理财著作的逐章解读（已更新至第 20 天与终篇）
- **Exquisite** — 精选内容，深度思考
- **Other** — Jack要加油频道的思考与分享

## 技术栈

| 技术 | 版本 |
|------|------|
| VitePress | ^1.6.4 |
| Vue | ^3.5.41 |
| Bun | 包管理器 |
| Husky | Git 钩子（`commit-msg` 提交校验） |

## 快速开始

```bash
# 安装依赖
bun install

# 启动开发服务器
bun run dev

# 构建生产版本
bun run build

# 预览生产构建
bun run serve

# 构建并部署到 Cloudflare Workers
bun run deploy
```

## 项目结构

```
Jack-member/
├── CLAUDE.md                        # Claude AI 协作指南
├── README.md                        # 项目说明
├── package.json
├── bun.lock
├── scripts/
│   └── check-commit-msg.js          # commit-msg 校验脚本（要求 Why:/What:）
├── .husky/                          # Git 钩子（commit-msg 提交校验）
└── docs/
    ├── .vitepress/
    │   ├── config.ts                # VitePress 站点配置（标题、语言、导航、侧边栏、搜索）
    │   ├── theme-config.ts          # 导航栏与侧边栏定义
    │   └── search-config.ts         # 本地搜索（中文）配置
    ├── index.md                     # 首页
    ├── public/photo/                # 静态图片资源
    ├── SPEC/archify/                # 站点架构图（SVG/HTML/PNG 存档）
    ├── 365天思想实验/               # 思想实验栏目
    │   ├── index.md
    │   ├── sidebar.ts
    │   └── docs/                    # 118 篇内容
    ├── Jack商业启蒙/                # 商业启蒙栏目
    │   ├── index.md
    │   ├── sidebar.ts
    │   └── docs/                    # 16 篇公司/策略拆解
    ├── 《思考，快与慢》/             # 读书笔记栏目
    │   ├── index.md
    │   ├── sidebar.ts
    │   └── docs/                    # 30 天章节与总结
    ├── 《小岛经济学》/              # 读书笔记栏目
    │   ├── index.md
    │   ├── sidebar.ts
    │   └── docs/                    # 30 天章节与总结
    ├── 《穷爸爸富爸爸》/            # 读书笔记栏目
    │   ├── index.md
    │   ├── sidebar.ts
    │   └── docs/                    # 每日章节、答案、周总结与终篇
    ├── Exquisite/                  # 精选内容栏目
    │   ├── index.md
    │   ├── sidebar.ts
    │   └── docs/                    # 精选文章
    └── Other/                      # 思考与分享栏目
        ├── index.md
        ├── sidebar.ts
        └── docs/                    # 系列/独立文章
```

## 添加新内容

1. 在 `docs/` 对应栏目的 `docs/` 目录下创建 `.md` 文件
2. 在该栏目的 `sidebar.ts` 中按阅读顺序添加对应的侧边栏条目
3. 如需新增栏目，在 `docs/.vitepress/theme-config.ts` 中注册 `sidebar.ts` 并添加导航与侧边栏配置

## 提交约定

代码变更（`feat`/`fix`/`refactor`/`perf`/`test`）的 commit 必须同时包含 `Why:`（为什么改）与 `What:`（改了什么）两行，否则 commit-msg 钩子会拒绝提交（参见 `scripts/check-commit-msg.js`）。`docs`/`chore`/`style` 变更可省略。
