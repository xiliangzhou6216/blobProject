# Vue 3 + Typescript + Vite
## 图标
- ant-desgin-vue 组件库 图标
- Iconify 图标

## 国际化
- vscode插件 i18n Ally
- 配置默认语言
- 切换语言
- 读取语言或者远程语言
- 封装template外使用 useI18n

## 黑暗主题

`prism-theme-vars`  通过Html的class 进行暗黑主题切换  使用 CSS 变量

- useDark

## 项目规范

**作用**

- 较少 bug 错误率
- 高效的开发效率
- 更高的可读性


```

- Eslint 用于校验代码格式规范
- CommitLint  用于校验 git 提交信息规范
- styleLint 用于校验 css/less 规范
- Prettier 代码格式化
- Git Hook  提交代码的时候进行代码风格校验

```

## 计划

- [ ] 集成单元测试（vitest）
- [ ] 集成storybook
- [ ] 使用github actions实现自动化 cicd
- [ ] 内置了开发调试环境(可直接引用src中的代码，方便调试)
- [ ] 使用tsup(npm run build)去构建npm package
- [ ] 发布的npm package支持cjs/esm