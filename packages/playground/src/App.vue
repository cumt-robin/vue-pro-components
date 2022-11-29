<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { IconFont, IconSvg, Button as VpButton, SelectIcon, Fullscreen } from 'vue-pro-components'
import 'vue-pro-components/src/icon-svg/style/index.less'
import 'vue-pro-components/src/button/style/index.less'
import 'vue-pro-components/src/select-icon/style/index.less'
import 'vue-pro-components/src/fullscreen/style/index.less'
import { ref } from 'vue'
import { useFullscreen } from '@vue-pro-components/headless'
import { patchF11DefaultAction } from '@vue-pro-components/utils'
import icons from './assets/json/icons.json'

patchF11DefaultAction()

const isSelectIconVisible = ref(false)
const selectedIcon = ref('')
const onSelectIcon = (value: string) => {
    selectedIcon.value = value
    isSelectIconVisible.value = false
}

const wrapperRef = ref<HTMLElement | null>(null)

const getWrapperElement = () => wrapperRef.value

const { isTargetFullscreen, toggleFullscreen } = useFullscreen()
</script>

<template>
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>

    <IconFont icon="lock" :size="20"></IconFont>
    <br />
    <IconFont icon="map" color="#3ebbff"></IconFont>
    <br />
    <div style="display: flex; align-items: center">
        <span>测试文本</span>
        <IconSvg icon="lock"></IconSvg>
    </div>

    <div ref="wrapperRef" style="background-color: #fff">
        <ul class="btn-test-ul">
            <li>
                <span>VpButton 通过 ico 属性使用 icon-svg 的图标</span>
                <VpButton ico="smile">笑脸</VpButton>
            </li>
            <li>
                <span>VpButton 通过 ico 属性使用 icon-svg 的图标，按钮 size 为 large</span>
                <VpButton ico="smile" size="large">笑脸</VpButton>
            </li>
            <li>
                <span>VpButton 通过 ico 属性使用 icon-svg 的图标，按钮 size 为 small，属性 loading 为 true</span>
                <VpButton ico="smile" size="small" loading>笑脸</VpButton>
            </li>
            <li>
                <span>VpButton 通过 ico 属性使用 icon-svg 的图标，按钮 size 为 small，属性 disabled 为 true</span>
                <VpButton ico="smile" size="small" disabled>笑脸</VpButton>
            </li>
            <li>
                <span>VpButton 通过 icon 插槽使用 @ant-design/icons-vue 的图标</span>
                <VpButton type="primary">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                    新建
                </VpButton>
            </li>
            <li>
                <span>VpButton 通过 icon 插槽使用 @ant-design/icons-vue 的图标，按钮 size 为 small</span>
                <VpButton type="primary" size="small">
                    <template #icon>
                        <PlusOutlined />
                    </template>
                    新建
                </VpButton>
            </li>
            <li>
                <span>VpButton 通过 icon 插槽使用 @ant-design/icons-vue 的图标，按钮 size 为 small，属性 loading 为 true</span>
                <VpButton type="primary" size="small" loading>
                    <template #icon>
                        <PlusOutlined />
                    </template>
                    新建
                </VpButton>
            </li>
            <li>
                <span>AButton 通过 icon 插槽使用 @ant-design/icons-vue 的图标</span>
                <a-button>
                    <template #icon>
                        <PlusOutlined />
                    </template>
                    新建AButton
                </a-button>
            </li>
            <li>
                <span style="vertical-align: middle">菜单图标</span>
                <a-input-search
                    style="width: 200px; vertical-align: middle"
                    v-model:value="selectedIcon"
                    @search="isSelectIconVisible = true"
                ></a-input-search>
            </li>
        </ul>

        <div style="display: flex; align-items: center; padding: 20px">
            <Fullscreen></Fullscreen>

            <VpButton style="margin-left: 20px">
                <Fullscreen :getElement="getWrapperElement"></Fullscreen>
            </VpButton>

            <a-switch
                :checked="isTargetFullscreen"
                checkedChildren="退出全屏"
                unCheckedChildren="进入全屏"
                @change="() => toggleFullscreen()"
                style="margin-left: 20px"
            ></a-switch>
        </div>

        <a-modal :visible="isSelectIconVisible" :footer="null" :get-container="getWrapperElement" @cancel="isSelectIconVisible = false">
            <select-icon :icons="icons" :value="selectedIcon" @select="onSelectIcon" />
        </a-modal>
    </div>
</template>

<style lang="less" scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}

.btn-test-ul {
    text-align: left;

    > li {
        + li {
            margin-top: 10px;
        }

        > span {
            margin-right: 10px;
        }
    }
}
</style>
