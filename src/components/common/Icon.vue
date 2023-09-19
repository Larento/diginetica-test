<script setup lang="ts">
defineProps<{
    slug: string;
    alt?: string;
}>();
</script>

<template>
    <img class="icon" :src="`/icons/${slug}.svg`" :alt="slug" />
</template>

<style lang="scss">
.icon {
    width: auto;
    height: 100%;
    object-fit: contain;
}
</style>
