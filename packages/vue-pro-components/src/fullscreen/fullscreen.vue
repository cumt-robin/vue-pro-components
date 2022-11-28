<script lang="tsx">
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue'
import { defineComponent, ref, onMounted } from 'vue'
import { enterFullscreen, exitFullscreen, getFullscreenElement, isFullscreen, listenFullscreen } from '@vue-pro-components/utils'
import { props } from './props'

export default defineComponent({
    name: 'VpFullscreen',
    props,
    emits: ['fschange'],
    setup(props, { emit }) {
        const isTargetFullscreen = ref(false)
        const checkFullscreenStatus = () => {
            const isFullscreenFlag = isFullscreen()
            isTargetFullscreen.value = isFullscreenFlag ? (getFullscreenElement() || document.body) === props.getElement() : false
        }
        const onRequestFullscreen = () => {
            checkFullscreenStatus()
            if (isTargetFullscreen.value === true) {
                exitFullscreen()
            } else {
                enterFullscreen(props.getElement())
            }
        }
        onMounted(() => {
            checkFullscreenStatus()
            listenFullscreen(() => {
                checkFullscreenStatus()
                emit('fschange', isTargetFullscreen.value)
            })
        })

        return () => {
            const iconStyle = {
                fontSize: `${props.iconSize}px`,
            }
            return (
                <div class="vp-fullscreen__wrapper" onClick={onRequestFullscreen}>
                    {isTargetFullscreen.value ? <FullscreenExitOutlined style={iconStyle} /> : <FullscreenOutlined style={iconStyle} />}
                    {props.useText ? <span class="vp-fullscreen__text">{isTargetFullscreen.value ? '退出全屏' : '全屏'}</span> : null}
                </div>
            )
        }
    },
})
</script>
