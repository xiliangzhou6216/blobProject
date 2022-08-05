import { App } from 'vue'
import { store } from '~/store/index'
export const setupStore = (app: App) => app.use(store)
