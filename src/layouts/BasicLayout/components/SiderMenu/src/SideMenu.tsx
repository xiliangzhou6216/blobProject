// tsx TSX（defineComponent） 中 components、props、emits 等的声明是省不了的
// 定义
import Icon from '~/components/Icon/index'
import { PropType } from 'vue'
import { MenuItemData } from '../../../utils/types'
import { createWebHashHistory } from 'vue-router'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import './style.less'
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
  setup(props, { emit }) {
    // 定义菜单数据
    const state = reactive<any>({
      collapsed: false, // default value
      openKeys: [], // 当前展开的 SubMenu 菜单项 key 数组
      selectedKeys: [], // 当前选中的菜单项 key 数组
    })
    const router = useRouter()
    const { proxy }: any = getCurrentInstance()
    // 菜单选中
    const onSelect = (e: { key: string }) => {
      router.push(e.key)
    }

    // 立即执行 追踪响应式 触发回调 默认pre
    watchEffect(() => {
      if (router.currentRoute) {
        // 标准化的路由记录数组 从上到下 ['/app', '/app/others', '/app/others/child']
        const matched = router.currentRoute.value.matched.slice()
        state.selectedKeys = matched.filter((r) => r.name !== 'index').map((r) => r.path)
        state.openKeys = matched
          .filter((r) => r.path !== router.currentRoute.value.path)
          .map((r) => r.path)
      }
    })

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
        width={props.menuWidth}
        collapsedWidth={54}
        class='sideMenu'
        theme={props.theme}
        trigger={null}
        collapsible
        collapsed={state.collapsed}
        breakpoint='lg'
        onBreakpoint={(val: boolean) => (state.collapsed = val)}
      >
        <a-menu
          selectedKeys={state.selectedKeys}
          mode='inline'
          theme={props.theme}
          {...(state.collapsed ? {} : { openKeys: state.openKeys })}
          class='sideMenu-menu'
          onOpenChange={(openKeys: string[]) => (state.openKeys = openKeys)}
          onSelect={onSelect}
        >
          {getMenuTree(props.menuData)}
          {/* <div class='sideMenu-footer'>
            {h(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              class: 'trigger',
              style: { fontSize: 16 },
              onClick: () => (state.collapsed = !state.collapsed),
            })}
          </div> */}
        </a-menu>
      </a-layout-sider>
    )
  },
})
