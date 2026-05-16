import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCartQuery, useUpdateCartItemMutation, useRemoveCartItemMutation } from '../features/api/cartApiSlice';
import { toast } from 'react-hot-toast';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    
    const { data, isLoading, error } = useGetCartQuery(undefined, { skip: !userInfo });
    const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
    const [removeCartItem, { isLoading: isRemoving }] = useRemoveCartItemMutation();

    const cartItems = data?.data?.items || [];
    const subtotal = data?.data?.totalPrice || 0;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            await updateCartItem({ itemId, quantity: newQuantity }).unwrap();
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Failed to update quantity');
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await removeCartItem(itemId).unwrap();
            toast.success('Item removed from cart');
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Failed to remove item');
        }
    };

    const checkoutHandler = () => {
        navigate('/checkout');
    };

    if (!userInfo) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 max-w-lg mx-auto">
                    <ShoppingBag size={64} className="mx-auto text-textMuted mb-6" />
                    <h2 className="text-2xl font-heading font-bold text-white mb-4">Your cart is empty</h2>
                    <p className="text-textMuted mb-8">Please login to view your cart and start shopping.</p>
                    <Link to="/login?redirect=/cart" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-medium transition-colors inline-block">
                        Login Now
                    </Link>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-heading font-bold text-white mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center max-w-3xl mx-auto">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag size={48} className="text-textMuted" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                    <p className="text-textMuted mb-8">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/products" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-full font-medium transition-colors inline-block shadow-[0_0_15px_rgba(123,47,255,0.4)]">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="flex-1 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 relative pr-12 sm:pr-4">
                                <Link to={`/product/${item.product._id}`} className="w-24 h-24 bg-white/10 rounded-lg overflow-hidden shrink-0">
                                    <img 
                                        src={item.product.images[0] || 'https://placehold.co/200x200/1E2538/FFFFFF?text=No+Image'} 
                                        alt={item.product.name} 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/200x200/1E2538/FFFFFF?text=No+Image';
                                        }}
                                    />
                                </Link>
                                
                                <div className="flex-1 text-center sm:text-left">
                                    <Link to={`/product/${item.product._id}`} className="text-white font-medium hover:text-highlight transition-colors mb-1 block">
                                        {item.product.name}
                                    </Link>
                                    <div className="text-sm text-textMuted flex items-center justify-center sm:justify-start gap-2 mb-2">
                                        {item.size && <span>Size: {item.size}</span>}
                                        {item.color && (
                                            <span className="flex items-center gap-1">
                                                Color: <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: item.color.toLowerCase() }}></span>
                                            </span>
                                        )}
                                    </div>
                                    <div className="font-bold text-white">₹{item.price.toFixed(2)}</div>
                                </div>

                                <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-lg p-1 mt-2 sm:mt-0">
                                    <button 
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                        disabled={isUpdating || item.quantity <= 1}
                                        className="w-8 h-8 flex items-center justify-center text-textMuted hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-50"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center text-white text-sm font-medium">{item.quantity}</span>
                                    <button 
                                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                        disabled={isUpdating}
                                        className="w-8 h-8 flex items-center justify-center text-textMuted hover:text-white hover:bg-white/10 rounded transition-colors disabled:opacity-50"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <div className="hidden sm:block text-right min-w-[80px]">
                                    <div className="font-bold text-highlight">₹{(item.price * item.quantity).toFixed(2)}</div>
                                </div>

                                <button 
                                    onClick={() => handleRemoveItem(item._id)}
                                    disabled={isRemoving}
                                    className="absolute top-4 right-4 sm:static w-8 h-8 flex items-center justify-center text-textMuted hover:text-error hover:bg-error/10 rounded-lg transition-all disabled:opacity-50"
                                    title="Remove Item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-96 shrink-0">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                            <h2 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-textMuted">
                                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                    <span className="text-white">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-textMuted">
                                    <span>Shipping</span>
                                    <span className={shipping === 0 ? "text-success" : "text-white"}>
                                        {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-textMuted">
                                    <span>Estimated Tax</span>
                                    <span className="text-white">₹{tax.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Coupon Code */}
                            <div className="mb-6 border-y border-white/10 py-4">
                                <label className="block text-sm text-textMuted mb-2">Promo Code</label>
                                <div className="flex space-x-2">
                                    <input 
                                        type="text" 
                                        placeholder="Enter code" 
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <span className="text-lg font-bold text-white">Grand Total</span>
                                <span className="text-2xl font-bold text-highlight">₹{total.toFixed(2)}</span>
                            </div>

                            <button 
                                onClick={checkoutHandler}
                                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(123,47,255,0.4)] text-base font-medium text-white bg-accent hover:bg-accent/90 transition-all"
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>

                            <div className="mt-4 text-center">
                                <Link to="/products" className="text-sm text-textMuted hover:text-white transition-colors">
                                    or Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
