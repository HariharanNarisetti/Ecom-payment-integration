import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useAddToCartMutation } from '../../features/api/cartApiSlice';
import { useAddToWishlistMutation } from '../../features/api/wishlistApiSlice';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);
    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();
    const [addToWishlist, { isLoading: isAddingToWishlist }] = useAddToWishlistMutation();

    const handleAddToCart = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!userInfo) {
            toast.error('Please login to add items to cart');
            return;
        }
        try {
            await addToCart({ productId: product._id, quantity: 1 }).unwrap();
            toast.success('Added to cart');
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Failed to add to cart');
        }
    };

    const handleAddToWishlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!userInfo) {
            toast.error('Please login to add to wishlist');
            return;
        }
        try {
            await addToWishlist({ productId: product._id }).unwrap();
            toast.success('Added to wishlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Failed to add to wishlist');
        }
    };

    return (
        <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(123,47,255,0.3)] transition-all duration-300 transform hover:-translate-y-2">
            <Link to={`/product/${product._id}`} className="block h-full">
                <div className="relative aspect-square overflow-hidden bg-white/10">
                    <img 
                        src={product.images[0] || 'https://placehold.co/400x400/1E2538/FFFFFF?text=No+Image'} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://placehold.co/400x400/1E2538/FFFFFF?text=No+Image';
                        }}
                    />
                    
                    {/* Badges */}
                    {product.discountedPrice && (
                        <div className="absolute top-4 left-4 bg-error text-white text-xs font-bold px-3 py-1 rounded-full">
                            SALE
                        </div>
                    )}
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white font-bold text-lg bg-error px-4 py-2 rounded">Out of Stock</span>
                        </div>
                    )}

                    {/* Quick actions */}
                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
                        <button 
                            onClick={handleAddToWishlist}
                            disabled={isAddingToWishlist}
                            className="w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-white transition-colors z-10 relative"
                        >
                            <Heart size={20} />
                        </button>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex items-center space-x-1 text-highlight mb-2 text-sm">
                        <Star size={16} fill="currentColor" />
                        <span>{product.ratings?.average || 0}</span>
                        <span className="text-textMuted text-xs">({product.ratings?.count || 0})</span>
                    </div>
                    
                    <h3 className="text-lg font-heading font-semibold text-white mb-1 truncate">{product.name}</h3>
                    <p className="text-textMuted text-sm mb-4">{product.brand}</p>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            {product.discountedPrice ? (
                                <>
                                    <span className="text-white font-bold text-lg">₹{product.discountedPrice.toFixed(2)}</span>
                                    <span className="text-textMuted text-sm line-through">₹{product.price.toFixed(2)}</span>
                                </>
                            ) : (
                                <span className="text-white font-bold text-lg">₹{product.price.toFixed(2)}</span>
                            )}
                        </div>
                        
                        <button 
                            onClick={handleAddToCart}
                            disabled={isAddingToCart || product.stock === 0}
                            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent hover:shadow-[0_0_15px_rgba(123,47,255,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10 relative"
                        >
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;
