
import { createFromIconfontCN } from '@ant-design/icons-vue';
const MyIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
});
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
    return () => <MyIcon type="icon-dianzan" />;
  },
});