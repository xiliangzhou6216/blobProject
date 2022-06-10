// tsx TSX（defineComponent） 中 components、props、emits 等的声明是省不了的
// 定义
import Icon from '~/components/Icon/index'
import { PropType } from 'vue'
import { MenuItemData } from '../utils/types'
import { clearMenuItem, filterRoutes } from '../utils/index'
import { createWebHashHistory } from 'vue-router'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import './style.less'
import { router } from '~/modules/router'
interface Props {
  name?: string
  age?: number
}

export default defineComponent({
  name: 'BaseMenu',
  props: {
    theme: {
      type: String,
      default: 'light',
    },
    menuWidth: {
      type: Number,
      default: 208,
    },
    menuData: {
      type: Array as PropType<MenuItemData[]>,
      default: () => [],
    },
  },
  setup(props, ctx) {
    // 定义菜单数据
    const state = reactive<any>({
      collapsed: true, // default value
      openKeys: [],
      selectedKeys: [], // 菜单选中
    })
    // const router = useRouter()

    // 菜单选中
    const onSelect = (e: { key: string }) => {
      console.log(e.key)
      router.push(e.key)
    }

    const mdata = clearMenuItem(router.getRoutes()).filter(({ path }) => path.startsWith('/app/'))
    // menuData
    const menuData = filterRoutes(mdata)
    // console.log(menuData)

    // icon
    const getIcon = (type: string) => (type ? <Icon type={type} /> : null)
    // 菜单树
    const getMenuTree = (data: MenuItemData[]) => {
      return data.map((item) => {
        if (item.children) {
          return (
            <>
              <a-sub-menu
                key={item.path}
                title={
                  <>
                    {getIcon(item.meta?.icon as string)}
                    <span>{item.meta?.title}</span>
                  </>
                }
              >
                {getMenuTree(item.children)}
              </a-sub-menu>
            </>
          )
        }
        return (
          <>
            <a-menu-item key={item.path}>
              {getIcon(item.meta?.icon as string)}
              <span>{item.meta?.title}</span>
            </a-menu-item>
          </>
        )
      })
    }
    return () => (
      <a-layout-sider
        width={208}
        collapsedWidth={54}
        class='sideMenu'
        theme='light'
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        breakpoint='lg'
        onBreakpoint={(val: boolean) => {
          state.collapsed = val
        }}
      >
        <a-menu
          selectedKeys={state.selectedKeys}
          mode='inline'
          theme='light'
          {...(state.collapsed ? {} : { openKeys: state.openKeys })} // 当前展开的 SubMenu 菜单项 key 数组
          class='sideMenu-menu'
          onOpenChange={(openKeys: string[]) => (state.openKeys = openKeys)}
          onSelect={onSelect}
        >
          {getMenuTree(menuData)}
          <div class='sideMenu-footer'>
            {h(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              class: 'trigger',
              style: { fontSize: 16 },
              onClick: () => (state.collapsed = !state.collapsed),
            })}
          </div>
        </a-menu>
      </a-layout-sider>
    )
  },
})
