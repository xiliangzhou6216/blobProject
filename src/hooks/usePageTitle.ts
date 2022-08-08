import { watch, unref } from 'vue'

import { useLocaleStore } from '~/store/modules/locale'
import { useI18n } from './useI18n'
/**
 * Listening to page changes and dynamically changing site titles
 */
export function usePageTitle() {
  const { currentRoute } = useRouter()
  const localeStore = useLocaleStore()
  const { t } = useI18n()
  const pageTitle = useTitle()
  const APP_TITLE = import.meta.env.VITE_APP_TITLE as string

  watch(
    [() => currentRoute.value.path, () => localeStore.getLocale],
    () => {
      const route = unref(currentRoute)
      const tTitle = t(route?.meta?.title as string)
      pageTitle.value = tTitle ? `${tTitle} - ${APP_TITLE}` : APP_TITLE
    },
    { immediate: true }
  )
}
