import { defineConfig, loadEnv } from 'vite';
import path from "path"
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'


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
        plugins: [tailwindcss(),react({
            include: "**/*.jsx, **/*.tsx"
        })],
        resolve: {
            alias: {
              "@": path.resolve(__dirname, "./src"),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx']
          },
        server: {
            port: 3000,
            open: true,
            proxy: {
                '/api': {
                    target: `${env.VITE_SERVER_BASE_URI}`,
                    changeOrigin: true,
                    secure: false,
                    pathRewrite: { '^/api': '' },
                }
            },
            
        },
    };
});