import { watch, unref } from 'vue'

/**
 * Listening to page changes and dynamically changing site titles
 */
export function usePageTitle() {
  const { currentRoute } = useRouter()

  const pageTitle = useTitle()

  watch(
    [() => currentRoute.value.path],
    () => {
      const route = unref(currentRoute)
      const tTitle = route?.meta?.title as string
      pageTitle.value = tTitle
    },
    { immediate: true }
  )
}
