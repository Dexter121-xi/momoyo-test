import { Link } from '@inertiajs/react';
import { Instagram } from 'lucide-react';

const TiktokIcon = ({ size = 18 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export default function Footer() {
    return (
        <footer className="bg-momoyo-cream pt-16 pb-8 border-t border-red-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <img
                            src="/bahan/momoyo-removebg-preview.png"
                            alt="Momoyo Logo"
                            className="h-16 w-auto object-contain mb-4"
                        />
                        <p className="text-gray-600 max-w-sm mb-6 font-sans">
                            Delighting your day with the perfect blend of fresh fruit teas and creamy ice creams. Experience the taste of joy!
                        </p>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-xl text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2 font-sans">
                            <li><Link href="/" className="text-gray-600 hover:text-momoyo hover:translate-x-1 inline-block transition-all duration-300 ease-out">Home</Link></li>
                            <li><Link href="/our-menu" className="text-gray-600 hover:text-momoyo hover:translate-x-1 inline-block transition-all duration-300 ease-out">Menu</Link></li>
                            <li><Link href="/about" className="text-gray-600 hover:text-momoyo hover:translate-x-1 inline-block transition-all duration-300 ease-out">About Us</Link></li>
                            <li><Link href="/locations" className="text-gray-600 hover:text-momoyo hover:translate-x-1 inline-block transition-all duration-300 ease-out">Locations</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-xl text-gray-900 mb-4 font-heading">Connect With Us</h4>
                        <ul className="space-y-3 font-sans">
                            <li>
                                <a
                                    href="https://www.instagram.com/momoyo.benefit/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 text-gray-600 hover:text-momoyo hover:translate-x-1 inline-flex transition-all duration-300 ease-out"
                                >
                                    <Instagram size={18} />
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tiktok.com/@momoyo.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2.5 text-gray-600 hover:text-momoyo hover:translate-x-1 inline-flex transition-all duration-300 ease-out"
                                >
                                    <TiktokIcon size={18} />
                                    <span>TikTok</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-red-200 pt-8 flex flex-col md:flex-row justify-between items-center font-sans text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Momoyo. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-momoyo transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-momoyo transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
