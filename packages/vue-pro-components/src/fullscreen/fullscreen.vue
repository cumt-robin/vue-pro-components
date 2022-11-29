<script lang="tsx">
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
import { defineComponent } from 'vue'
import { useFullscreen } from '@vue-pro-components/headless'
import { props } from './props'

export default defineComponent({
    name: 'VpFullscreen',
    props,
    emits: ['fschange'],
    setup(props, { emit }) {
        const { isTargetFullscreen, toggleFullscreen } = useFullscreen({
            getElement: props.getElement,
            onFullscreenChange: (value) => {
                emit('fschange', value)
            },
        })

        return () => {
            const iconStyle = {
                fontSize: `${props.iconSize}px`,
            }
            return (
                <div class="vp-fullscreen__wrapper" onClick={toggleFullscreen}>
                    {isTargetFullscreen.value ? <FullscreenExitOutlined style={iconStyle} /> : <FullscreenOutlined style={iconStyle} />}
                    {props.useText ? <span class="vp-fullscreen__text">{isTargetFullscreen.value ? '退出全屏' : '全屏'}</span> : null}
                </div>
            )
        }
    },
})
</script>
