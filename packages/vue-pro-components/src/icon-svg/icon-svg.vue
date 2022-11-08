<template>
    <i class="iconfont" :style="{ fontSize: `${size}px`, color: color }" :class="`${iconPrefix}${icon}`"></i>
</template>

<script lang="ts" setup>
import { props } from './props'

defineProps(props)
</script>
