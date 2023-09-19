import { writeFileSync } from 'node:fs';
import startCase from 'lodash-es/startCase';
import { faker } from '@faker-js/faker';

import type { Product } from '@/types';

function createAPIFile() {
    const categories = Object.fromEntries(
        faker.helpers
            .uniqueArray(() => startCase(faker.commerce.department()), 7)
            .map((label, index) => [`category-${index}`, label]),
    );

    const brands = Object.fromEntries(
        faker.helpers
            .uniqueArray(() => faker.person.lastName(), 10)
            .map((label, index) => [`brand-${index}`, label]),
    );

    const sizes = Object.fromEntries(
        ['xs', 's', 'm', 'l', 'xl', 'xxl'].map((size) => [`size-${size}`, size.toUpperCase()]),
    );

    function createRandomProduct(): Product {
        const formatPrice = (price: number) =>
            new Intl.NumberFormat('ru', {
                style: 'currency',
                currency: 'RUB',
                maximumFractionDigits: 0,
            }).format(price);

        const rawPrice = 1000 * faker.number.int({ min: 1, max: 10 });
        const rawSalePrice = rawPrice * (1 - faker.number.float({ max: 0.5, precision: 0.1 }));
        const category = faker.helpers.objectKey(categories).toString();
        return {
            id: faker.string.nanoid(),
            name: startCase(faker.lorem.sentence({ min: 2, max: 8 })),
            rawPrice,
            rawSalePrice,
            price: formatPrice(rawPrice),
            salePrice: formatPrice(rawSalePrice),
            hot: faker.datatype.boolean(0.3),
            inStock: faker.datatype.boolean(0.7),
            category,
            brand: faker.helpers.objectKey(brands).toString(),
            size: faker.helpers.objectKey(sizes).toString(),
            thumbnail: new URL(
                `https://source.unsplash.com/random/400x300?product,${categories[
                    category
                ].toLowerCase()}`,
            ),
        };
    }

    writeFileSync(
        './public/api/products.json',
        JSON.stringify({
            categories,
            brands,
            sizes,
            products: Array.from(Array(15), () => createRandomProduct()),
        }),
    );
}

export default function mockAPIPlugin() {
    return {
        name: 'mock-api-plugin',
        buildStart() {
            createAPIFile();
        },
    };
}
