import { defineConfig } from 'vitepress'
import { nav, sidebar } from './theme-config'
import { search } from './search-config'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Jack要加油',
  themeConfig: {
    nav,
    sidebar,
    search,
  },
})