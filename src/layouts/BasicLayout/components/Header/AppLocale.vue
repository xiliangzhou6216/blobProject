<template>
  <Dropdown
    :selectedKeys="selectedKeys"
    placement="bottom"
    :trigger="['hover']"
    :dropMenuList="localeList"
    @menuEvent="handleMenuEvent"
  >
    <span class="cursor-pointer flex items-center">
      <Icon icon="ion:language" :size="20" />
    </span>
  </Dropdown>
</template>

<script setup lang="ts">
import type { DropMenuType } from '~/components/Dropdown/type'
import { useLocaleHook } from '/locales/useLocale'
import type { LocaleType } from '#/global'
import { localeList } from '~/settings/localeSetting'

const { changeLocale, getLocale } = useLocaleHook()

const selectedKeys = ref<string[]>([])

const toggleLocale = async (lang: LocaleType | string) => {
  await changeLocale(lang as LocaleType)
  selectedKeys.value = [lang as string]
}

const handleMenuEvent = (menu: DropMenuType) => {
  if (unref(getLocale) === menu.key) {
    return
  }
  toggleLocale(menu.key)
  console.log(menu.key, 5555)
}

watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})
</script>
