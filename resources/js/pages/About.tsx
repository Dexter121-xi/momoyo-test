import { useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
    year: string;
    title: string;
    description: string;
    image: string;
}

const milestones: Milestone[] = [
    {
        year: "2022",
        title: "Pendirian & Cikal Bakal",
        description: "PT Junyi Jaya Indonesia mendirikan Momoyo sebagai merek F&B lokal dengan fokus es krim dan minuman teh buah. Identitas visual dengan maskot beruang putih lucu dan warna merah cerah mulai dibangun sejak awal.",
        image: "/about-bahan/logo-awal.png"
    },
    {
        year: "27 Feb 2023",
        title: "Toko Pertama",
        description: "Momoyo membuka toko pertamanya di Jakarta (Ciledug) pada tanggal 27 Februari 2023. Desain toko pertama sudah menampilkan ciri khas Momoyo: dominasi warna merah, mural maskot beruang, dan konsep gerai yang compact namun eye-catching.",
        image: "/about-bahan/toko-pertama.jpeg"
    },
    {
        year: "2023–2024",
        title: "Ekspansi Cepat & Pertumbuhan",
        description: "Dalam waktu singkat, Momoyo mulai membuka gerai di berbagai kota di Indonesia. Pada September 2024, toko Momoyo sudah hadir di Cianjur dan kota-kota lainnya.",
        image: "/about-bahan/expansi.png"
    },
    {
        year: "2024–2025",
        title: "Go Internasional",
        description: "Momoyo mulai merambah pasar internasional dengan membuka gerai di Brunei, Malaysia, dan Filipina. Brand ini dikenal sebagai salah satu merek F&B Indonesia yang tumbuh tercepat di Asia Tenggara.",
        image: "/bahan/momoyo-removebg-preview.png"
    },
    {
        year: "Agustus 2025",
        title: "Inovasi Produk — YoFlip",
        description: "Momoyo meluncurkan YoFlip Batik — es krim terbalik (flippable ice cream) dengan kemasan bertema batik di Malaysia. Ini menandai inovasi produk sekaligus apresiasi terhadap budaya lokal.",
        image: "/about-bahan/batik.jpeg"
    },
    {
        year: "April 2026",
        title: "Momoyo Island — Tonggak Terbesar",
        description: "Pada 19–21 April 2026, Momoyo meresmikan Momoyo Island di Jatiwaringin — gerai milk tea & ice cream terbesar di Indonesia. Promo bagi-bagi 1 juta es krim gratis. Konsep gerai megah dengan bakery, merchandise, dan maskot beruang raksasa.",
        image: "/about-bahan/momoyo -island.jpeg"
    }
];

export default function About() {
    const mainRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const bearRef = useRef<HTMLImageElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Red Line Progress
            gsap.fromTo(lineRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top center",
                        end: "bottom center",
                        scrub: 0.2,
                    }
                }
            );

            // 2. Bear Keychain Physics
            let resetTween: gsap.core.Tween;
            let fallTimeline: gsap.core.Timeline;
            let isFallen = false;

            ScrollTrigger.create({
                trigger: document.documentElement,
                start: 0,
                end: "max",
                onUpdate: (self) => {
                    if (isFallen) return; // Skip physics if bear has fallen onto footer

                    const velocity = self.getVelocity();
                    const rotate = gsap.utils.clamp(-25, 25, velocity / 100);
                    const xShift = gsap.utils.clamp(-40, 40, velocity / 60);

                    gsap.to(bearRef.current, {
                        rotation: rotate,
                        x: xShift,
                        duration: 0.2,
                        ease: "power2.out",
                        overwrite: "auto"
                    });

                    if (resetTween) resetTween.kill();
                    resetTween = gsap.to(bearRef.current, {
                        rotation: 0,
                        x: 0,
                        duration: 0.8,
                        delay: 0.1,
                        ease: "elastic.out(1, 0.4)",
                        overwrite: "auto"
                    });
                }
            });

            // 3. The Wobbling Falling Bear (Terombang-ambing)
            ScrollTrigger.create({
                trigger: "footer",
                start: "top 95%", // Triggers right before footer comes fully into view
                onEnter: () => {
                    isFallen = true;
                    if (resetTween) resetTween.kill();
                    if (fallTimeline) fallTimeline.kill();
                    
                    const footerElement = document.querySelector('footer');
                    let dropY = window.innerHeight * 0.4; // Default fallback distance
                    
                    if (footerElement && bearRef.current) {
                        const footerRect = footerElement.getBoundingClientRect();
                        const bearRect = bearRef.current.getBoundingClientRect();
                        
                        // Calculate exact distance for bear to hit footer's top
                        dropY = footerRect.top - (bearRect.top + (bearRect.height / 2));
                    }
                    
                    fallTimeline = gsap.timeline({ overwrite: "auto" });
                    
                    // Step 1: The Fall
                    fallTimeline.to(bearRef.current, {
                        y: dropY,
                        duration: 0.8,
                        ease: "power2.in", // Gravity accelerates
                        opacity: 1, // Become fully visible when falling
                        scale: 1.2
                    })
                    // Step 2: The Wobble (Terombang-ambing)
                    .to(bearRef.current, {
                        rotation: 45,
                        duration: 0.2,
                        ease: "power1.inOut"
                    })
                    .to(bearRef.current, {
                        rotation: -15,
                        duration: 0.3,
                        ease: "power1.inOut"
                    })
                    .to(bearRef.current, {
                        rotation: 10,
                        duration: 0.3,
                        ease: "power1.inOut"
                    })
                    .to(bearRef.current, {
                        rotation: 0,
                        duration: 1,
                        ease: "elastic.out(1, 0.3)" // Settle into place
                    });
                },
                onLeaveBack: () => {
                    isFallen = false;
                    if (fallTimeline) fallTimeline.kill();
                    
                    // Float back up to original state
                    gsap.to(bearRef.current, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 0.15,
                        rotation: 0,
                        duration: 1,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                }
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <MainLayout>
            <Head title="Our Story | Momoyo" />

            <div ref={mainRef} className="bg-momoyo-cream w-full min-h-screen overflow-x-hidden relative">

                {/* Background Ambient Blobs - transform-gpu fixes Safari black box bug */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-momoyo-light/25 rounded-full filter blur-[100px] pointer-events-none z-0 transform-gpu" />
                <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-red-100/30 rounded-full filter blur-[120px] pointer-events-none z-0 transform-gpu" />

                {/* Large Background Bear - Framer handles Y float, GSAP handles swing physics */}
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                    <motion.div
                        animate={{ y: [-15, 15, -15] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <img
                            ref={bearRef}
                            src="/bahan/beruang_.png"
                            alt="Momoyo Mascot"
                            className="w-64 md:w-96 lg:w-[450px] opacity-15 select-none"
                            style={{ transformOrigin: "top center" }}
                        />
                    </motion.div>
                </div>

                <div className="py-24 relative z-10 w-full h-full">

                    {/* Header */}
                    <div className="text-center mb-24 max-w-3xl mx-auto px-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-momoyo bg-momoyo-light px-3.5 py-1.5 rounded-full mb-4 inline-block shadow-sm font-heading">
                            Perjalanan Manis Kami
                        </span>
                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
                            Momoyo History
                        </h1>
                        <p className="font-sans text-lg text-gray-700 leading-relaxed font-light">
                            Dari cikal bakal sederhana hingga menjadi gerai milk tea & ice cream terbesar di Indonesia. Yuk ikuti lini masa pertumbuhan kami!
                        </p>
                    </div>

                    {/* Centered Vertical Timeline */}
                    <div ref={timelineRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-32">

                        {/* Background Central Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-32 w-[4px] bg-gray-200/80 -translate-x-1/2 rounded-full z-0" />

                        {/* Animated Scroll Progress Line */}
                        <div
                            ref={lineRef}
                            className="absolute left-4 md:left-1/2 top-0 w-[4px] bg-momoyo shadow-[0_0_12px_rgba(230,0,18,0.6)] -translate-x-1/2 rounded-full z-10"
                        />

                        {/* Milestones list */}
                        <div className="space-y-32">
                            {milestones.map((milestone, index) => {
                                const isEven = index % 2 === 0;

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col md:flex-row items-center justify-between relative w-full"
                                    >
                                        {/* Timeline Node Point - Visible on desktop */}
                                        <div className="hidden md:flex absolute left-1/2 top-1/2 w-8 h-8 rounded-full border-4 border-white bg-momoyo shadow-[0_0_12px_rgba(230,0,18,0.5)] -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-white" />
                                        </div>

                                        {/* Timeline Node Point - Visible on mobile (left side) */}
                                        <div className="md:hidden absolute left-4 top-1/2 w-8 h-8 rounded-full border-4 border-white bg-momoyo shadow-[0_0_12px_rgba(230,0,18,0.5)] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-white" />
                                        </div>

                                        {/* Left Side (DOM order 1) */}
                                        <div className={`w-full md:w-[45%] pl-12 md:pl-0 order-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                                            {isEven ? (
                                                /* Text Card (Even: Left side, right-aligned) */
                                                <motion.div
                                                    initial={{ opacity: 0, x: -50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    animate={{ y: [-5, 5, -5] }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ 
                                                        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                                        x: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                                                    }}
                                                    className="w-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-6 md:p-8 hover:shadow-[0_20px_40px_rgba(230,0,18,0.1)] transition-all duration-300 relative overflow-hidden text-left md:text-right"
                                                >
                                                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-momoyo-light rounded-full opacity-30 blur-xl pointer-events-none" />

                                                    {/* Year Heading */}
                                                    <div className="flex items-center justify-start md:justify-end gap-3 mb-4">
                                                        <div className="hidden md:block h-px flex-grow bg-gray-200/80" />
                                                        <span className="font-heading text-5xl md:text-7xl text-momoyo/20 font-extrabold tracking-tight">
                                                            {milestone.year}
                                                        </span>
                                                        <div className="md:hidden h-px flex-grow bg-gray-200/80" />
                                                    </div>

                                                    <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                                                        {milestone.title}
                                                    </h3>

                                                    <p className="font-sans text-lg text-gray-700 leading-relaxed">
                                                        {milestone.description}
                                                    </p>
                                                </motion.div>
                                            ) : (
                                                /* Image Card (Odd: Left side) */
                                                <motion.div
                                                    initial={{ opacity: 0, x: -50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    animate={{ y: [5, -5, 5] }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ 
                                                        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                                                        x: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                                                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                                                    }}
                                                    className="w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-white/40 group relative"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
                                                    <img
                                                        src={milestone.image}
                                                        alt={milestone.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    />
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* Right Side (DOM order 2) */}
                                        <div className={`w-full md:w-[45%] pl-12 md:pl-0 mt-6 md:mt-0 order-2 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                                            {isEven ? (
                                                /* Image Card (Even: Right side) */
                                                <motion.div
                                                    initial={{ opacity: 0, x: 50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    animate={{ y: [5, -5, 5] }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ 
                                                        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                                                        x: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
                                                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                                                    }}
                                                    className="w-full aspect-video md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-white/40 group relative"
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10 pointer-events-none" />
                                                    <img
                                                        src={milestone.image}
                                                        alt={milestone.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    />
                                                </motion.div>
                                            ) : (
                                                /* Text Card (Odd: Right side, left-aligned) */
                                                <motion.div
                                                    initial={{ opacity: 0, x: 50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    animate={{ y: [-5, 5, -5] }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ 
                                                        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                                        x: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                                                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                                                    }}
                                                    className="w-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-6 md:p-8 hover:shadow-[0_20px_40px_rgba(230,0,18,0.1)] transition-all duration-300 relative overflow-hidden text-left"
                                                >
                                                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-momoyo-light rounded-full opacity-30 blur-xl pointer-events-none" />

                                                    {/* Year Heading */}
                                                    <div className="flex items-center justify-start gap-3 mb-4">
                                                        <span className="font-heading text-5xl md:text-7xl text-momoyo/20 font-extrabold tracking-tight">
                                                            {milestone.year}
                                                        </span>
                                                        <div className="h-px flex-grow bg-gray-200/80" />
                                                    </div>

                                                    <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                                                        {milestone.title}
                                                    </h3>

                                                    <p className="font-sans text-lg text-gray-700 leading-relaxed">
                                                        {milestone.description}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <div ref={footerRef} className="max-w-4xl mx-auto px-4 text-center mt-24 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-momoyo rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden"
                        >
                            {/* Background pattern */}
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />

                            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                                Yuk Kunjungi Gerai Kami!
                            </h2>

                            <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto opacity-90 font-light font-sans">
                                Nikmati sajian teh buah segar dan es krim lezat di gerai Momoyo terdekat dari lokasimu.
                            </p>

                            <a
                                href="/locations"
                                className="inline-block bg-white text-momoyo hover:bg-momoyo-light px-10 py-4 rounded-full font-heading text-xl font-bold transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
                            >
                                Cari Gerai Terdekat
                            </a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
