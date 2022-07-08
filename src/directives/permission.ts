/**
 * Global authority directive
 * Used for fine-grained control of component permissions
 * @example   v-permission="'module.action'"  v-permission="['module.action']"
 * https://v3.cn.vuejs.org/guide/custom-directive.html
 */
import type { App, Directive, DirectiveBinding } from 'vue'

import { usePermission } from '~/hooks/usePermission'

function isPermission(el: Element, binding: any) {
  const { hasPermission } = usePermission()
  const value = binding.value
  if (!value) return
  if (!hasPermission(value)) {
    el.parentNode?.removeChild(el)
  }
}

const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isPermission(el, binding)
}

const permissionDirective: Directive = {
  mounted, // 在绑定元素的父组件被挂载后调用
}

export function setupPermissionDirective(app: App) {
  app.directive('permission', permissionDirective)
}

export default permissionDirective
