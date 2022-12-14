import type { ExtractPropTypes } from 'vue'
// 这是一个函数
import { formProps } from 'ant-design-vue/es/form/Form'
import { initDefaultProps } from 'ant-design-vue/es/_util/props-util'

const _formProps = initDefaultProps(formProps(), {
    layout: 'horizontal',
    hideRequiredMark: false,
    colon: true,
})

export const enhancedProps = {}

export const innerKeys = Object.keys(_formProps)
export const enhancedKeys = Object.keys(enhancedProps)

export const props = {
    ..._formProps,
    ...enhancedProps,
}

export type VpFormProps = Partial<ExtractPropTypes<typeof props>>
