import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Menu', href: '/our-menu' },
        { name: 'About', href: '/about' },
        { name: 'Locations', href: '/locations' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
                scrolled 
                    ? 'bg-white/70 backdrop-blur-lg border-white/20 shadow-md py-2' 
                    : 'bg-white/40 backdrop-blur-md border-white/10 py-4'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="/">
                            <img
                                src="/bahan/momoyo-removebg-preview.png"
                                alt="Momoyo Logo"
                                className="h-12 w-auto object-contain transition-all duration-300 hover:scale-[1.03]"
                            />
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`font-heading text-lg transition-all duration-300 hover:scale-[1.03] inline-block ${
                                    url === link.href
                                        ? 'text-momoyo font-bold drop-shadow-sm'
                                        : 'text-gray-800 hover:text-momoyo'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-800 hover:text-momoyo focus:outline-none"
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`font-heading text-xl px-4 py-2 rounded-lg ${
                                url === link.href
                                    ? 'bg-momoyo-light text-momoyo font-bold'
                                    : 'text-gray-800 hover:bg-gray-50'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
