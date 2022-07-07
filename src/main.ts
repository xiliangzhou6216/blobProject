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
// 插件自动加载
// 从文件中导入多个模块  Register global
const modules = import.meta.globEager('./modules/*.ts')
console.log(modules)
const app = createApp(App)

Object.values(modules).forEach((item) => {
  if (typeof item.default === 'function') {
    item.default(app)
  }
})
// Register global directive
setupGlobDirectives(app)

app.mount('#app')
