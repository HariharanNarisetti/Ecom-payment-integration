import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderNumber: { type: String, required: true, unique: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        size: { type: String },
        color: { type: String }
    }],
    shippingAddress: {
        fullName: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
        phone: { type: String, required: true }
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    paymentId: { type: String }, // Stripe or PayPal ID
    orderStatus: { type: String, enum: ['pending', 'processing', 'shipped', 'out for delivery', 'delivered', 'cancelled'], default: 'pending' },
    shippingMethod: { type: String, required: true },
    shippingCost: { type: Number, required: true, default: 0.0 },
    subtotal: { type: Number, required: true, default: 0.0 },
    tax: { type: Number, required: true, default: 0.0 },
    discount: { type: Number, required: true, default: 0.0 },
    totalAmount: { type: Number, required: true, default: 0.0 },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' },
    trackingNumber: { type: String },
    deliveredAt: { type: Date }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
