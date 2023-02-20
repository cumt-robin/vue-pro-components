<template>
    <div>{{ name }}</div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Test',
    setup() {
        const name = ref('Tusi')

        return {
            name,
        }
    },
})
</script>

<style lang="less" scoped>
.a {
    position: relative;
}
</style>
