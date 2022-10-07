<template>
    <i>{{icon}}</i>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: '默认图标'
        }
    }
}
</script>