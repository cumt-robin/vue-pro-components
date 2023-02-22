<template>
    <div class="a b">
        <span>{{ name }}</span>
        <span> static </span>
        <child-comp></child-comp>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ChildComp from './child-comp.vue'

export default defineComponent({
    name: 'Test',
    components: {
        ChildComp,
    },
    setup() {
        const name = ref('Tusi')

        const color = ref('#fff')

        return {
            name,
            color,
        }
    },
})
</script>

<style lang="less" scoped>
.a {
    position: relative;
    color: v-bind(color);

    :deep(.child) {
        position: absolute;
    }
}
</style>

<style>
.b {
    color: red;
}
</style>
