import { Head } from '@inertiajs/react';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
}

export default function SEO({ 
    title, 
    description = 'Momoyo - Premium Ice Cream & Fresh Fruit Tea. Taste the Joy of Momoyo!', 
    image = '/bahan/momoyo-removebg-preview.png',
    url = ''
}: SEOProps) {
    const fullTitle = `${title} | Momoyo`;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const fullUrl = url ? `${origin}${url}` : (typeof window !== 'undefined' ? window.location.href : '');

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    );
}
