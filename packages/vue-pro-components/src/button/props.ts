import type { ExtractPropTypes, PropType } from 'vue'
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
    // 图标源，biz 代表业务图标，antd 代表 @ant-design/icons-vue 的图标，默认是 biz
    icoSource: {
        type: String as PropType<'biz' | 'antd'>,
        default: 'biz',
        validator: (value: string) => ['biz', 'antd'].includes(value),
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
