import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    const { url } = usePage();

    return (
        <div className="min-h-screen flex flex-col bg-[#FFFDF9] font-sans selection:bg-momoyo selection:text-white w-full overflow-x-hidden relative">
            <Navbar />
            
            {/* Stable container to prevent page height collapse during WAIT state transitions */}
            <div className="flex-grow w-full relative min-h-[70vh] bg-[#FFFDF9]">
                <AnimatePresence mode="wait">
                    <motion.main
                        key={url}
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ 
                            opacity: 1, 
                            filter: 'blur(0px)',
                            transitionEnd: { filter: 'none', transform: 'none' }
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="w-full pt-20" // padding top for fixed navbar
                    >
                        {children}
                    </motion.main>
                </AnimatePresence>
            </div>
            
            <Footer />
        </div>
    );
}
