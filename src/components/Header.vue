<script setup lang="ts">
import Icon from '@/components/common/Icon.vue';
import ProductSearchBar from '@/components/product/ProductSearchBar.vue';
</script>

<template>
    <div class="container">
        <a class="home-link" href="/">
            <Icon slug="magnifying-glass" />
            Компания
        </a>

        <a class="catalog-link" href="#">Каталог</a>

        <ProductSearchBar />

        <div class="nav-links">
            <a href="#">Информация о компании</a>
            <a href="#">Контакты</a>
            <a href="#">Полезные ссылки</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    font-family: 'Inter';
}

.home-link {
    @include block-link;

    display: inline-block;
    padding: 1rem;
}
</style>
