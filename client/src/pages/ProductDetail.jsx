import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProductDetailsQuery } from '../features/api/productsApiSlice';
import { useAddToCartMutation } from '../features/api/cartApiSlice';
import { useAddToWishlistMutation } from '../features/api/wishlistApiSlice';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Heart, Star, ChevronRight, Share2, Minus, Plus, Check } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [activeTab, setActiveTab] = useState('description');

    const { userInfo } = useSelector((state) => state.auth);
    const { data, isLoading, error } = useGetProductDetailsQuery(id);
    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
    const [addToWishlist, { isLoading: isAddingToWishlist }] = useAddToWishlistMutation();

    const product = data?.data;

    const handleAddToCart = async () => {
        if (!userInfo) {
            navigate('/login');
            return;
        }
        if (product.sizes?.length > 0 && !selectedSize) {
            toast.error('Please select a size');
            return;
        }
        if (product.colors?.length > 0 && !selectedColor) {
            toast.error('Please select a color');
            return;
        }

        try {
            await addToCart({ 
                productId: product._id, 
                quantity: qty,
                size: selectedSize,
                color: selectedColor
            }).unwrap();
            toast.success('Added to cart');
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Failed to add to cart');
        }
    };

    const handleAddToWishlist = async () => {
        if (!userInfo) {
            navigate('/login');
            return;
        }
        try {
            await addToWishlist({ productId: product._id }).unwrap();
            toast.success('Added to wishlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Failed to add to wishlist');
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <div className="bg-error/10 border border-error/20 rounded-2xl p-8 max-w-md mx-auto">
                    <h2 className="text-xl text-error font-semibold mb-2">Product Not Found</h2>
                    <p className="text-textMuted mb-6">The product you're looking for doesn't exist or an error occurred.</p>
                    <Link to="/products" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors">
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-textMuted mb-8">
                <Link to="/" className="hover:text-highlight transition-colors">Home</Link>
                <ChevronRight size={16} className="mx-2" />
                <Link to="/products" className="hover:text-highlight transition-colors">Products</Link>
                <ChevronRight size={16} className="mx-2" />
                {product.category && (
                    <>
                        <Link to={`/products?category=${product.category._id}`} className="hover:text-highlight transition-colors">
                            {product.category.name}
                        </Link>
                        <ChevronRight size={16} className="mx-2" />
                    </>
                )}
                <span className="text-white truncate">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 group">
                        <img 
                            src={product.images[selectedImage] || 'https://placehold.co/600x600/1E2538/FFFFFF?text=No+Image'} 
                            alt={product.name} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/600x600/1E2538/FFFFFF?text=No+Image';
                            }}
                        />
                        {product.discountedPrice && (
                            <div className="absolute top-4 left-4 bg-error text-white font-bold px-4 py-1.5 rounded-full">
                                SALE
                            </div>
                        )}
                    </div>
                    {product.images.length > 1 && (
                        <div className="grid grid-cols-4 gap-4">
                            {product.images.map((img, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                        selectedImage === idx ? 'border-accent shadow-[0_0_15px_rgba(123,47,255,0.4)]' : 'border-transparent hover:border-white/30'
                                    }`}
                                >
                                    <img 
                                        src={img || 'https://placehold.co/200x200/1E2538/FFFFFF?text=No+Image'} 
                                        alt={`${product.name} ${idx + 1}`} 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/200x200/1E2538/FFFFFF?text=No+Image';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <div className="mb-6">
                        <p className="text-accent font-medium mb-2 tracking-wide uppercase text-sm">{product.brand}</p>
                        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight">{product.name}</h1>
                        
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center text-highlight">
                                <Star size={18} fill="currentColor" />
                                <span className="ml-1 font-medium">{product.ratings?.average || 0}</span>
                            </div>
                            <span className="text-textMuted">•</span>
                            <button onClick={() => setActiveTab('reviews')} className="text-textMuted hover:text-white transition-colors underline decoration-white/30 hover:decoration-white">
                                {product.ratings?.count || 0} Reviews
                            </button>
                            <span className="text-textMuted">•</span>
                            <span className="text-textMuted text-sm">SKU: {product.sku}</span>
                        </div>

                        <div className="flex items-baseline space-x-3 mb-6">
                            {product.discountedPrice ? (
                                <>
                                    <span className="text-3xl font-bold text-white">₹{product.discountedPrice.toFixed(2)}</span>
                                    <span className="text-xl text-textMuted line-through">₹{product.price.toFixed(2)}</span>
                                </>
                            ) : (
                                <span className="text-3xl font-bold text-white">₹{product.price.toFixed(2)}</span>
                            )}
                        </div>

                        <p className="text-textMuted leading-relaxed mb-8 border-b border-white/10 pb-8">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-6 mb-8">
                        {/* Size Selector */}
                        {product.sizes?.length > 0 && (
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-white font-medium">Size</h3>
                                    <button className="text-sm text-accent hover:underline">Size Guide</button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[3rem] h-12 px-4 rounded-lg border font-medium transition-all ${
                                                selectedSize === size 
                                                    ? 'border-accent bg-accent text-white shadow-[0_0_15px_rgba(123,47,255,0.4)]' 
                                                    : 'border-white/20 bg-white/5 text-textMuted hover:border-white/50 hover:text-white'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selector */}
                        {product.colors?.length > 0 && (
                            <div>
                                <h3 className="text-white font-medium mb-3">Color</h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                                                selectedColor === color ? 'border-highlight scale-110' : 'border-transparent hover:border-white/30 hover:scale-105'
                                            }`}
                                            style={{ backgroundColor: color.toLowerCase() }}
                                            title={color}
                                        >
                                            {selectedColor === color && <Check size={16} className={['white', 'lightgray', '#ffffff'].includes(color.toLowerCase()) ? 'text-black' : 'text-white'} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div>
                            <h3 className="text-white font-medium mb-3">Quantity</h3>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-white/20 rounded-lg bg-white/5 p-1">
                                    <button 
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="w-8 h-8 flex items-center justify-center text-textMuted hover:text-white hover:bg-white/10 rounded transition-colors"
                                        disabled={qty <= 1}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center text-white font-medium">{qty}</span>
                                    <button 
                                        onClick={() => setQty(Math.min(product.stock, qty + 1))}
                                        className="w-8 h-8 flex items-center justify-center text-textMuted hover:text-white hover:bg-white/10 rounded transition-colors"
                                        disabled={qty >= product.stock}
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <span className={`text-sm ${product.stock > 0 ? 'text-success' : 'text-error'}`}>
                                    {product.stock > 0 ? `${product.stock} items available` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <button 
                            onClick={handleAddToCart}
                            disabled={product.stock === 0 || isAddingToCart}
                            className="flex-1 flex items-center justify-center space-x-2 bg-accent hover:bg-accent/90 text-white py-4 px-8 rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(123,47,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart size={20} />
                            <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
                        </button>
                        <button 
                            onClick={async () => {
                                await handleAddToCart();
                                navigate('/cart');
                            }}
                            disabled={product.stock === 0 || isAddingToCart}
                            className="flex-1 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white py-4 px-8 border border-white/10 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Buy Now
                        </button>
                        <button 
                            onClick={handleAddToWishlist}
                            disabled={isAddingToWishlist}
                            className="w-14 flex items-center justify-center border border-white/20 bg-white/5 hover:bg-white/10 text-textMuted hover:text-highlight rounded-xl transition-colors shrink-0"
                            title="Add to Wishlist"
                        >
                            <Heart size={20} />
                        </button>
                    </div>

                    {/* Shipping info small */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
                        <div className="flex items-center text-sm">
                            <span className="text-highlight mr-3">🚚</span>
                            <span className="text-textMuted">Free shipping on orders over ₹50</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="text-highlight mr-3">🔄</span>
                            <span className="text-textMuted">30 days return policy</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="text-highlight mr-3">🛡️</span>
                            <span className="text-textMuted">1 Year Warranty</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-white/10 pt-12">
                <div className="flex space-x-8 mb-8 border-b border-white/10">
                    {['description', 'specifications', 'reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-lg font-heading font-medium transition-all relative ${
                                activeTab === tab ? 'text-white' : 'text-textMuted hover:text-white'
                            }`}
                        >
                            <span className="capitalize">{tab}</span>
                            {activeTab === tab && (
                                <span className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-highlight shadow-[0_0_10px_rgba(0,245,255,0.8)]"></span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="min-h-[300px]">
                    {activeTab === 'description' && (
                        <div className="text-textMuted leading-relaxed max-w-4xl">
                            <h3 className="text-white text-xl font-semibold mb-4">Product Overview</h3>
                            <p className="mb-4">{product.description}</p>
                        </div>
                    )}
                    
                    {activeTab === 'specifications' && (
                        <div className="max-w-4xl">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <th className="py-4 text-white font-medium w-1/3">Brand</th>
                                        <td className="py-4 text-textMuted">{product.brand}</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <th className="py-4 text-white font-medium w-1/3">SKU</th>
                                        <td className="py-4 text-textMuted">{product.sku}</td>
                                    </tr>
                                    {product.category && (
                                        <tr className="border-b border-white/10">
                                            <th className="py-4 text-white font-medium w-1/3">Category</th>
                                            <td className="py-4 text-textMuted">{product.category.name}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className="max-w-4xl">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-white text-xl font-semibold mb-2">Customer Reviews</h3>
                                    <div className="flex items-center">
                                        <div className="flex text-highlight mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={18} fill={i < (product.ratings?.average || 0) ? 'currentColor' : 'none'} className={i < (product.ratings?.average || 0) ? '' : 'text-gray-600'} />
                                            ))}
                                        </div>
                                        <span className="text-textMuted text-sm">Based on {product.reviews?.length || 0} reviews</span>
                                    </div>
                                </div>
                                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors border border-white/10 text-sm font-medium">
                                    Write a Review
                                </button>
                            </div>

                            {product.reviews?.length === 0 ? (
                                <div className="text-center py-12 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-textMuted">No reviews yet. Be the first to review this product!</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {product.reviews?.map((review) => (
                                        <div key={review._id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                                                        {review.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white font-medium">{review.name}</h4>
                                                        <span className="text-textMuted text-xs">{review.createdAt?.substring(0, 10)}</span>
                                                    </div>
                                                </div>
                                                <div className="flex text-highlight">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? '' : 'text-gray-600'} />
                                                    ))}
                                                </div>
                                            </div>
                                            <h5 className="text-white font-medium mb-2">{review.title}</h5>
                                            <p className="text-textMuted text-sm leading-relaxed">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
