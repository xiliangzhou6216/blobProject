import { Input } from 'ant-design-vue'
export const FormItem = defineComponent({
  name: 'FormItem',
  props: {
    searchColumns: {
      type: Array,
    },
    searchParams: {
      type: Object,
    },
  },
  setup(props, ctx) {
    console.log(props, ctx, 6666)
    const value = ref<string>('123')
    return () => <Input v-model:value={value.value} placeholder='Basic usage' />
  },
})
