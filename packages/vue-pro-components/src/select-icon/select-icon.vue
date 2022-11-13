<template>
    <section class="select-icon__wrapper">
        <div class="select-icon__search-wrapper">
            <a-select
                class="select-icon"
                v-model:value="wd"
                allow-clear
                show-search
                placeholder="请输入图标名称搜索"
                @search="triggerFilter"
                @change="triggerFilter"
            >
                <a-select-option :value="icon" :key="icon" v-for="icon in icons">{{ icon }}</a-select-option>
            </a-select>
        </div>
        <a-row>
            <a-col :span="4" v-for="icon in visibleIcons" :key="icon">
                <div class="select-icon__cell" :class="{ 'is-selected': icon === value }" @click="onSelectIcon(icon)">
                    <vp-icon-svg :icon="icon" />
                </div>
            </a-col>
        </a-row>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { debounce } from 'lodash-es'
import { Select, Row, Col } from 'ant-design-vue'
import IconSvg from '../icon-svg'
import { props as SelectIconProps } from './props'

export default defineComponent({
    name: 'VpSelectIcon',
    components: {
        [Select.name]: Select,
        [Select.Option.name]: Select.Option,
        [Row.name]: Row,
        [Col.name]: Col,
        [IconSvg.name]: IconSvg,
    },
    props: SelectIconProps,
    emits: ['select'],
    setup(props, { emit }) {
        const searchWd = ref('')
        const handleFilter = (value: string) => {
            searchWd.value = value || ''
        }

        const triggerFilter = debounce(handleFilter, 300)

        const wd = ref('')

        const visibleIcons = computed(() => props.icons.filter((item) => searchWd.value === '' || item.indexOf(searchWd.value) !== -1))

        const onSelectIcon = (icon: string) => {
            emit('select', icon)
        }

        return {
            onSelectIcon,
            wd,
            triggerFilter,
            visibleIcons,
        }
    },
})
</script>
