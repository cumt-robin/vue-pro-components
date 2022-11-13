<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { IconFont, IconSvg, Button as VpButton } from 'vue-pro-components'
import 'vue-pro-components/src/icon-svg/style/index.less'
import 'vue-pro-components/src/button/style/index.less'
import { PlusOutlined } from '@ant-design/icons-vue'
import { Button as AButton } from 'ant-design-vue'
import HelloWorld from './components/HelloWorld.vue'
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
            <span>VpButton 通过 icon 插槽使用 @ant-design/icons-vue 的图标</span>
            <VpButton type="primary">
                <template #icon>
                    <PlusOutlined />
                </template>
                新建
            </VpButton>
        </li>
        <li>
            <span>VpButton 通过 ico 属性使用 icon-svg 的图标，按钮 size 为 small，属性 disabled 为 true</span>
            <VpButton ico="smile" size="small" disabled>笑脸</VpButton>
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
            <span>VpButton 通过 icon 插槽使用 @ant-design/icons-vue 的图标，按钮 size 为 small</span>
            <VpButton type="primary" size="small">
                <template #icon>
                    <PlusOutlined />
                </template>
                新建
            </VpButton>
        </li>
        <li>
            <span>AButton 通过 icon 插槽使用 @ant-design/icons-vue 的图标</span>
            <AButton>
                <template #icon>
                    <PlusOutlined />
                </template>
                新建AButton
            </AButton>
        </li>
    </ul>
    <HelloWorld msg="Vite + Vue" />
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
