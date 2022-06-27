import { message as Message } from 'ant-design-vue'
// 手动引入 message样式
import 'ant-design-vue/es/message/style'
import 'ant-design-vue/es/notification/style'
export function useMessage() {
  return { createMessage: Message }
}
