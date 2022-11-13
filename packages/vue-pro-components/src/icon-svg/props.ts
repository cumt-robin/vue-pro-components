import type { ExtractPropTypes } from 'vue'

export const props = {
    // 图标 class 前缀
    iconPrefix: {
        type: String,
        default: 'vp-icon-',
    },
    // 图标名，与前缀拼接起来就对应一个完整的 class
    icon: {
        type: String,
        required: true,
    },
    // 图标大小
    size: {
        type: Number,
    },
    // 图标颜色
    color: {
        type: String,
    },
}

export type VpIconSvgProps = Partial<ExtractPropTypes<typeof props>>
