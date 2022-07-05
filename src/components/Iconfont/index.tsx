import { createFromIconfontCN } from '@ant-design/icons-vue'
import './style.less'
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 官方生成的 现在暂时不能用自己生成symbol连接
})
export default defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    align: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '18px',
    },
  },
  setup(props) {
    const iconType = computed(() => `icon-${props.type}`)
    const iconClass = computed(() => (props.className ? `my-icon ${props.className}` : 'my-icon'))
    return () => <MyIcon type={iconType.value} class={iconClass.value} />
  },
})
