import { defineComponent } from 'vue'
import { Form as AForm } from 'ant-design-vue'
import { innerKeys, props as formProps } from './props'
import { usePickedProps } from '../hooks/props'

export default defineComponent({
    name: 'VpForm',
    props: formProps,
    setup(props) {
        // 把属于 AForm 的属性挑选出来，再绑定到 AForm 上
        const innerProps = usePickedProps(props, innerKeys)

        return () => <AForm {...innerProps.value} class="vp-form"></AForm>
    },
})
