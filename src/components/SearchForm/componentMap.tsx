import { Input } from 'ant-design-vue'
export const FormItem = defineComponent({
  name: 'FormItem',
  props: {},
  setup(props) {
    const value = ref<string>('123')
    return () => (
      <>
        <Input v-model:value={value.value} placeholder='Basic usage' />
      </>
    )
  },
})
