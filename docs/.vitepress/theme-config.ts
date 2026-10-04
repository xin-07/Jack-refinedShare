import { DefaultTheme } from 'vitepress'
import sidebar365 from '../365天思想实验/sidebar'
import sidebarBusiness from '../Jack商业启蒙/sidebar'
import sidebarThinking from '../《思考，快与慢》/sidebar'
import sidebarIsland from '../《小岛经济学》/sidebar'
import sidebarRichDad from '../《穷爸爸富爸爸》/sidebar'
import sidebarCourage from '../《被讨厌的勇气》/sidebar'
import sidebarExquisite from '../Exquisite/sidebar'
import sidebarOther from '../Other/sidebar'

const nav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/', activeMatch: '^/$' },
  { text: '365天思想实验', link: '/365天思想实验/index', activeMatch: '/365天思想实验/' },
  { text: 'Jack商业启蒙', link: '/Jack商业启蒙/index', activeMatch: '/Jack商业启蒙/' },
  { text: '《思考，快与慢》', link: '/《思考，快与慢》/index', activeMatch: '/《思考，快与慢》/' },
  { text: '《小岛经济学》', link: '/《小岛经济学》/index', activeMatch: '/《小岛经济学》/' },
  { text: '《穷爸爸富爸爸》', link: '/《穷爸爸富爸爸》/index', activeMatch: '/《穷爸爸富爸爸》/' },
  { text: '《被讨厌的勇气》', link: '/《被讨厌的勇气》/index', activeMatch: '/《被讨厌的勇气》/' },
  { text: 'Exquisite', link: '/Exquisite/index', activeMatch: '/Exquisite/' },
  { text: 'Other', link: '/Other/index', activeMatch: '/Other/' },
]

const sidebar: DefaultTheme.Sidebar = {
  '/365天思想实验/': [sidebar365],
  '/《思考，快与慢》/': [sidebarThinking],
  '/Jack商业启蒙/': [sidebarBusiness],
  '/《小岛经济学》/': [sidebarIsland],
  '/《穷爸爸富爸爸》/': [sidebarRichDad],
  '/《被讨厌的勇气》/': [sidebarCourage],
  '/Exquisite/': [sidebarExquisite],
  '/Other/': [sidebarOther],
}

export { nav, sidebar }
