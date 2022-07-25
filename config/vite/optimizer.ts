/**
 * @name configManualChunk
 * @description chunk 拆包优化
 */

const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['ant-design-vue'],
    output: 'antdv',
  },
  // {
  //   match: ['echarts'],
  //   output: 'echarts',
  // },
]

// @ts-ignore
export const configManualChunk = (id: string) => {
  // 获取node_modules下 每个解析的依赖模块id
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig')
      return reg.test(id)
    })
    return matchItem ? matchItem.output : null
  }
}
