import { DefaultTheme } from 'vitepress'
import sidebar365 from '../365天思想实验/sidebar'
import sidebarBusiness from '../Jack商业启蒙/sidebar'
import sidebarThinking from '../《思考，快与慢》/sidebar'
import sidebarIsland from '../《小岛经济学》/sidebar'
import sidebarOther from '../Other/sidebar'

const nav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/', activeMatch: '^/$' },
  { text: '365天思想实验', link: '/365天思想实验/index', activeMatch: '/365天思想实验/' },
  { text: 'Jack商业启蒙', link: '/Jack商业启蒙/index', activeMatch: '/Jack商业启蒙/' },
  { text: '《思考，快与慢》', link: '/《思考，快与慢》/index', activeMatch: '/《思考，快与慢》/' },
  { text: '《小岛经济学》', link: '/《小岛经济学》/index', activeMatch: '/《小岛经济学》/' },
  { text: 'Other', link: '/Other/index', activeMatch: '/Other/' }
]

const sidebar: DefaultTheme.Sidebar = {
  '/365天思想实验/': [sidebar365],
  '/《思考，快与慢》/': [sidebarThinking],
  '/Jack商业启蒙/': [sidebarBusiness],
  '/《小岛经济学》/': [sidebarIsland],
  '/Other/': [sidebarOther],
}

export { nav, sidebar }
