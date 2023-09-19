<script setup lang="ts">
import Header from '@/components/Header.vue';
import ProductCatalog from '@/components/ProductCatalog.vue';
</script>

<template>
    <div class="container">
        <Header />
        <ProductCatalog />
    </div>
</template>

<style scoped lang="scss">
@font-face {
    font-family: 'PTSans';
    font-weight: normal;
    font-style: normal;
    src:
        local('PTSans'),
        url('/fonts/PTSans-Regular.ttf') format('truetype');
}

@font-face {
    font-family: 'PTSans';
    font-weight: bold;
    font-style: normal;
    src:
        local('PTSans'),
        url('/fonts/PTSans-Bold.ttf') format('truetype');
}

@font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter.ttf') format('truetype');
}

.container {
    font-family: 'PTSans', sans-serif;
}
</style>
