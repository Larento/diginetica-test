import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import mockAPIPlugin from './src/mock-api-plugin';

export default defineConfig({
    plugins: [mockAPIPlugin(), vue()],
    resolve: {
        alias: {
            '@': './src',
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "./src/styles/_mixins.scss";
                    @import "./src/styles/_colors.scss";
                    @import "./src/styles/_reset.scss";
                `,
            },
        },
    },
});
