import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginRequire from "vite-plugin-require";

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return {
        build: {
            outDir: 'build',
        },
        define: {
            global: {},
        },
        plugins: [react({
            include: "**/*.jsx",
        }), vitePluginRequire.default()],
        server: {
            port: 3000,
            open: true,
            proxy: {
                '/api': {
                    target: `${env.VITE_SERVER_BASE_URI}`,
                    changeOrigin: true,
                    secure: false,
                    pathRewrite: { '^/api': '' },
                },
                '/api/upload': {
                  target: `${env.VITE_SERVER_BASE_URI}`,
                changeOrigin: true,
                secure: false,
                pathRewrite: { '^/api/upload': '/api/upload' },
                },
                '/ws': {
                    target: `${env.VITE_SERVER_WS_BASE_URI}`,
                    ws: true,
                    changeOrigin: true,
                    secure: false,
                }
            },
            
        },
    };
});