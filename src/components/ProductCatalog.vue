<script setup lang="ts">
import CategoryFilter from '@/components/filter/CategoryFilter.vue';
import PriceFilter from '@/components/filter/PriceFilter.vue';
import ProductGrid from '@/components/product/ProductGrid.vue';
import CheckboxFilter from '@/components/filter/CheckboxFilter.vue';
</script>

<template>
    <div>
        <CategoryFilter />
        <PriceFilter />
        <!-- Brand Filter -->
        <CheckboxFilter />
        <!-- Size Filter -->
        <CheckboxFilter />
        <ProductGrid />
    </div>
</template>

<style lang="scss"></style>
