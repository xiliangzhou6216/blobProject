import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
import Markdown from 'vite-plugin-md'
import Prism from 'markdown-it-prism' // 代码块高亮
import LinkAttributes from 'markdown-it-link-attributes' // 传递链接属性
import Windicss from 'vite-plugin-windicss'
import Inspect from 'vite-plugin-inspect'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import IconsResolver from 'unplugin-icons/resolver'
import Legacy from '@vitejs/plugin-legacy'
import Icons from 'unplugin-icons/vite' //自动按需引入icons
import { viteMockServe } from 'vite-plugin-mock'
import PurgeIcons from 'vite-plugin-purge-icons'
import visualizer from 'rollup-plugin-visualizer'

import { AntDesignVueResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'

const markdownWrapperClasses =
  'prose md:prose-lg lg:prose-lg dark:prose-invert text-left p-10 prose-slate prose-img:rounded-xl prose-headings:underline prose-a:text-blue-600'

function configVisualizerConfig() {
  if (process.env.REPORT === 'true') {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }) as Plugin
  }
  return []
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  console.log(command, mode, 555)
  const env = loadEnv(mode, process.cwd(), '')
  console.log(loadEnv, env)
  return {
    plugins: [
      // 将包信息文件作为 vite 的配置文件之一，为 vite-plugin-optimize-persist 所用
      PkgConfig(),
      // 依赖预构建分析，提高大型项目性能
      OptimizationPersist(),
      // vue 官方插件，用来解析 sfc
      vue({
        include: [/\.vue$/, /\.md$/],
      }),
      // 兼容处理
      Legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      // iconify图标
      PurgeIcons(),
      // 文件路由
      Pages({
        extensions: ['vue', 'md', 'tsx'],
      }),
      // mock 服务
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: !isBuild, // 设置是否开启本地mock .ts文件，不要在生产环境打开
        prodEnabled: isBuild, //为了演示，线上开启 mock，实际开发请关闭，会影响打包体积
        // injectCode 只受prodEnabled影响
        // https://github.com/anncwb/vite-plugin-mock/issues/9
        // 下面这段代码会被注入 main.ts
        injectCode: `
           import { setupProdMockServer } from '../mock/_createProdMockServer';
     
           setupProdMockServer();
           `,
      }),
      // markdown 编译插件
      Markdown({
        wrapperClasses: markdownWrapperClasses,
        headEnabled: true,
        markdownItSetup(md) {
          // https://prismjs.com/
          md.use(Prism)
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
        },
      }),

      // windicss 插件
      Windicss({
        safelist: markdownWrapperClasses, // 白名单 不会扫描
      }),
      // https://icones.netlify.app/
      Icons({
        autoInstall: true,
      }),
      // 布局系统
      Layouts(),
      // 依赖按需自动导入
      AutoImport({
        imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts',
      }),
      // 组件自动按需引入  设计原理是根据  vue template 模板中的组件使用进行处理的,函数式调用时插件查询不到,message.success('xx')可以创建 DOM元素，但是没有相关样式代码
      Components({
        extensions: ['vue', 'md', 'tsx'],
        include: [/\.md$/, /\.vue$/, /\.tsx$/],
        // 指定组件位置，默认是src/components
        // dirs: ['src/components'],
        dts: resolve(__dirname, 'src/components.d.ts'),
        // ui库解析器，也可以自定义
        resolvers: [
          IconsResolver(),
          AntDesignVueResolver({ importStyle: 'less' }), // 自定义主题 设置自定义样式 开启 importStyle: 'less'
          VueUseComponentsResolver(),
        ],
      }),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, 'locales/**')],
      }),
      // 调试工具
      Inspect(),
      // tsx 支持
      vueJsx(),
      // 生产环境资源压缩
      viteCompression(),
      // 包依赖分析可视化
      configVisualizerConfig(),
    ],
    // CSS 预处理器  支持 less 样式
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      port: 5000,
    },
    resolve: {
      alias: {
        '~/': `${resolve(__dirname, 'src')}/`, // 查找~项目更目录
      },
    },
    //使用此选项可强制预构建链接的包
    optimizeDeps: {
      // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
      include: [
        '@iconify/iconify',
        'nprogress',
        'pinia',
        'vue',
        'vue-i18n',
        'vue-router',
        '@vueuse/head',
        '@vueuse/core',
      ],
    },
  }
})
