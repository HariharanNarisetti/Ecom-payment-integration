import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { CheckCircle2, CreditCard, Truck, ChevronRight } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useGetCartQuery } from '../features/api/cartApiSlice';
import { useCreateOrderMutation, useCreatePaymentIntentMutation } from '../features/api/ordersApiSlice';

// Stripe Promise
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_dummy');

const shippingSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(4, 'ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().min(10, 'Valid phone number is required')
});

const CheckoutForm = ({ clientSecret, orderData, onOrderCreated }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [createOrder] = useCreateOrderMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: orderData.shippingAddress.fullName,
                        phone: orderData.shippingAddress.phone
                    }
                }
            });

            if (error) {
                toast.error(error.message);
                setIsProcessing(false);
            } else if (paymentIntent.status === 'succeeded') {
                // Payment successful, create order
                const res = await createOrder({
                    ...orderData,
                    paymentId: paymentIntent.id
                }).unwrap();
                
                toast.success('Payment successful! Order placed.');
                onOrderCreated(res.data._id);
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Payment failed');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#fff',
                            '::placeholder': { color: '#888' },
                            iconColor: '#7B2FFF'
                        },
                        invalid: { color: '#FF3D57' }
                    }
                }} />
            </div>
            <button 
                type="submit" 
                disabled={!stripe || isProcessing}
                className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(123,47,255,0.4)] disabled:opacity-50"
            >
                {isProcessing ? 'Processing...' : `Pay ₹${orderData.totalPrice.toFixed(2)}`}
            </button>
        </form>
    );
};

const Checkout = () => {
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const { data: cartData, isLoading: isCartLoading } = useGetCartQuery();
    const [createPaymentIntent] = useCreatePaymentIntentMutation();
    const [createOrder] = useCreateOrderMutation();

    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment Method, 3: Review & Pay
    const [shippingAddress, setShippingAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [clientSecret, setClientSecret] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(shippingSchema)
    });

    const cartItems = cartData?.data?.items || [];
    const itemsPrice = cartData?.data?.totalPrice || 0;
    const shippingPrice = itemsPrice > 50 ? 0 : 9.99;
    const taxPrice = itemsPrice * 0.08;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    useEffect(() => {
        if (!userInfo) navigate('/login?redirect=/checkout');
        if (cartItems.length === 0 && !isCartLoading) navigate('/cart');
    }, [userInfo, cartItems, navigate, isCartLoading]);

    const onShippingSubmit = (data) => {
        setShippingAddress(data);
        setStep(2);
    };

    const handlePaymentMethodSelect = async (e) => {
        e.preventDefault();
        
        if (paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') {
            try {
                const res = await createPaymentIntent({
                    itemsPrice, taxPrice, shippingPrice
                }).unwrap();
                setClientSecret(res.data.clientSecret);
                setStep(3);
            } catch (err) {
                toast.error('Stripe configuration missing. Defaulting to simulated test mode.');
                setClientSecret(''); // Will trigger simulated flow in Step 3
                setStep(3);
            }
        } else {
            // Other local methods
            setStep(3);
        }
    };

    const handleSimulatedOrder = async () => {
        try {
            const res = await createOrder({
                orderItems: cartItems.map(item => ({
                    product: item.product._id,
                    name: item.product.name,
                    image: item.product.images[0],
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            }).unwrap();
            toast.success(`Payment via ${paymentMethod} simulated successfully!`);
            navigate(`/order/${res.data._id}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Order failed');
        }
    };

    const handlePayPalOrder = async () => {
        try {
            const res = await createOrder({
                orderItems: cartItems.map(item => ({
                    product: item.product._id,
                    name: item.product.name,
                    image: item.product.images[0],
                    price: item.price,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color
                })),
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            }).unwrap();
            navigate(`/order/${res.data._id}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error || 'Order failed');
        }
    };

    if (isCartLoading) return <div className="p-20 text-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Steps Indicator */}
            <div className="flex items-center justify-center mb-12">
                <div className="flex items-center space-x-4 text-sm font-medium">
                    <div className={`flex items-center ${step >= 1 ? 'text-highlight' : 'text-textMuted'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 1 ? 'bg-highlight/20 border border-highlight' : 'bg-white/5 border border-white/10'}`}>1</div>
                        Shipping
                    </div>
                    <ChevronRight size={16} className="text-textMuted" />
                    <div className={`flex items-center ${step >= 2 ? 'text-highlight' : 'text-textMuted'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 2 ? 'bg-highlight/20 border border-highlight' : 'bg-white/5 border border-white/10'}`}>2</div>
                        Payment
                    </div>
                    <ChevronRight size={16} className="text-textMuted" />
                    <div className={`flex items-center ${step >= 3 ? 'text-highlight' : 'text-textMuted'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 3 ? 'bg-highlight/20 border border-highlight' : 'bg-white/5 border border-white/10'}`}>3</div>
                        Review & Pay
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                    {/* Step 1: Shipping Address */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-white mb-6">Shipping Address</h2>
                            <form onSubmit={handleSubmit(onShippingSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-textMuted text-sm mb-2">Full Name</label>
                                        <input type="text" {...register('fullName')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent outline-none" />
                                        {errors.fullName && <span className="text-error text-xs mt-1">{errors.fullName.message}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-textMuted text-sm mb-2">Phone</label>
                                        <input type="text" {...register('phone')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent outline-none" />
                                        {errors.phone && <span className="text-error text-xs mt-1">{errors.phone.message}</span>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-textMuted text-sm mb-2">Street Address</label>
                                        <input type="text" {...register('street')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent outline-none" />
                                        {errors.street && <span className="text-error text-xs mt-1">{errors.street.message}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-textMuted text-sm mb-2">City</label>
                                        <input type="text" {...register('city')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent outline-none" />
                                        {errors.city && <span className="text-error text-xs mt-1">{errors.city.message}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-textMuted text-sm mb-2">State / Province</label>
                                        <input type="text" {...register('state')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent outline-none" />
                                        {errors.state && <span className="text-error text-xs mt-1">{errors.state.message}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-textMuted text-sm mb-2">ZIP / Postal Code</label>
                                        <input type="text" {...register('zipCode')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent outline-none" />
                                        {errors.zipCode && <span className="text-error text-xs mt-1">{errors.zipCode.message}</span>}
                                    </div>
                                    <div>
                                        <label className="block text-textMuted text-sm mb-2">Country</label>
                                        <input type="text" {...register('country')} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-accent outline-none" />
                                        {errors.country && <span className="text-error text-xs mt-1">{errors.country.message}</span>}
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button type="submit" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                                        Continue to Payment
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 2: Payment Method */}
                    {step === 2 && (
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-white mb-6">Payment Method</h2>
                            <form onSubmit={handlePaymentMethodSelect}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {[
                                        { id: 'Credit Card', name: 'Credit Card', icon: '💳' },
                                        { id: 'Debit Card', name: 'Debit Card', icon: '🏧' },
                                        { id: 'PhonePe', name: 'PhonePe', icon: '📱' },
                                        { id: 'Google Pay', name: 'Google Pay', icon: 'G' },
                                        { id: 'Paytm', name: 'Paytm', icon: 'P' },
                                        { id: 'Super Money', name: 'Super Money', icon: '⚡' },
                                        { id: 'PayPal', name: 'PayPal', icon: '🅿️' }
                                    ].map(method => (
                                        <label key={method.id} className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === method.id ? 'bg-accent/10 border-accent shadow-[0_0_10px_rgba(123,47,255,0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                            <input type="radio" name="paymentMethod" value={method.id} checked={paymentMethod === method.id} onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                                            <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${paymentMethod === method.id ? 'border-accent' : 'border-textMuted'}`}>
                                                {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>}
                                            </div>
                                            <span className="text-xl mr-3">{method.icon}</span>
                                            <span className="text-white font-medium">{method.name}</span>
                                        </label>
                                    ))}
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" onClick={() => setStep(1)} className="text-textMuted hover:text-white px-6 py-3 transition-colors">
                                        Back
                                    </button>
                                    <button type="submit" className="bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                                        Continue to Review
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Step 3: Review & Pay */}
                    {step === 3 && (
                        <div>
                            <h2 className="text-2xl font-heading font-bold text-white mb-6">Review & Pay</h2>
                            
                            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Shipping To</h3>
                                        <p className="text-textMuted text-sm">
                                            {shippingAddress.fullName}<br />
                                            {shippingAddress.street}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                                            {shippingAddress.country}<br />
                                            {shippingAddress.phone}
                                        </p>
                                    </div>
                                    <button onClick={() => setStep(1)} className="text-accent text-sm hover:underline">Edit</button>
                                </div>
                                <div className="border-t border-white/10 pt-4 mt-4 flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-medium mb-1">Payment Method</h3>
                                        <p className="text-textMuted text-sm">{paymentMethod}</p>
                                    </div>
                                    <button onClick={() => setStep(2)} className="text-accent text-sm hover:underline">Edit</button>
                                </div>
                            </div>

                            {clientSecret ? (
                                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
                                    <CheckoutForm 
                                        clientSecret={clientSecret} 
                                        orderData={{
                                            orderItems: cartItems.map(item => ({
                                                product: item.product._id,
                                                name: item.product.name,
                                                image: item.product.images[0],
                                                price: item.price,
                                                quantity: item.quantity,
                                                size: item.size,
                                                color: item.color
                                            })),
                                            shippingAddress,
                                            paymentMethod,
                                            itemsPrice,
                                            taxPrice,
                                            shippingPrice,
                                            totalPrice
                                        }}
                                        onOrderCreated={(id) => navigate(`/order/${id}`)}
                                    />
                                </Elements>
                            ) : (
                                <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center space-y-6">
                                    <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto text-2xl">
                                        🛡️
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">Pay securely with {paymentMethod}</h3>
                                        <p className="text-textMuted mb-6">Complete your simulated payment below.</p>
                                    </div>
                                    <button onClick={handleSimulatedOrder} className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(123,47,255,0.4)] flex justify-center items-center">
                                        Simulate Payment of ₹{totalPrice.toFixed(2)}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="w-full lg:w-96 shrink-0">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                        <h2 className="text-xl font-heading font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map(item => (
                                <div key={item._id} className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-white/10 rounded-md overflow-hidden shrink-0">
                                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-white text-sm font-medium line-clamp-1">{item.product.name}</h4>
                                        <p className="text-textMuted text-xs">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-white font-medium text-sm">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/10 mb-6">
                            <div className="flex justify-between text-textMuted text-sm">
                                <span>Subtotal</span>
                                <span className="text-white">₹{itemsPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-textMuted text-sm">
                                <span>Shipping</span>
                                <span className="text-white">₹{shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-textMuted text-sm">
                                <span>Tax</span>
                                <span className="text-white">₹{taxPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center border-t border-white/10 pt-4">
                            <span className="text-lg font-bold text-white">Total</span>
                            <span className="text-2xl font-bold text-highlight">₹{totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
