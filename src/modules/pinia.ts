import { App } from 'vue'
import { store } from '~/store/index'
export default (app: App) => app.use(store)
