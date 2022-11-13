import { defineComponent } from 'vue'
import { Button } from 'ant-design-vue'
import IconSvg from '../icon-svg'
import { innerKeys, props as buttonProps } from './props'
import { usePickedProps } from '../hooks/props'

export default defineComponent({
    name: 'VpButton',
    props: buttonProps,
    setup(props, { slots }) {
        // 把属于 AButton 的属性挑选出来，再绑定到 AButton 上
        const innerProps = usePickedProps(props, innerKeys)

        return () => (
            <Button
                {...innerProps.value}
                class="vp-button"
                style={{ backgroundColor: props.primaryColor, borderColor: props.primaryColor }}
                v-slots={{
                    ...slots,
                    default: () => (
                        <>
                            {props.ico && !props.loading ? <IconSvg icon={props.ico} size={props.icoSize} color={props.icoColor} /> : null}
                            {slots?.default?.()}
                        </>
                    ),
                }}
            ></Button>
        )
    },
})
