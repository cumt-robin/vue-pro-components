import type { ExtractPropTypes } from 'vue'
// 这是一个函数
import buttonProps from 'ant-design-vue/es/button/buttonTypes'
import { initDefaultProps } from 'ant-design-vue/es/_util/props-util'

const _buttonProps = initDefaultProps(buttonProps(), {
    type: 'default',
})

export const enhancedProps = {
    // 对应自定义图标的名称
    ico: {
        type: String,
    },
    // 图标的大小
    icoSize: {
        type: Number,
    },
    // 图标颜色
    icoColor: {
        type: String,
    },
    // 按钮主体颜色，影响边框颜色，背景色
    primaryColor: {
        type: String,
    },
}

export const innerKeys = Object.keys(_buttonProps)
export const enhancedKeys = Object.keys(enhancedProps)

export const props = {
    ..._buttonProps,
    ...enhancedProps,
}

export type VpButtonProps = Partial<ExtractPropTypes<typeof props>>
