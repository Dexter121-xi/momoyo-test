import { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import SEO from '@/components/SEO';
import MainLayout from '@/layouts/MainLayout';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import InfiniteMarquee from '@/components/InfiniteMarquee';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 300;
const currentFrame = (index: number) => 
    `/image-sequence/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    
    const posters = [
        { src: "/POSTER/poster1.webp", title: "Signature Series", desc: "Experience the authentic taste of premium brewed tea." },
        { src: "/POSTER/icecream.webp", title: "Jumbo Ice Cream", desc: "Creamy, rich, and ridiculously large. A true delight." },
        { src: "/POSTER/yofilp.webp", title: "YoFlip Special", desc: "The ultimate flip of joy. Mixed to perfection." },
        { src: "/POSTER/Screenshot 2026-05-30 at 17-27-01 Instagram.png", title: "Momoyo Promo", desc: "Don't miss our latest sweet deals and weekend specials." }
    ];

    const [hoveredPoster, setHoveredPoster] = useState<number | null>(null);
    const [isDesktop, setIsDesktop] = useState(true);

    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);

    useEffect(() => {
        let loadedCount = 0;
        const tempImages: HTMLImageElement[] = [];
        let isCancelled = false;

        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        const heroSection = heroRef.current;
        if (!canvas || !context || !heroSection) return;

        let lastRenderedFrame = -1;

        const render = (index: number) => {
            if (index === lastRenderedFrame) return;
            
            const img = imagesRef.current[index];
            if (img && img.complete && img.naturalHeight !== 0) {
                const dpr = window.devicePixelRatio || 1;
                const width = canvas.width / dpr;
                const height = canvas.height / dpr;
                
                const scale = Math.max(width / img.width, height / img.height);
                const x = (width / 2) - (img.width / 2) * scale;
                const y = (height / 2) - (img.height / 2) * scale;
                
                context.clearRect(0, 0, width, height);
                context.drawImage(img, x, y, img.width * scale, img.height * scale);
                lastRenderedFrame = index;
            }
        };

        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            context.resetTransform();
            context.scale(dpr, dpr);
            lastRenderedFrame = -1; // Reset cache to force redraw on resize
            render(Math.floor(sequence.frame));
        };

        const sequence = { frame: 0 };
        let ctx = gsap.context(() => {});

        const startAnimations = () => {
            if (isCancelled) return;
            
            // Set up resize listener & do initial draw
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();

            ctx.add(() => {
                gsap.to(sequence, {
                    frame: frameCount - 1,
                    ease: 'none', // DO NOT USE SNAP
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: '+=1000%', // Longer scroll distance so 300 frames play out slowly and elegantly
                        scrub: 1,
                        pin: true,
                        pinSpacing: true,
                        onUpdate: () => render(Math.floor(sequence.frame)),
                    }
                });
            });
        };

        const preloadImages = async () => {
            const promises = [];
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                
                const promise = new Promise<void>((resolve) => {
                    img.onload = () => {
                        if (isCancelled) {
                            resolve();
                            return;
                        }
                        
                        // Try to decode to offload main thread if supported
                        if (typeof img.decode === 'function') {
                            img.decode()
                                .then(() => {
                                    if (isCancelled) return;
                                    loadedCount++;
                                    setLoadedImagesCount(loadedCount);
                                    setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
                                    resolve();
                                })
                                .catch(() => {
                                    if (isCancelled) return;
                                    loadedCount++;
                                    setLoadedImagesCount(loadedCount);
                                    setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
                                    resolve();
                                });
                        } else {
                            loadedCount++;
                            setLoadedImagesCount(loadedCount);
                            setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
                            resolve();
                        }
                    };
                    
                    img.onerror = () => {
                        if (isCancelled) {
                            resolve();
                            return;
                        }
                        // Fallback resolve to prevent loading from getting stuck
                        loadedCount++;
                        setLoadedImagesCount(loadedCount);
                        setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
                        resolve();
                    };
                });
                
                img.src = currentFrame(i);
                promises.push(promise);
                tempImages.push(img);
            }

            await Promise.all(promises);
            
            if (!isCancelled && loadedCount === frameCount) {
                imagesRef.current = tempImages;
                setIsLoading(false);
                startAnimations();
            }
        };

        preloadImages();

        return () => {
            isCancelled = true;
            window.removeEventListener('resize', resizeCanvas);
            ctx.revert();
        };
    }, []);

    // Prevent body scroll during full-screen loading state and setup media query
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('resize', checkDesktop);
        };
    }, [isLoading]);

    // Floating bear animation
    const bearRef = useRef<HTMLImageElement>(null);
    useEffect(() => {
        if (bearRef.current) {
            gsap.to(bearRef.current, {
                y: -10,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }, [isLoading]);

    // Framer Motion Variants for entrance and scroll reveals
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
                delayChildren: 0.4
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const cardContainerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <MainLayout>
            <SEO title="Home" />

            {/* Atmospheric Floating Particles */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-multiply opacity-70">
                <motion.div animate={{ y: [0, -40, 0], x: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-red-400/20 rounded-full blur-[100px]" />
                <motion.div animate={{ y: [0, 40, 0], x: [0, -30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[60%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-red-200/20 rounded-full blur-[120px]" />
                <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-[35%] left-[45%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-orange-200/20 rounded-full blur-[140px] -translate-x-1/2" />
            </div>

            {/* Custom Premium Preloader */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
                        className="fixed inset-0 bg-momoyo z-[9999] flex flex-col items-center justify-center text-white"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="mb-8"
                        >
                            <img
                                src="/bahan/momoyo-removebg-preview.png"
                                alt="Momoyo Logo"
                                className="h-24 w-auto object-contain brightness-0 invert"
                            />
                        </motion.div>
                        <h2 className="font-heading text-3xl font-bold tracking-wider mb-2">LOADING JOY</h2>
                        <div className="w-64 h-1.5 bg-red-800 rounded-full overflow-hidden mb-4 relative">
                            <motion.div
                                className="h-full bg-white rounded-full absolute left-0 top-0"
                                style={{ width: `${loadingProgress}%` }}
                                transition={{ ease: 'easeOut' }}
                            />
                        </div>
                        <span className="font-sans font-medium text-lg opacity-85">{loadingProgress}%</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stable Wrapper to prevent React 'removeChild' crash when GSAP reparents heroRef to the body */}
            <div className="w-full relative">
                {/* GSAP Canvas Image Sequence Hero Wrapper */}
                <div ref={heroRef} className="relative h-[100dvh] w-full bg-black">
                    <canvas 
                        ref={canvasRef} 
                        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                        className="absolute top-0 left-0 w-full h-full block"
                    ></canvas>
                
                {/* Hero Overlay Content with Entrance Animation */}
                {!isLoading && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 text-white z-10 pointer-events-none"
                    >
                        <motion.h1 
                            variants={itemVariants} 
                            className="font-heading text-5xl md:text-8xl font-bold mb-4 drop-shadow-xl text-center leading-tight"
                        >
                            Taste the Joy <br/> of Momoyo
                        </motion.h1>
                        <motion.p 
                            variants={itemVariants} 
                            className="text-xl md:text-3xl font-sans drop-shadow-md mb-10 tracking-wide font-light"
                        >
                            Premium Ice Cream & Fruit Tea
                        </motion.p>
                        <motion.div variants={itemVariants} className="pointer-events-auto">
                            <Link 
                                href="/our-menu" 
                                className="bg-momoyo hover:bg-red-700 text-white px-10 py-5 rounded-full font-heading text-2xl transition-all duration-300 ease-out hover:scale-[1.02] shadow-xl hover:shadow-red-500/20 block border border-red-500/30 text-center"
                            >
                                Explore Menu
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
                </div>
            </div>

            {/* Infinite Scrolling Marquee */}
            <InfiniteMarquee />

            {/* Hover-Based Expanding Accordion Poster Gallery */}
            <section className="py-24 bg-transparent relative overflow-hidden flex flex-col justify-center items-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-heading text-4xl md:text-5xl font-bold text-center text-gray-900 mb-12 relative z-10 drop-shadow-sm"
                >
                    Our Favorites
                </motion.h2>

                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:h-[600px] flex flex-col md:flex-row gap-4 md:gap-2 relative z-10">
                    {posters.map((poster, index) => {
                        const isActive = hoveredPoster === index;
                        
                        return (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                animate={isDesktop ? {
                                    flex: isActive ? 2 : (hoveredPoster !== null ? 1 : 1.2)
                                } : {
                                    height: isActive ? 384 : 100 // 384px (24rem) for active, 100px for inactive
                                }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ 
                                    type: "spring", stiffness: 200, damping: 25,
                                    opacity: { duration: 0.6, delay: index * 0.1 },
                                    y: { duration: 0.6, delay: index * 0.1 }
                                }}
                                onHoverStart={() => isDesktop && setHoveredPoster(index)}
                                onHoverEnd={() => isDesktop && setHoveredPoster(null)}
                                onClick={() => !isDesktop && setHoveredPoster(isActive ? null : index)}
                                className={`relative rounded-3xl overflow-hidden cursor-pointer w-full bg-[#FFFDF9] border border-red-500/10 transition-shadow duration-500
                                    ${isDesktop ? 'h-full' : ''}
                                    ${isActive ? 'shadow-[0_20px_50px_rgba(230,0,18,0.3)] z-20' : 'shadow-lg z-10'}`}
                            >
                                <img 
                                    src={poster.src} 
                                    alt={poster.title} 
                                    className="absolute inset-0 w-full h-full object-cover object-center" 
                                />
                                
                                {/* Premium Glassmorphism Overlay */}
                                <motion.div 
                                    layout="position"
                                    className={`absolute bottom-4 left-4 right-4 p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-gray-900 flex flex-col justify-end transition-all duration-500 ease-out shadow-[0_8px_32px_rgba(0,0,0,0.1)]
                                        ${isActive ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'}`}
                                >
                                    <h3 className="font-heading text-xl md:text-3xl font-bold tracking-wide drop-shadow-sm text-momoyo">
                                        {poster.title}
                                    </h3>
                                    <p className="font-sans text-sm md:text-base mt-2 opacity-90 drop-shadow-sm line-clamp-2">
                                        {poster.desc}
                                    </p>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* Promo Banner with Bear */}
            <section className="py-24 bg-white relative overflow-hidden">
                {/* Ambient Blob */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        rotate: [0, 45, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-momoyo-light/25 rounded-full blur-[120px] pointer-events-none z-0"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="bg-momoyo rounded-[3rem] p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden border border-red-500/20"
                    >
                        <div className="md:w-1/2 z-10">
                            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">Weekend Special Promo!</h2>
                            <p className="font-sans text-xl mb-8 opacity-90 leading-relaxed">Buy 1 Get 1 Free on all Fruit Teas. Don't miss out on this sweet deal.</p>
                            <Link href="/locations" className="bg-white text-momoyo px-8 py-4 rounded-full font-heading text-xl font-bold hover:bg-gray-100 transition-colors inline-block shadow-lg">
                                Find a Store
                            </Link>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10">
                            <img 
                                ref={bearRef}
                                src="/bahan/beruang_.png" 
                                alt="Momoyo Bear Mascot" 
                                className="w-64 md:w-80 object-contain drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}
