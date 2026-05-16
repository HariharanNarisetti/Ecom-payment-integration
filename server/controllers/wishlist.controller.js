import User from '../models/user.model.js';
import Product from '../models/product.model.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist', 'name price images slug discountedPrice stock');
        res.json({ success: true, data: user.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Add product to wishlist
// @route   POST /api/wishlist/add
// @access  Private
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        
        const user = await User.findById(req.user._id);
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ success: false, message: 'Product already in wishlist' });
        }

        user.wishlist.push(productId);
        await user.save();

        const updatedUser = await User.findById(req.user._id).populate('wishlist', 'name price images slug discountedPrice stock');
        res.status(200).json({ success: true, message: 'Added to wishlist', data: updatedUser.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/wishlist/remove/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
        await user.save();

        const updatedUser = await User.findById(req.user._id).populate('wishlist', 'name price images slug discountedPrice stock');
        res.status(200).json({ success: true, message: 'Removed from wishlist', data: updatedUser.wishlist });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
