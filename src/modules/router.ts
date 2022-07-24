import { App } from 'vue'

import { router } from '~/router/index'

export default (app: App) => app.use(router)
