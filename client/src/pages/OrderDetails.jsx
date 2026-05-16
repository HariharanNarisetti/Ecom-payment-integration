import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetOrderDetailsQuery } from '../features/api/ordersApiSlice';
import { CheckCircle2, Clock, Package, Truck, ArrowLeft } from 'lucide-react';

const OrderDetails = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useGetOrderDetailsQuery(id);

    const order = data?.data;

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <div className="bg-error/10 border border-error/20 rounded-2xl p-8 max-w-md mx-auto">
                    <h2 className="text-xl text-error font-semibold mb-2">Order Not Found</h2>
                    <p className="text-textMuted mb-6">We couldn't find the order you're looking for.</p>
                    <Link to="/profile" className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg transition-colors">
                        Go to My Orders
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link to="/profile" className="inline-flex items-center text-textMuted hover:text-white transition-colors mb-8">
                <ArrowLeft size={16} className="mr-2" /> Back to Profile
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">Order Details</h1>
                    <p className="text-textMuted">Order #{order.orderNumber} • Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3">
                    <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center">
                        <span className="block text-xs text-textMuted mb-1">Status</span>
                        <span className="font-medium text-white capitalize">{order.status}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center">
                        <span className="block text-xs text-textMuted mb-1">Payment</span>
                        <span className={`font-medium capitalize ${order.paymentStatus === 'paid' ? 'text-success' : 'text-error'}`}>
                            {order.paymentStatus}
                        </span>
                    </div>
                </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 overflow-x-auto">
                <div className="min-w-[600px]">
                    <div className="flex justify-between items-center relative">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 z-0"></div>
                        <div className={`absolute top-1/2 left-0 h-1 bg-accent -translate-y-1/2 z-0 transition-all duration-500`} style={{ width: order.status === 'delivered' ? '100%' : order.status === 'shipped' ? '66%' : order.status === 'processing' ? '33%' : '0%' }}></div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${order.status !== 'cancelled' ? 'bg-accent text-white shadow-[0_0_15px_rgba(123,47,255,0.4)]' : 'bg-white/10 text-textMuted'}`}>
                                <CheckCircle2 size={20} />
                            </div>
                            <span className="text-sm font-medium text-white">Order Placed</span>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-accent text-white shadow-[0_0_15px_rgba(123,47,255,0.4)]' : 'bg-white/10 text-textMuted'}`}>
                                <Package size={20} />
                            </div>
                            <span className="text-sm font-medium text-white">Processing</span>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${['shipped', 'delivered'].includes(order.status) ? 'bg-accent text-white shadow-[0_0_15px_rgba(123,47,255,0.4)]' : 'bg-white/10 text-textMuted'}`}>
                                <Truck size={20} />
                            </div>
                            <span className="text-sm font-medium text-white">Shipped</span>
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${order.status === 'delivered' ? 'bg-accent text-white shadow-[0_0_15px_rgba(123,47,255,0.4)]' : 'bg-white/10 text-textMuted'}`}>
                                <CheckCircle2 size={20} />
                            </div>
                            <span className="text-sm font-medium text-white">Delivered</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Items List */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Order Items</h2>
                        <div className="space-y-4">
                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 border-b border-white/10 last:border-0 pb-4 last:pb-0">
                                    <Link to={`/product/${item.product}`} className="w-20 h-20 bg-white/10 rounded-lg overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </Link>
                                    <div className="flex-1">
                                        <Link to={`/product/${item.product}`} className="text-white font-medium hover:text-highlight transition-colors mb-1 block">
                                            {item.name}
                                        </Link>
                                        <div className="text-sm text-textMuted flex gap-3">
                                            {item.size && <span>Size: {item.size}</span>}
                                            {item.color && (
                                                <span className="flex items-center gap-1">
                                                    Color: <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: item.color.toLowerCase() }}></span>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
                                        <div className="text-sm text-textMuted">Qty: {item.quantity} x ₹{item.price.toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Order Summary */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Summary</h2>
                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-textMuted text-sm">
                                <span>Subtotal</span>
                                <span className="text-white">₹{order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-textMuted text-sm">
                                <span>Shipping</span>
                                <span className="text-white">₹{order.shippingCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-textMuted text-sm">
                                <span>Tax</span>
                                <span className="text-white">₹{order.tax.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-white/10 pt-4">
                            <span className="text-lg font-bold text-white">Total</span>
                            <span className="text-2xl font-bold text-highlight">₹{order.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h2 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Shipping Information</h2>
                        <div className="space-y-1 text-sm text-textMuted">
                            <p className="font-medium text-white mb-2">{order.shippingAddress.fullName}</p>
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                            <p>{order.shippingAddress.country}</p>
                            <p className="mt-2 pt-2 border-t border-white/10">Phone: {order.shippingAddress.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
