import Typography from 'windicss/plugin/typography' // 排版 字体
import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  darkMode: 'class', // 暗色模式
  attributify: false, // 属性化css，默认关闭
  plugins: [Typography],
})
