<template>
    <span class="vp-icon-svg" :style="{ fontSize: `${size}px`, color: color }" :aria-label="icon" role="img">
        <svg width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <use :xlink:href="`#${iconPrefix}${icon}`"></use>
        </svg>
    </span>
</template>

<script lang="ts" setup>
import { props } from './props'

defineProps(props)
</script>
