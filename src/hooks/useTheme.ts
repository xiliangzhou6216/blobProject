import dark from '~/styles/themes/dark.less' // 菜单menu 主题效果
import light from '~/styles/themes/light.less'
import { useUserStoreWithOut } from '~/store/modules/user'
import { getLightColor, getDarkColor } from '~/utils/theme/tool'

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
  const changePrimary = (value: string, theme: boolean) => {
    useStore.setThemeConfig({ ...themeConfig.value, primary: value, isDark: theme })
    document.documentElement.style.setProperty('--ant-primary-color', themeConfig.value.primary)
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--ant-primary-color-dark-${i}`,
        themeConfig.value.isDark
          ? `${getDarkColor(themeConfig.value.primary, i / 10)}`
          : `${getLightColor(themeConfig.value.primary, i / 10)}`
      )
    }
    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--ant-primary-color-light-${i}`,
        themeConfig.value.isDark
          ? `${getDarkColor(themeConfig.value.primary, i / 10)}`
          : `${getLightColor(themeConfig.value.primary, i / 10)}`
      )
    }
  }

  // 初始化
  onBeforeMount(() => {
    // console.log(888888, themeConfig.value.isDark)
  })

  // 是否暗黑模式
  const darkMode = (isDark: boolean) => {
    if (isDark) {
      changeTheme(dark)
      changePrimary('#1890ff', isDark)
      // changePrimary('--prism-background', '#141414')
    } else {
      changeTheme(light)
      changePrimary('#13c2c2', isDark)
      // changePrimary('--prism-background', 'white')
    }
  }
  return { changeTheme, changePrimary, darkMode }
}
