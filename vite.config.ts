import inertia from '@inertiajs/vite';
// PERHATIKAN: import wayfinder sudah kita HAPUS dari baris atas ini
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig, PluginOption } from 'vite';

// Ubah menjadi async function agar kita bisa menggunakan 'await'
export default defineConfig(async () => {
    
    // 1. Kumpulkan plugin dasar yang dijamin aman di Vercel
    const myPlugins: PluginOption[] = [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
    ];

    // 2. DYNAMIC IMPORT: Hanya panggil plugin jika PHP tersedia (lokal).
    // Server Vercel / CI tidak memiliki PHP, jadi kita lewati agar tidak error.
    let hasPhp = false;
    try {
        const { execSync } = await import('node:child_process');
        execSync('php -v', { stdio: 'ignore' });
        hasPhp = true;
    } catch (e) {
        hasPhp = false;
    }

    if (hasPhp && !process.env.VERCEL && !process.env.CI) {
        try {
            const { wayfinder } = await import('@laravel/vite-plugin-wayfinder');
            
            myPlugins.push(
                wayfinder({
                    formVariants: true,
                }) as PluginOption
            );
        } catch (e) {
            console.warn('Wayfinder plugin failed to load:', e);
        }
    }

    return {
        plugins: myPlugins,
    };
});