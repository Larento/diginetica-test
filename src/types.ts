export interface Product {
    id: string;
    name: string;
    rawPrice: number;
    rawSalePrice: number;
    price: string;
    salePrice: string;
    hot: boolean;
    inStock: boolean;
    category: string;
    brand: string;
    size: string;
    thumbnail: string | URL;
}

export type PriceRange = {
    min: number;
    max: number;
};
