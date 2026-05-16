import { Link } from 'react-router-dom';
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from '../features/api/wishlistApiSlice';
import { useAddToCartMutation } from '../features/api/cartApiSlice';
import { Trash2, ShoppingCart, HeartOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
    const { data: wishlistData, isLoading, error } = useGetWishlistQuery();
    const [removeFromWishlist, { isLoading: isRemoving }] = useRemoveFromWishlistMutation();
    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

    const wishlistItems = wishlistData?.data || [];

    const handleRemove = async (productId) => {
        try {
            await removeFromWishlist(productId).unwrap();
            toast.success('Removed from wishlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Failed to remove from wishlist');
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            await addToCart({ productId, quantity: 1 }).unwrap();
            toast.success('Added to cart');
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Failed to add to cart');
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-white/10 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-64 bg-white/10 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <div className="bg-error/10 border border-error/20 rounded-2xl p-8 max-w-md mx-auto text-error">
                    Failed to load wishlist. Please try again later.
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">My Wishlist</h1>
                    <p className="text-textMuted">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
                </div>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 max-w-2xl mx-auto">
                    <HeartOff size={48} className="mx-auto text-textMuted mb-4" />
                    <h2 className="text-2xl font-heading font-bold text-white mb-2">Your wishlist is empty</h2>
                    <p className="text-textMuted mb-6">Explore our products and find something you love!</p>
                    <Link to="/products" className="inline-block bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-full font-medium transition-colors">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                        <div key={item._id} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(123,47,255,0.3)] transition-all duration-300">
                            <Link to={`/product/${item._id}`} className="block relative aspect-square overflow-hidden bg-white/10">
                                <img 
                                    src={item.images?.[0] || 'https://placehold.co/400x400/1E2538/FFFFFF?text=No+Image'} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/400x400/1E2538/FFFFFF?text=No+Image';
                                    }}
                                />
                                {item.discountedPrice && (
                                    <div className="absolute top-4 left-4 bg-error text-white text-xs font-bold px-3 py-1 rounded-full">
                                        SALE
                                    </div>
                                )}
                            </Link>
                            <div className="p-5">
                                <Link to={`/product/${item._id}`}>
                                    <h3 className="text-lg font-heading font-semibold text-white mb-2 hover:text-accent transition-colors truncate">{item.name}</h3>
                                </Link>
                                
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex flex-col">
                                        {item.discountedPrice ? (
                                            <>
                                                <span className="text-white font-bold text-lg">₹{item.discountedPrice.toFixed(2)}</span>
                                                <span className="text-textMuted text-sm line-through">₹{item.price.toFixed(2)}</span>
                                            </>
                                        ) : (
                                            <span className="text-white font-bold text-lg">₹{item.price.toFixed(2)}</span>
                                        )}
                                    </div>
                                    <span className={`text-sm ${item.stock > 0 ? 'text-success' : 'text-error'}`}>
                                        {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                                
                                <div className="flex space-x-2">
                                    <button 
                                        onClick={() => handleAddToCart(item._id)}
                                        disabled={isAddingToCart || item.stock === 0}
                                        className="flex-1 bg-accent hover:bg-accent/90 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ShoppingCart size={18} className="mr-2" />
                                        Add to Cart
                                    </button>
                                    <button 
                                        onClick={() => handleRemove(item._id)}
                                        disabled={isRemoving}
                                        className="w-12 h-10 bg-error/10 hover:bg-error/20 text-error rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                                        title="Remove from wishlist"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
