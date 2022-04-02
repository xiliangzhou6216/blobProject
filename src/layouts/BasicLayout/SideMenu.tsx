// tsx TSX（defineComponent） 中 components、props、emits 等的声明是省不了的
// 定义

import router from '~/router/router.config'
import Icon from '~/components/Icon/index'
interface Props {
  name?: string
  age?: number
}

// const a:Props={name:111}
export default defineComponent({
  // props:{

  // },
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

    const routerData = router.filter((item) => item)

    const urouter = useRouter()
    console.log(urouter.getRoutes())

    // icon
    const getIcon = (type: string) => (type ? <Icon type={type} /> : null)

    console.log(router, 1111)
    // 获取菜单树
    const getMenuTree = (data: []) => {
      return data.map((item) => {
        if (item.children) {
          console.log(item.children)
          // return (
          //   <a-sub-menu key={item.path} >
          //     {
          //       console.log(item,1111)
          //     }
          //     {/* {getMenuTree(item.children)} */}
          //   </a-sub-menu>
          // )
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
        class='sideMenu-sider'
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
          {/* {getMenuTree(router)} */}

          <a-sub-menu
            key='sub1'
            title={
              <>
                <span>sdhfjhsfdjsd</span>
              </>
            }
          >
            <a-menu-item key='1'>option1</a-menu-item>
            <a-menu-item key='2'>option2</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
    )
  },
})
