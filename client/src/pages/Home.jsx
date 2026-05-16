import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../features/api/productsApiSlice';
import ProductCard from '../components/product/ProductCard';
import { ArrowRight, Zap, ShieldCheck, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const { data, isLoading, error } = useGetProductsQuery({});

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Animated Background Mesh */}
                <div className="absolute inset-0 bg-background overflow-hidden -z-10">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-highlight/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] bg-accent/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-left"
                        >
                            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white leading-tight mb-6">
                                Discover Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">True Shopflow</span>
                            </h1>
                            <p className="text-lg md:text-xl text-textMuted mb-8 max-w-lg">
                                Experience the future of online shopping with our curated collection of premium products designed to elevate your lifestyle.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/products" className="px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(123,47,255,0.4)] hover:shadow-[0_0_30px_rgba(123,47,255,0.6)] flex items-center">
                                    Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <Link to="/products" className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-medium transition-all backdrop-blur-sm">
                                    Explore Categories
                                </Link>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative w-full aspect-square max-w-md mx-auto">
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-highlight/40 rounded-full blur-2xl animate-pulse"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop" 
                                    alt="Featured Product" 
                                    className="relative z-10 w-full h-full object-cover rounded-3xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Banner */}
            <section className="py-12 bg-white/5 border-y border-white/10 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 text-accent">
                                <Truck />
                            </div>
                            <h3 className="text-white font-semibold mb-1">Free Shipping</h3>
                            <p className="text-textMuted text-sm">On orders over ₹50</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-highlight/20 rounded-full flex items-center justify-center mb-4 text-highlight">
                                <ShieldCheck />
                            </div>
                            <h3 className="text-white font-semibold mb-1">Secure Payment</h3>
                            <p className="text-textMuted text-sm">100% protected transactions</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4 text-accent">
                                <Clock />
                            </div>
                            <h3 className="text-white font-semibold mb-1">24/7 Support</h3>
                            <p className="text-textMuted text-sm">Dedicated customer service</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-highlight/20 rounded-full flex items-center justify-center mb-4 text-highlight">
                                <Zap />
                            </div>
                            <h3 className="text-white font-semibold mb-1">Fast Delivery</h3>
                            <p className="text-textMuted text-sm">Express options available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">Trending Now</h2>
                            <p className="text-textMuted">Discover our most popular products this week</p>
                        </div>
                        <Link to="/products" className="text-accent hover:text-highlight transition-colors flex items-center font-medium">
                            View All <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-white/10 aspect-square rounded-2xl mb-4"></div>
                                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-error text-center py-10 bg-error/10 rounded-2xl border border-error/20">
                            Failed to load products. Please try again later.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {data?.data?.slice(0, 8).map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-highlight/20"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Join the Shopflow Community</h2>
                    <p className="text-lg text-textMuted mb-8">Subscribe to our newsletter and get 15% off your first purchase, plus exclusive access to new arrivals and sales.</p>
                    <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                            required
                        />
                        <button type="submit" className="bg-accent hover:bg-accent/90 text-white font-medium px-8 py-3 rounded-full transition-colors whitespace-nowrap">
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
