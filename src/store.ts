import { defineStore } from 'pinia';

import type { Product, PriceRange } from '@/types';

export interface State {
    data: {
        categories: Record<string, string> | null;
        brands: Record<string, string> | null;
        sizes: Record<string, string> | null;
        products: Product[] | null;
    };

    filters: {
        searchQuery: string;
        categories: string[];
        priceRange: PriceRange;
        brands: string[];
        sizes: string[];
    };

    isError: boolean;
}

export const initialState: State = {
    data: {
        categories: null,
        brands: null,
        sizes: null,
        products: null,
    },

    filters: {
        searchQuery: '',
        categories: [],
        priceRange: { min: -Infinity, max: Infinity },
        brands: [],
        sizes: [],
    },

    isError: false,
};

export const useProductCatalogStore = defineStore('product-catalog', {
    state: () => initialState,

    getters: {
        isLoading: ({ data }): Boolean =>
            !(data.categories && data.brands && data.sizes && data.products),

        maximumPriceRange: ({ data }): PriceRange => {
            const prices = data.products?.map(({ rawSalePrice }) => rawSalePrice);
            return prices
                ? { min: Math.min(...prices), max: Math.max(...prices) }
                : { ...initialState.filters.priceRange };
        },

        productsCountByFilter:
            ({ data }) =>
            (filterName: keyof State['data']): Map<string, number> => {
                const filterMap = new Map(
                    Object.keys(data[filterName] ?? {}).map((size) => [size, 0]),
                );
                return (
                    data.products?.reduce(
                        (map, { size }) => map.set(size, map?.get(size) ?? 0 + 1),
                        filterMap,
                    ) ?? filterMap
                );
            },

        productsCountByCategories(): Map<string, number> {
            return this.productsCountByFilter('categories');
        },

        productsCountByBrands(): Map<string, number> {
            return this.productsCountByFilter('brands');
        },

        productsCountBySizes(): Map<string, number> {
            return this.productsCountByFilter('sizes');
        },

        filteredProducts: ({ data, filters }): Product[] | null =>
            data.products?.filter(
                ({ name, rawSalePrice, category, brand, size }) =>
                    name.includes(filters.searchQuery) &&
                    filters.categories.includes(category) &&
                    filters.brands.includes(brand) &&
                    filters.sizes.includes(size) &&
                    rawSalePrice >= filters.priceRange.min &&
                    rawSalePrice <= filters.priceRange.max,
            ) ?? null,
    },

    actions: {
        resetState() {
            this.data = { ...initialState.data };
            this.filters = { ...initialState.filters };
            this.filters.priceRange = { ...initialState.filters.priceRange };
            this.isError = false;
        },

        async getData() {
            try {
                this.resetState();

                const response = await fetch('/api/products.json');
                if (!response.ok) {
                    throw new Error();
                }
                const { categories, brands, sizes, products } = await response.json();

                this.data.categories = categories;
                this.data.brands = brands;
                this.data.sizes = sizes;
                this.data.products = products;
                this.filters.priceRange = this.maximumPriceRange;
            } catch (error) {
                this.isError = true;
                return error;
            }
        },
    },
});
