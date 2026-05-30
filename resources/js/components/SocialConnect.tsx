import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface InstagramPost {
    id: number;
    imageUrl: string;
    likes: string;
    caption: string;
}

const instagramPosts: InstagramPost[] = [
    {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&h=600&q=80',
        likes: '1.2k',
        caption: 'Creamy Sundae Joy 🍦✨'
    },
    {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=600&h=600&q=80',
        likes: '954',
        caption: 'Fresh Strawberry Fruit Tea 🍓🍊'
    },
    {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&h=600&q=80',
        likes: '1.8k',
        caption: 'Signature Boba Milk Tea 🧋✨'
    },
    {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&h=600&q=80',
        likes: '2.1k',
        caption: 'The Classic Giant Cone 🍦'
    },
    {
        id: 5,
        imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&h=600&q=80',
        likes: '842',
        caption: 'Mango Slush Delight 🥭🧊'
    },
    {
        id: 6,
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=600&h=600&q=80',
        likes: '1.5k',
        caption: 'Sharing sweet moments with friends 💖'
    }
];

export default function SocialConnect() {
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05, rootMargin: '100px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView) {
            const scriptId = 'tiktok-embed-script';
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.id = scriptId;
                script.src = 'https://www.tiktok.com/embed.js';
                script.async = true;
                document.body.appendChild(script);
            } else {
                // Trigger re-render of embeds if script already exists
                const win = window as any;
                if (win.tiktokEmbed && win.tiktokEmbed.lib && typeof win.tiktokEmbed.lib.render === 'function') {
                    try {
                        win.tiktokEmbed.lib.render();
                    } catch (e) {
                        console.error('Failed to render TikTok embeds:', e);
                    }
                }
            }
        }
    }, [isInView]);

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <section ref={sectionRef} className="py-24 bg-momoyo-cream relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-red-100/30 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-100/40 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-widest text-momoyo bg-momoyo-light px-3 py-1.5 rounded-full mb-3 inline-block">
                        Social Feed
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Join The Joy Online
                    </h2>
                    <p className="font-sans text-lg text-gray-600 max-w-xl mx-auto">
                        Share your sweetest moments and follow us on our social platforms for updates & promos!
                    </p>
                </div>

                {/* TikTok Embeds */}
                <div className="mb-24">
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
                        <svg className="w-6 h-6 text-black fill-current" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.97 1.21 2.34 2.05 3.84 2.39V10.5c-1.63-.03-3.23-.57-4.57-1.57-.45-.34-.86-.73-1.22-1.16v7.41c.04 1.41-.33 2.81-1.07 4.01-.73 1.2-1.83 2.14-3.13 2.7-1.3.56-2.75.72-4.14.45-1.39-.27-2.67-.97-3.66-2.01-1-1.03-1.62-2.38-1.78-3.8-.16-1.41.13-2.85.83-4.08.7-1.22 1.77-2.17 3.07-2.71 1.3-.54 2.74-.62 4.09-.23V7.21c-1.13-.3-2.33-.21-3.41.26-1.08.47-1.97 1.29-2.52 2.32-.56 1.04-.73 2.25-.49 3.41.24 1.16.89 2.19 1.83 2.9.94.71 2.1 1.03 3.27.91 1.17-.12 2.24-.71 2.97-1.63.74-.92 1.08-2.09 1.04-3.26-.01-2.92-.01-5.83-.01-8.75-.48.33-.99.63-1.53.88v-.4c0-.28 0-.55-.01-.83z"/>
                        </svg>
                        Viral on TikTok
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                        <AnimatePresence mode="wait">
                            {!isInView ? (
                                // Skeleton load placeholders
                                Array.from({ length: 3 }).map((_, i) => (
                                    <div 
                                        key={`skeleton-${i}`}
                                        className="w-[325px] h-[580px] bg-white rounded-[2.5rem] border-[8px] border-gray-900 shadow-xl flex flex-col items-center justify-center gap-4 animate-pulse"
                                    >
                                        <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                                        <div className="w-48 h-4 bg-gray-200 rounded"></div>
                                        <div className="w-32 h-3 bg-gray-200 rounded"></div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {/* TikTok 1 */}
                                    <motion.div 
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="w-[325px] rounded-[2.5rem] border-[8px] border-gray-900 overflow-hidden shadow-2xl relative bg-[#010101] min-h-[580px] flex items-center justify-center"
                                    >
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@momoyo.id/video/7279361664188730629" 
                                            data-video-id="7279361664188730629" 
                                            style={{ maxWidth: '325px', minWidth: '325px', margin: '0' }}
                                        >
                                            <section className="text-white p-4">
                                                <a target="_blank" title="@momoyo.id" href="https://www.tiktok.com/@momoyo.id?refer=embed">@momoyo.id</a>
                                            </section>
                                        </blockquote>
                                    </motion.div>

                                    {/* TikTok 2 */}
                                    <motion.div 
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="w-[325px] rounded-[2.5rem] border-[8px] border-gray-900 overflow-hidden shadow-2xl relative bg-[#010101] min-h-[580px] flex items-center justify-center"
                                        style={{ transitionDelay: '100ms' }}
                                    >
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@momoyo.id/video/7295679901235678901" 
                                            data-video-id="7295679901235678901" 
                                            style={{ maxWidth: '325px', minWidth: '325px', margin: '0' }}
                                        >
                                            <section className="text-white p-4">
                                                <a target="_blank" title="@momoyo.id" href="https://www.tiktok.com/@momoyo.id?refer=embed">@momoyo.id</a>
                                            </section>
                                        </blockquote>
                                    </motion.div>

                                    {/* TikTok 3 */}
                                    <motion.div 
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="w-[325px] rounded-[2.5rem] border-[8px] border-gray-900 overflow-hidden shadow-2xl relative bg-[#010101] min-h-[580px] flex items-center justify-center"
                                        style={{ transitionDelay: '200ms' }}
                                    >
                                        <blockquote 
                                            className="tiktok-embed" 
                                            cite="https://www.tiktok.com/@momoyo.id/video/7301234567890123456" 
                                            data-video-id="7301234567890123456" 
                                            style={{ maxWidth: '325px', minWidth: '325px', margin: '0' }}
                                        >
                                            <section className="text-white p-4">
                                                <a target="_blank" title="@momoyo.id" href="https://www.tiktok.com/@momoyo.id?refer=embed">@momoyo.id</a>
                                            </section>
                                        </blockquote>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* TikTok Follow Button */}
                    <div className="flex justify-center mt-12">
                        <a 
                            href="https://www.tiktok.com/@momoyo.id" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-[#010101] hover:bg-zinc-900 border border-zinc-800 text-white font-heading text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-black/10 flex items-center gap-3"
                        >
                            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.97 1.21 2.34 2.05 3.84 2.39V10.5c-1.63-.03-3.23-.57-4.57-1.57-.45-.34-.86-.73-1.22-1.16v7.41c.04 1.41-.33 2.81-1.07 4.01-.73 1.2-1.83 2.14-3.13 2.7-1.3.56-2.75.72-4.14.45-1.39-.27-2.67-.97-3.66-2.01-1-1.03-1.62-2.38-1.78-3.8-.16-1.41.13-2.85.83-4.08.7-1.22 1.77-2.17 3.07-2.71 1.3-.54 2.74-.62 4.09-.23V7.21c-1.13-.3-2.33-.21-3.41.26-1.08.47-1.97 1.29-2.52 2.32-.56 1.04-.73 2.25-.49 3.41.24 1.16.89 2.19 1.83 2.9.94.71 2.1 1.03 3.27.91 1.17-.12 2.24-.71 2.97-1.63.74-.92 1.08-2.09 1.04-3.26-.01-2.92-.01-5.83-.01-8.75-.48.33-.99.63-1.53.88v-.4c0-.28 0-.55-.01-.83z"/>
                            </svg>
                            Join Our TikTok @momoyo.id
                        </a>
                    </div>
                </div>

                {/* Instagram Grid */}
                <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
                        <svg className="w-6 h-6 text-momoyo fill-current" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                        Instagram Feed
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {instagramPosts.map((post) => (
                            <motion.a 
                                key={post.id}
                                href="https://instagram.com/momoyo.id"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -6 }}
                                className="relative rounded-3xl overflow-hidden aspect-square bg-gray-100 group shadow-md hover:shadow-xl transition-all duration-300 border border-white/50"
                            >
                                <img 
                                    src={post.imageUrl} 
                                    alt={post.caption} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4">
                                    <Heart className="w-8 h-8 fill-white mb-2" />
                                    <span className="font-heading text-lg font-bold">{post.likes} Likes</span>
                                    <p className="text-sm font-sans opacity-90 mt-1 text-center line-clamp-2 px-2">
                                        {post.caption}
                                    </p>
                                    <span className="text-xs font-heading font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 mt-4 tracking-wider uppercase text-[10px]">
                                        View on Instagram
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Instagram CTA */}
                    <div className="flex justify-center mt-12">
                        <a 
                            href="https://instagram.com/momoyo.id" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-heading text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-purple-500/20 flex items-center gap-3"
                        >
                            <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                            </svg>
                            Follow @momoyo.id on Instagram
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
