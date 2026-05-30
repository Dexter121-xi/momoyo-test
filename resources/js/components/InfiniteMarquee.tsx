import { motion } from 'framer-motion';

export default function InfiniteMarquee() {
    const items = [
        "Premium Fruit Tea",
        "Fresh Ingredients",
        "Real Ice Cream",
        "Dopamine in a Cup",
        "Taste the Joy"
    ];
    
    // Create a robust set of items
    const marqueeItems = [...items, ...items, ...items];

    return (
        <div className="w-full bg-momoyo py-5 overflow-hidden border-y border-red-700/20 relative z-10 flex select-none shadow-inner">
            <motion.div 
                className="flex whitespace-nowrap text-white font-heading text-lg md:text-2xl font-bold tracking-wider uppercase"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    ease: "linear",
                    duration: 25,
                    repeat: Infinity,
                }}
            >
                {/* Render the duplicated lists to create a seamless loop */}
                <div className="flex shrink-0">
                    {marqueeItems.map((item, idx) => (
                        <div key={`marquee-1-${idx}`} className="flex items-center gap-6 px-10">
                            <span>✨</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
                <div className="flex shrink-0" aria-hidden="true">
                    {marqueeItems.map((item, idx) => (
                        <div key={`marquee-2-${idx}`} className="flex items-center gap-6 px-10">
                            <span>✨</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
