# Jack要加油 — 专属会员分享站

基于 VitePress 的会员内容分享网站，涵盖思想实验、商业启蒙、读书笔记等栏目。

## 项目简介

本站点用于分享「Jack要加油」频道的内容，包含以下栏目：

- **365天思想实验** — 每天围绕一个定律、效应、模型或思想实验，涵盖数学、经济学、物理、生物学、心理学等领域
- **Jack商业启蒙** — 每周拆解一家优秀公司或投资策略
- **《思考，快与慢》读书笔记** — 丹尼尔·卡尼曼经典著作的逐章解读与思考
- **《小岛经济学》读书笔记** — 用故事理解经济学核心原理

## 技术栈

| 技术 | 版本 |
|------|------|
| VitePress | 1.0.0-alpha.28 |
| Vue | 3.2.44 |
| Bun | 包管理器 |

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
```

## 项目结构

```
Jack-member/
├── CLAUDE.md                        # Claude AI 协作指南
├── README.md                        # 项目说明
├── package.json
├── bun.lock
└── docs/
    ├── .vitepress/
    │   ├── config.ts                # VitePress 站点配置
    │   └── theme-config.ts          # 导航栏与侧边栏配置
    ├── index.md                     # 首页
    ├── public/
    │   └── photo/                   # 静态图片资源
    ├── 365天思想实验/               # 思想实验栏目
    │   ├── index.md
    │   └── sidebar.ts
    ├── Jack商业启蒙/                # 商业启蒙栏目
    │   ├── index.md
    │   ├── sidebar.ts
    │   └── docs/
    │       └── Jack商业启蒙——麦当劳.md
    ├── 《思考，快与慢》/             # 读书笔记栏目
    │   ├── index.md
    │   ├── sidebar.ts
    │   └── docs/
    │       ├── 《思考，快与慢》读懂自己的大脑.md
    │       ├── 《思考，快与慢》｜第1天.md
    │       └── ...（更多章节）
    └── 《小岛经济学》/              # 读书笔记栏目
        ├── index.md
        └── sidebar.ts
```

## 添加新内容

1. 在 `docs/` 对应栏目目录下创建 `.md` 文件
2. 在该栏目的 `sidebar.ts` 中添加对应的侧边栏条目
3. 如需新增栏目，在 `docs/.vitepress/theme-config.ts` 中添加导航和侧边栏配置
