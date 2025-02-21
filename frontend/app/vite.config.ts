import { defineConfig, loadEnv } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    return {
        build: {
            outDir: 'dist',
            emptyOutDir: true
        },
        define: {
            global: {},
        },
        plugins: [react({
            include: "**/*.jsx"
        })],
        resolve: {
            alias: {
              "@": path.resolve(__dirname, "./src"),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx']
          },
        server: {
            port: 3001,
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