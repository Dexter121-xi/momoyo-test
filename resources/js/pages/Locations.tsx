import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';

const locations = [
    { id: 1, name: 'Momoyo Grand Indonesia', address: 'Jl. M.H. Thamrin No.1, Jakarta Pusat', hours: '10:00 - 22:00', status: 'Open' },
    { id: 2, name: 'Momoyo Senayan City', address: 'Jl. Asia Afrika Lot 19, Jakarta Pusat', hours: '10:00 - 22:00', status: 'Open' },
    { id: 3, name: 'Momoyo PIK', address: 'Pantai Indah Kapuk, Jakarta Utara', hours: '10:00 - 23:00', status: 'Open' },
    { id: 4, name: 'Momoyo Kelapa Gading', address: 'Jl. Boulevard Raya, Jakarta Utara', hours: '10:00 - 22:00', status: 'Coming Soon' },
];

export default function Locations() {
    return (
        <MainLayout>
            <Head title="Locations | Momoyo" />

            <div className="bg-momoyo-cream min-h-screen py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="text-center mb-16">
                        <h1 className="font-heading text-5xl font-bold text-gray-900 mb-4">Find a Momoyo</h1>
                        <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
                            Visit our stores to enjoy our fresh fruit teas and ice creams in person.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Store List */}
                        <div className="w-full lg:w-1/3 space-y-4">
                            {locations.map((loc, i) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={loc.id} 
                                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-momoyo cursor-pointer"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-heading text-xl font-bold text-gray-900">{loc.name}</h3>
                                        <span className={`text-xs font-bold px-2 py-1 rounded-md ${loc.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {loc.status}
                                        </span>
                                    </div>
                                    <p className="font-sans text-gray-600 text-sm mb-2">{loc.address}</p>
                                    <p className="font-sans text-sm font-semibold text-gray-500">Hours: {loc.hours}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Map Placeholder */}
                        <div className="w-full lg:w-2/3">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="bg-gray-200 w-full h-[600px] rounded-3xl overflow-hidden relative flex items-center justify-center shadow-xl border-4 border-white"
                            >
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
                                <div className="z-10 text-center">
                                    <div className="w-20 h-20 bg-momoyo rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl animate-bounce">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-heading text-2xl font-bold text-gray-800">Interactive Map</h3>
                                    <p className="font-sans text-gray-600">Select a store from the list</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    );
}
