import type { ExtractPropTypes, PropType } from 'vue'

export const props = {
    value: {
        type: String,
    },
    // 图标清单
    icons: {
        type: Array as PropType<string[]>,
        default() {
            return []
        },
    },
}

export type VpIconSelectProps = Partial<ExtractPropTypes<typeof props>>
