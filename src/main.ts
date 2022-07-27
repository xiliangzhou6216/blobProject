// https://cn.windicss.org/integrations/vite.html
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// 自定义的 css
import './styles/main.css'

import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

import { createApp } from 'vue'
import App from './App.vue'
import { setupGlobDirectives } from './directives'
import './router/permission'
import { useUserStoreWithOut } from '~/store/modules/user'
import { usePermissionStoreWithOut } from '~/store/modules/permission'
const useStore = useUserStoreWithOut()
const usePermission = usePermissionStoreWithOut()

// 工具类
import { parseTime } from '~/utils/parse-time'

// 批量处理文件
const modules = import.meta.globEager('./modules/*.ts')

const app = createApp(App)

// i18n pinna 插件自动加载注册
Object.values(modules).forEach((item) => {
  if (typeof item.default === 'function') {
    item.default(app)
  }
})
// Register global directive 指令
setupGlobDirectives(app)

app.mount('#app')

// 错误拦截
interface log {
  url: string
  info: string
  time: string | null
  err: unknown
  name: string
  type: string
}

// https://vuejs.org/api/application.html#app-config-
// 错误处理收集
app.config.errorHandler = (err: unknown, instance: any, info: string) => {
  console.error(err, 'err')
  const data: log = {
    url: window.location.href,
    info, // vue 错误的信息
    err,
    // 手动添加的type 为 info
    type: 'Bug',
    name: usePermission.getUserInfo.username as string,
    time: parseTime(new Date()),
  }
  useStore.setErrorLog(data)
}

// 全局挂载

app.config.globalProperties.defaultData = { name: 'xiLiang' }
