// tsx TSX（defineComponent） 中 components、props、emits 等的声明是省不了的
// 定义

interface Props{
  name?:string,
  age?:number
}

// const a:Props={name:111}
import { Layout, Menu, Space } from 'ant-design-vue';
export default defineComponent({
  // props:{

  // },
  setup(props,ctx){
    const state = reactive<any>({
      collapsed: true, // default value
      openKeys: [],
      selectedKeys: [],
    });
    const onSelect=(e:{})=>{
      console.log(e)
    }
    return ()=>(
      <>
      <div>
        4334
        <a-menu   
        selectedKeys={state.selectedKeys} 
        mode="inline" 
        theme="light"  
        {...(state.collapsed ? {} : { openKeys: state.openKeys })}
        class="sider-a-menu"
        onOpenChange={(openKeys:string[] )=>(state.openKeys = openKeys)}
        onSelect={onSelect}
        >
          <a-sub-menu key="sub1">
              <a-menu-item key="1">option1</a-menu-item>
              <a-menu-item key="2">option2</a-menu-item>
            </a-sub-menu>
        </a-menu>
      </div>
      </>
    ) 
  }
})