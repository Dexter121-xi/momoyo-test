import { Link } from '@inertiajs/react';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function Error({ status }: { status: number }) {
    const title = {
        503: '503: Service Unavailable',
        500: '500: Server Error',
        404: '404: Page Not Found',
        403: '403: Forbidden',
    }[status] || 'Error';

    const description = {
        503: 'Sorry, we are doing some maintenance. Please check back soon.',
        500: 'Whoops, something went wrong on our servers.',
        404: 'Sorry, the page you are looking for could not be found.',
        403: 'Sorry, you are forbidden from accessing this page.',
    }[status] || 'An unexpected error occurred.';

    return (
        <div className="min-h-screen bg-momoyo-cream flex flex-col items-center justify-center relative overflow-hidden font-sans">
            <SEO title={title} description={description} />
            
            {/* Background blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 90, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-red-100/30 rounded-full blur-[100px] pointer-events-none z-0"
            />

            <div className="relative z-10 text-center px-4 max-w-2xl">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <img 
                        src="/bahan/beruang_.png" 
                        alt="Confused Bear" 
                        className="w-64 md:w-80 mx-auto drop-shadow-2xl mb-8 object-contain"
                    />
                    
                    <h1 className="font-heading text-6xl md:text-8xl font-bold text-momoyo mb-4 drop-shadow-sm">
                        {status}
                    </h1>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 font-heading">
                        {title.split(': ')[1] || 'Oh no!'}
                    </h2>
                    
                    <p className="text-xl text-gray-600 mb-10">
                        {description}
                    </p>
                    
                    <Link 
                        href="/" 
                        className="inline-block bg-momoyo text-white px-8 py-4 rounded-full font-heading text-xl transition-all hover:bg-red-700 hover:scale-105 shadow-xl shadow-red-200"
                    >
                        Back to Home
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
