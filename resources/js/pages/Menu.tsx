import { useState } from 'react';
import SEO from '@/components/SEO';
import MainLayout from '@/layouts/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Ice Cream & Sundae', 'Milk Tea', 'Fruit Tea', 'Egg Waffle', 'Specialty/YoFlip'];

interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: string;
    image: string;
}

interface MenuProps {
    menuItems: MenuItem[];
}

const fallbackMenuItems: MenuItem[] = [
    {
        id: 1,
        name: 'Boba Milk Tea',
        category: 'Milk Tea',
        price: 'Rp 19.000',
        image: '/menu/boba-milktea.webp'
    },
    {
        id: 2,
        name: 'Boba Pudding Milk Tea',
        category: 'Milk Tea',
        price: 'Rp 22.000',
        image: '/menu/boba-pudding-milk-tea.webp'
    },
    {
        id: 3,
        name: 'Boom Milk Tea',
        category: 'Milk Tea',
        price: 'Rp 18.000',
        image: '/menu/boom-milk.webp'
    },
    {
        id: 4,
        name: 'Brown Sugar Boba Jumbo Ice Cream',
        category: 'Ice Cream & Sundae',
        price: 'Rp 15.000',
        image: '/menu/brown-sugar-boba-JIC-1024x1024.webp'
    },
    {
        id: 5,
        name: 'Brown Sugar Boba Sundae',
        category: 'Ice Cream & Sundae',
        price: 'Rp 16.000',
        image: '/menu/brown-sugar-boba-sundae.webp'
    },
    {
        id: 6,
        name: 'Chocolate Egg Waffle',
        category: 'Egg Waffle',
        price: 'Rp 16.000',
        image: '/menu/choco-egg-waffle-1024x1024.webp'
    },
    {
        id: 7,
        name: 'Chocolate Fiesta Sundae',
        category: 'Ice Cream & Sundae',
        price: 'Rp 16.000',
        image: '/menu/choco-fiesta-sundae.webp'
    },
    {
        id: 8,
        name: 'Chocolate Ice Cream Milk Tea Premium',
        category: 'Milk Tea',
        price: 'Rp 21.000',
        image: '/menu/choco-ice-cream-milk-tea-1024x1024.webp'
    },
    {
        id: 9,
        name: 'Chocolate Ice Cream Milk Tea',
        category: 'Milk Tea',
        price: 'Rp 20.000',
        image: '/menu/choco-ice-cream-milk-tea.webp'
    },
    {
        id: 10,
        name: 'Chocolate Jumbo Ice Cream',
        category: 'Ice Cream & Sundae',
        price: 'Rp 12.000',
        image: '/menu/choco-jumbo-ice-cream-1024x1024.webp'
    },
    {
        id: 11,
        name: 'Chocolate Sundae',
        category: 'Ice Cream & Sundae',
        price: 'Rp 14.000',
        image: '/menu/choco-sundae-1024x1024.webp'
    },
    {
        id: 12,
        name: 'Chocolate Ice Cream Cone',
        category: 'Ice Cream & Sundae',
        price: 'Rp 8.000',
        image: '/menu/chocolate-ice-cream-cone-1024x1024.webp'
    },
    {
        id: 13,
        name: 'Brown Sugar Milk Tea',
        category: 'Milk Tea',
        price: 'Rp 18.000',
        image: '/menu/gula-milktea.webp'
    },
    {
        id: 14,
        name: 'Jumbo Milk Tea',
        category: 'Milk Tea',
        price: 'Rp 22.000',
        image: '/menu/jumbo-milk-tea.webp'
    },
    {
        id: 15,
        name: 'Fresh Lemon Black Tea',
        category: 'Fruit Tea',
        price: 'Rp 14.000',
        image: '/menu/lemon-black-tea-1024x1024.webp'
    },
    {
        id: 16,
        name: 'Signature Lemonade',
        category: 'Fruit Tea',
        price: 'Rp 10.000',
        image: '/menu/lemonade-1024x1024.webp'
    },
    {
        id: 17,
        name: 'Mango Egg Waffle',
        category: 'Egg Waffle',
        price: 'Rp 18.000',
        image: '/menu/mango-egg-waffle-1024x1024.webp'
    },
    {
        id: 18,
        name: 'Mango Sundae',
        category: 'Ice Cream & Sundae',
        price: 'Rp 16.000',
        image: '/menu/mango-sundae-1024x1024.webp'
    },
    {
        id: 19,
        name: 'Matcha Fiesta Sundae',
        category: 'Ice Cream & Sundae',
        price: 'Rp 16.000',
        image: '/menu/matcha-fiesta-sundae-1024x1024.webp'
    },
    {
        id: 20,
        name: 'Matcha Soft Serve Cone',
        category: 'Ice Cream & Sundae',
        price: 'Rp 8.000',
        image: '/menu/matcha-ice-cream-cone-.webp'
    },
    {
        id: 21,
        name: 'Oreo Egg Waffle',
        category: 'Egg Waffle',
        price: 'Rp 16.000',
        image: '/menu/oreo-egg-waffle-1024x1024.webp'
    },
    {
        id: 22,
        name: 'Oreo Milk Tea',
        category: 'Milk Tea',
        price: 'Rp 19.000',
        image: '/menu/oreo-milktea.webp'
    },
    {
        id: 23,
        name: 'Oreo Mountain Jumbo Ice Cream',
        category: 'Ice Cream & Sundae',
        price: 'Rp 15.000',
        image: '/menu/oreo-mountain-JIC-1024x1024.webp'
    },
    {
        id: 24,
        name: 'Oreo Sundae',
        category: 'Ice Cream & Sundae',
        price: 'Rp 14.000',
        image: '/menu/oreo-sundae-1024x1024.webp'
    },
    {
        id: 25,
        name: 'Original Egg Waffle',
        category: 'Egg Waffle',
        price: 'Rp 14.000',
        image: '/menu/original-egg-waffle-1024x1024.webp'
    },
    {
        id: 26,
        name: 'Passion Crystal Fruit Tea',
        category: 'Fruit Tea',
        price: 'Rp 22.000',
        image: '/menu/passion-crystal-boom-1024x1024.webp'
    },
    {
        id: 27,
        name: 'Peach Jumbo Ice Cream',
        category: 'Ice Cream & Sundae',
        price: 'Rp 15.000',
        image: '/menu/peach-JIC-1024x1024.webp'
    },
    {
        id: 28,
        name: 'Peach Strawberry Crystal Tea',
        category: 'Fruit Tea',
        price: 'Rp 24.000',
        image: '/menu/peach-strawberry-boom-1024x1024.webp'
    },
    {
        id: 29,
        name: 'Snow Top Milk Tea',
        category: 'Milk Tea',
        price: 'Rp 22.000',
        image: '/menu/snow-milktea.webp'
    },
    {
        id: 30,
        name: 'Snow Top Aren Milk Tea',
        category: 'Milk Tea',
        price: 'Rp 23.000',
        image: '/menu/snow-top-aren-milk-tea-1024x1024.webp'
    },
    {
        id: 31,
        name: 'Strawberry Egg Waffle',
        category: 'Egg Waffle',
        price: 'Rp 18.000',
        image: '/menu/strawberry-egg-waffle-1024x1024.webp'
    },
    {
        id: 32,
        name: 'Strawberry Fiesta Sundae',
        category: 'Ice Cream & Sundae',
        price: 'Rp 16.000',
        image: '/menu/strawberry-fiesta-sundae-1024x1024.webp'
    },
    {
        id: 33,
        name: 'Strawberry Jasmine Fruit Tea',
        category: 'Fruit Tea',
        price: 'Rp 20.000',
        image: '/menu/strawberry-jasmine-1024x1024.webp'
    },
    {
        id: 34,
        name: 'Vanilla Soft Serve Cone',
        category: 'Ice Cream & Sundae',
        price: 'Rp 8.000',
        image: '/menu/vanilla-ice-cream-cone.webp'
    },
    {
        id: 35,
        name: 'YoFlip Gula Aren',
        category: 'Specialty/YoFlip',
        price: 'Rp 25.000',
        image: '/menu/yoflip-gula-aren-1024x1024.webp'
    },
    {
        id: 36,
        name: 'YoFlip Oreo Crumble',
        category: 'Specialty/YoFlip',
        price: 'Rp 25.000',
        image: '/menu/yoflip-oreo-1024x1024.webp'
    },
    {
        id: 37,
        name: 'YoFlip Sweet Peach',
        category: 'Specialty/YoFlip',
        price: 'Rp 25.000',
        image: '/menu/yoflip-peach-1024x1024.webp'
    }
];

export default function Menu({ menuItems = fallbackMenuItems }: MenuProps) {
    const [activeCategory, setActiveCategory] = useState('All');

    // Ensure we handle cases where menuItems is empty/undefined
    const displayItems = menuItems.length > 0 ? menuItems : fallbackMenuItems;

    const filteredItems = displayItems.filter(item => 
        activeCategory === 'All' || item.category === activeCategory
    );

    return (
        <MainLayout>
            <SEO title="Menu" description="Check out the complete Momoyo menu, featuring delicious soft ice creams, fruit teas, milk teas, and specialty waffles." />

            <div className="bg-momoyo-cream min-h-screen py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-momoyo bg-momoyo-light px-3.5 py-1.5 rounded-full mb-4 inline-block shadow-sm">
                            Delicious Joy
                        </span>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                            Our Menu
                        </h1>
                        <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                            Discover 37 ways to sweeten your day. Made with premium tea leaves, real milk, and fresh, vibrant fruits.
                        </p>
                    </div>

                    {/* Filter Categories with layoutId active indicator */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-6 py-3 rounded-full font-heading text-lg font-semibold select-none cursor-pointer focus:outline-none"
                                style={{
                                    color: activeCategory === category ? '#ffffff' : '#4b5563'
                                }}
                            >
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeCategoryIndicator"
                                        className="absolute inset-0 bg-momoyo rounded-full shadow-lg shadow-red-500/20 z-0"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{category}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Menu Grid with Layout Animations */}
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -8 }}
                                    className="bg-white/70 backdrop-blur-md rounded-3xl p-4 shadow-lg hover:shadow-[0_15px_30px_rgba(230,0,18,0.15)] border border-white/60 group transition-all duration-300 flex flex-col overflow-hidden"
                                >
                                    {/* WebP Product Image frame with pink backdrop */}
                                    <div className="rounded-2xl overflow-hidden mb-4 aspect-square bg-[#FFEBED] relative select-none">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:rotate-[2deg]"
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                target.onerror = null;
                                                target.src = '/bahan/momoyo-removebg-preview.png';
                                                target.className = 'w-24 h-auto object-contain opacity-40 bg-transparent absolute inset-0 m-auto';
                                            }}
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow px-2 flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-momoyo bg-momoyo-light/60 px-2.5 py-1 rounded-md mb-2 inline-block">
                                                {item.category}
                                            </span>
                                            <h3 className="font-heading text-xl font-bold text-gray-900 mb-1 leading-snug tracking-tight">
                                                {item.name}
                                            </h3>
                                        </div>
                                        
                                        <div className="mt-4 pb-2">
                                            <span className="font-bold text-xl text-momoyo font-heading">{item.price}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 text-gray-500 font-sans text-xl">
                            No items found in this category.
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
