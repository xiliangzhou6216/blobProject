// https://cn.windicss.org/integrations/vite.html
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
// 自定义的 css
import './styles/main.css'

import 'virtual:windi-utilities.css'
import 'virtual:windi-devtools'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import { setupGlobDirectives } from './directives'
import './router/permission'
import { useUserStoreWithOut } from '~/store/modules/user'
import { usePermissionStoreWithOut } from '~/store/modules/permission'
import { i18n } from '../locales/i18n'

import { useLocaleStoreWithOut } from '~/store/modules/locale'

// 工具类
import { parseTime } from '~/utils/parse-time'
const useStore = useUserStoreWithOut()
const usePermission = usePermissionStoreWithOut()

const app = createApp(App)

// // 初始化语言
// const localeStore = useLocaleStoreWithOut()
// localeStore.initLocale()

app.use(store)

app.use(i18n)

app.use(router)

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
