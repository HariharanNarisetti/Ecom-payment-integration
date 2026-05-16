import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../features/api/productsApiSlice';
import ProductCard from '../components/product/ProductCard';
import { Filter, ChevronDown, X } from 'lucide-react';

const ProductList = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('-createdAt');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        setPage(1);
    }, [keyword]);

    const { data, isLoading, error } = useGetProductsQuery({
        pageNumber: page,
        keyword,
        sort,
        minPrice,
        maxPrice
    });

    const handleApplyFilters = () => {
        setMinPrice(minPriceInput);
        setMaxPrice(maxPriceInput);
        setPage(1);
    };

    const handleClearFilters = () => {
        setMinPriceInput('');
        setMaxPriceInput('');
        setMinPrice('');
        setMaxPrice('');
        setPage(1);
    };

    const products = data?.data || [];
    const pagination = data?.pagination;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Shop All Products</h1>
                    <p className="text-textMuted">Showing {products.length} products</p>
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <select 
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="appearance-none bg-white/5 border border-white/10 text-white py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                            <option value="-createdAt" className="bg-background text-white">Newest Arrivals</option>
                            <option value="price" className="bg-background text-white">Price: Low to High</option>
                            <option value="-price" className="bg-background text-white">Price: High to Low</option>
                            <option value="-ratings.average" className="bg-background text-white">Highest Rated</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-3 text-textMuted pointer-events-none" />
                    </div>
                    
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="md:hidden flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-white"
                    >
                        <Filter size={18} className="mr-2" /> Filters
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filter (Desktop) & Drawer (Mobile) */}
                <div className={`
                    fixed inset-y-0 left-0 z-50 w-72 bg-background/95 backdrop-blur-xl border-r border-white/10 p-6 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:bg-transparent md:border-none md:p-0 md:w-64 md:z-0
                    ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="flex justify-between items-center mb-6 md:hidden">
                        <h2 className="text-xl font-heading font-bold text-white">Filters</h2>
                        <button onClick={() => setIsFilterOpen(false)} className="text-textMuted hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="space-y-8">
                        {/* Categories Filter */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Categories</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                                {[
                                    'FASHION & APPAREL', 'FOOTWEAR', 'ACCESSORIES', 'ELECTRONICS', 
                                    'HOME & FURNITURE', 'KITCHEN & APPLIANCES', 'BEAUTY & PERSONAL CARE', 
                                    'SPORTS & FITNESS', 'BOOKS, STATIONERY & OFFICE', 'TOYS & BABY PRODUCTS', 
                                    'GROCERY & FOOD', 'PET SUPPLIES', 'AUTOMOTIVE', 'HEALTH & WELLNESS'
                                ].map((category) => (
                                    <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                                        <input type="checkbox" className="form-checkbox h-4 w-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent" />
                                        <span className="text-textMuted group-hover:text-white transition-colors text-sm">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Price Range</h3>
                            <div className="flex items-center space-x-2">
                                <input 
                                    type="number" 
                                    placeholder="Min" 
                                    value={minPriceInput}
                                    onChange={(e) => setMinPriceInput(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" 
                                />
                                <span className="text-textMuted">-</span>
                                <input 
                                    type="number" 
                                    placeholder="Max" 
                                    value={maxPriceInput}
                                    onChange={(e) => setMaxPriceInput(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm" 
                                />
                            </div>
                            <button 
                                onClick={handleApplyFilters} 
                                className="mt-4 w-full py-2 bg-accent/20 hover:bg-accent/40 text-accent rounded-lg transition-colors border border-accent/20 text-sm font-medium"
                            >
                                Apply Price Filter
                            </button>
                        </div>

                        {/* Ratings Filter */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Ratings</h3>
                            <div className="space-y-2">
                                {[4, 3, 2, 1].map((rating) => (
                                    <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                                        <input type="checkbox" className="form-checkbox h-4 w-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent" />
                                        <span className="text-textMuted group-hover:text-white transition-colors">{rating} Stars & Up</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button onClick={handleClearFilters} className="w-full py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10 text-sm font-medium">
                            Clear All Filters
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-white/10 aspect-square rounded-2xl mb-4"></div>
                                    <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-white/10 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-error text-center py-20 bg-error/10 rounded-2xl border border-error/20">
                            Failed to load products. Please try again later.
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-textMuted text-lg">No products found matching your criteria.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination && pagination.totalPages > 1 && (
                                <div className="flex justify-center mt-12 space-x-2">
                                    {[...Array(pagination.totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i + 1)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                                                page === i + 1 
                                                    ? 'bg-accent text-white font-medium shadow-[0_0_15px_rgba(123,47,255,0.4)]' 
                                                    : 'bg-white/5 text-textMuted hover:bg-white/10 hover:text-white border border-white/10'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            
            {/* Mobile Filter Overlay */}
            {isFilterOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsFilterOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default ProductList;
