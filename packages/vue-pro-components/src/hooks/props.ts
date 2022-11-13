import type { PlainObject } from '@vue-pro-components/types'

import { pick } from 'lodash-es'
import { computed } from 'vue'

export const usePickedProps = (props: PlainObject, keys: string[]) => computed(() => pick(props, keys))
