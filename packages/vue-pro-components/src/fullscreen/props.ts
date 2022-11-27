import type { ExtractPropTypes, PropType } from 'vue'
import type { EnhancedHTMLElement } from '@vue-pro-components/utils'

export const props = {
    useText: {
        type: Boolean,
        default: true,
    },
    iconSize: {
        type: Number,
        default: 24,
    },
    getElement: {
        type: Function as PropType<() => EnhancedHTMLElement>,
        default() {
            return document.body
        },
    },
}

export type ClFullscreenProps = Partial<ExtractPropTypes<typeof props>>
