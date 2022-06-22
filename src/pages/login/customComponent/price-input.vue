<template>
  <span>
    <a-input type="text" :value="value.number" style="width: 100px" @change="onNumberChange" />
    <a-select
      :value="value.currency"
      style="width: 80px; margin: 0 8px"
      :options="[
        { value: 'rmb', label: 'RMB' },
        { value: 'dollar', label: 'Dollar' },
      ]"
      @change="onCurrencyChange"
    />
  </span>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { Form } from 'ant-design-vue'

export type Currency = 'rmb' | 'dollar'

interface PriceValue {
  number: number
  currency: Currency
}
const emits = defineEmits(['update:value'])
const props = defineProps({
  value: { type: Object as PropType<PriceValue>, isRequired: true },
})

const formItemContext = Form.useInjectFormItemContext()
const triggerChange = (changedValue: { number?: number; currency?: Currency }) => {
  emits('update:value', { ...props.value, ...changedValue })
  formItemContext.onFieldChange()
}
const onNumberChange = (e: InputEvent) => {
  const newNumber = parseInt((e.target as any).value || '0', 10)
  triggerChange({ number: newNumber })
}
const onCurrencyChange = (newCurrency: Currency) => {
  triggerChange({ currency: newCurrency })
}
</script>
