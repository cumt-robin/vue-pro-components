import { defineComponent, resolveComponent, h } from 'vue'
import { Button as AButton } from 'ant-design-vue'
import IconSvg from '../icon-svg'
import { innerKeys, props as buttonProps } from './props'
import { usePickedProps } from '../hooks/props'

export default defineComponent({
    name: 'VpButton',
    props: buttonProps,
    setup(props, { slots }) {
        // 把属于 AButton 的属性挑选出来，再绑定到 AButton 上
        const innerProps = usePickedProps(props, innerKeys)

        // resolveComponent 解析出组件，然后通过 h 方法渲染
        const AntdIcon = props.icoSource === 'antd' && props.ico ? resolveComponent(props.ico) : ''

        return () => (
            <AButton
                {...innerProps.value}
                class="vp-button"
                style={{ backgroundColor: props.primaryColor, borderColor: props.primaryColor }}
                v-slots={{
                    ...slots,
                    default: () => (
                        <>
                            {props.ico && !props.loading ? (
                                props.icoSource === 'antd' ? (
                                    h(AntdIcon)
                                ) : (
                                    <IconSvg icon={props.ico} size={props.icoSize} color={props.icoColor} />
                                )
                            ) : null}
                            {slots?.default?.()}
                        </>
                    ),
                }}
            ></AButton>
        )
    },
})
