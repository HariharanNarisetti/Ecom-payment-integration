import express from 'express';
import { createOrder, getOrderById, getMyOrders, getOrders, updateOrderToDelivered, updateOrderStatus, updatePaymentStatus } from '../controllers/order.controller.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .post(createOrder)
    .get(admin, getOrders);

router.route('/myorders').get(getMyOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/deliver').put(admin, updateOrderToDelivered);
router.route('/:id/status').put(admin, updateOrderStatus);
router.route('/:id/payment').put(admin, updatePaymentStatus);

export default router;
