import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlist.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.route('/')
    .get(getWishlist);

router.post('/add', addToWishlist);
router.delete('/remove/:productId', removeFromWishlist);

export default router;
