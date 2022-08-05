import { App } from 'vue'

import { router } from '~/router/index'

export const setupRouter = (app: App) => app.use(router)
