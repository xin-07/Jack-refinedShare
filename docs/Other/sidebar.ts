import type { DefaultTheme } from 'vitepress'

const sidebarOther: DefaultTheme.SidebarGroup = {
  text: 'Other',
  items: [
    // 置顶文章 - 始终保持在最前面
    { text: 'Jack核心投资策略', link: '/Other/docs/Jack核心投资策略总结' },
  ],
}

export default sidebarOther
