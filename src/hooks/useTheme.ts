import dark from '~/styles/themes/dark.less'
import light from '~/styles/themes/light.less'
import { useUserStoreWithOut } from '~/store/modules/user'

/**
 * @description 设置主题模式
 * @returns
 */
export const useTheme = () => {
  const useStore = useUserStoreWithOut()
  const themeConfig = computed(() => useStore.getThemeConfig)
  // 该变主题模式
  const changeTheme = (theme: string) => {
    const head = document.head
    document.getElementById('theme')?.remove()
    const styleDom = document.createElement('style')
    styleDom.id = 'theme'
    styleDom.innerHTML = theme
    head.appendChild(styleDom)
  }

  // 修改主题颜色
  const changePrimary = (css: string, value: string) => {
    useStore.setThemeConfig({ ...themeConfig.value, primary: value })
    document.documentElement.style.setProperty(css, value)
  }

  // 是否暗黑模式
  const darkMode = (isDark: boolean) => {
    if (isDark) {
      changeTheme(dark)
      // changePrimary('--prism-background', '#141414')
    } else {
      changeTheme(light)
      // changePrimary('--prism-background', 'white')
    }
  }
  // 初始化
  onBeforeMount(() => {
    // darkMode(themeConfig.value.isDark)
    // themeConfig
    console.log(888888, themeConfig.value.isDark)
  })

  return { darkMode, changeTheme, changePrimary }
}
