// tsx TSX（defineComponent） 中 components、props、emits 等的声明是省不了的
// 定义

// import router from '~/router/router.config'
import Icon from '~/components/Icon/index'
import { PropType } from 'vue'
import { MenuItemData } from '../utils/types'
import { clearMenuItem, filterRoutes } from '../utils/index'
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
      selectedKeys: [],
    })

    // 菜单选中
    const onSelect = (e: {}) => {
      console.log(e)
    }

    const mdata = clearMenuItem(useRouter().getRoutes()).filter(({ path }) =>
      path.startsWith('/app/')
    )
    // menuData
    const menuData = filterRoutes(mdata)
    console.log(menuData)

    // icon
    const getIcon = (type: string) => (type ? <Icon type={type} /> : null)

    // 获取菜单树
    const getMenuTree = (data: MenuDataItem[]) => {
      return data.map((item) => {
        if (item.children) {
          console.log(item, 66)
          return <a-sub-menu key={item.path}></a-sub-menu>
        }
        // return (
        //   <>
        //     <a-menu-item key={item.path}>
        //       {getIcon(item.meta?.icon as string)}
        //       <span>{item.meta?.title}</span>
        //     </a-menu-item>
        //   </>
        // )
      })
    }
    // console.log(getMenuTree(menuData))
    return () => (
      <a-layout-sider
        width={208}
        collapsedWidth={54}
        class='sideMenu'
        theme='light'
        trigger={null}
        collapsible={true}
        collapsed={state.collapsed}
        breakpoint='lg'
        onBreakpoint={(val: boolean) => (state.collapsed = val)}
      >
        <a-menu
          selectedKeys={state.selectedKeys}
          mode='inline'
          theme='light'
          {...(state.collapsed ? {} : { openKeys: state.openKeys })}
          class='sideMenu-sider_menu'
          onOpenChange={(openKeys: string[]) => (state.openKeys = openKeys)}
          onSelect={onSelect}
        >
          {getMenuTree(menuData)}

          {/* <a-sub-menu
            key='sub1'
            title={
              <>
                <span>菜单</span>
              </>
            }
          >
            <a-menu-item key='1'>option1</a-menu-item>
            <a-menu-item key='2'>option2</a-menu-item>
          </a-sub-menu> */}
        </a-menu>
      </a-layout-sider>
    )
  },
})
