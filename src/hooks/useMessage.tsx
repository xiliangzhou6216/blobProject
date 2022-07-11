import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal'
import { Modal, message as Message, notification } from 'ant-design-vue'
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
// 手动引入 message样式
import 'ant-design-vue/es/message/style'
import 'ant-design-vue/es/notification/style'

export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: 'warning' | 'success' | 'error' | 'info'
}
export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>

const getBaseOptions = () => {
  return {
    okText: '确定',
    centered: true,
  }
}

function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoCircleFilled class='modal-icon-warning' />
  } else if (iconType === 'success') {
    return <CheckCircleFilled class='modal-icon-success' />
  } else if (iconType === 'info') {
    return <InfoCircleFilled class='modal-icon-info' />
  } else {
    return <CloseCircleFilled class='modal-icon-error' />
  }
}

function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (typeof content === 'string') {
    return <div innerHTML={`<div>${content as string}</div>`}></div>
  } else {
    return content
  }
}

function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIcon(icon),
  }
}

function createSuccessModal(options: ModalOptionsPartial) {
  return Modal.success(createModalOptions(options, 'success'))
}

function createErrorModal(options: ModalOptionsPartial) {
  return Modal.error(createModalOptions(options, 'close'))
}

function createInfoModal(options: ModalOptionsPartial) {
  return Modal.info(createModalOptions(options, 'info'))
}

function createWarningModal(options: ModalOptionsPartial) {
  return Modal.warning(createModalOptions(options, 'warning'))
}

export function useMessage() {
  return {
    createMessage: Message,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal,
  }
}
