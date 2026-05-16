import Product from '../models/product.model.js';
import Category from '../models/category.model.js';

// @desc    Fetch all products with pagination, search, filter
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const pageSize = 12;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        } : {};

        const category = req.query.category ? { category: req.query.category } : {};
        
        // Price filtering
        let priceFilter = {};
        if (req.query.minPrice || req.query.maxPrice) {
            priceFilter.price = {};
            if (req.query.minPrice) priceFilter.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) priceFilter.price.$lte = Number(req.query.maxPrice);
        }

        const count = await Product.countDocuments({ ...keyword, ...category, ...priceFilter });
        const products = await Product.find({ ...keyword, ...category, ...priceFilter })
            .populate('category', 'name slug')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort(req.query.sort || '-createdAt');

        res.json({
            success: true,
            data: products,
            pagination: {
                page,
                limit: pageSize,
                total: count,
                totalPages: Math.ceil(count / pageSize)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category', 'name slug');

        if (product) {
            res.json({ success: true, data: product });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
    try {
        const { rating, comment, title } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ success: false, message: 'Product already reviewed' });
            }

            const review = {
                name: req.user.name,
                rating: Number(rating),
                title,
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.ratings.count = product.reviews.length;
            product.ratings.average = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ success: true, message: 'Review added' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        let categoryId;
        if (req.body.category) {
            // Check if it's already an ObjectId, if not, find or create
            if (String(req.body.category).match(/^[0-9a-fA-F]{24}$/)) {
                categoryId = req.body.category;
            } else {
                let existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${req.body.category}$`, 'i') } });
                if (existingCategory) {
                    categoryId = existingCategory._id;
                } else {
                    const newCategory = await Category.create({ 
                        name: req.body.category,
                        slug: req.body.category.toLowerCase().replace(/ /g, '-') + '-' + Date.now()
                    });
                    categoryId = newCategory._id;
                }
            }
        } else {
            // Provide a default fallback category if none provided
            const defaultCategory = await Category.findOne();
            categoryId = defaultCategory ? defaultCategory._id : null;
            if (!categoryId) {
                return res.status(400).json({ success: false, message: 'No categories exist. Please create one first.' });
            }
        }

        const name = req.body.name || 'Sample name';
        const product = new Product({
            name,
            slug: name.toLowerCase().replace(/ /g, '-') + '-' + Date.now(),
            sku: 'SKU-' + Date.now() + Math.floor(Math.random() * 1000),
            price: req.body.price || 0,
            user: req.user._id,
            images: req.body.images || ['https://via.placeholder.com/500'],
            brand: req.body.brand || 'Sample brand',
            category: categoryId,
            stock: req.body.countInStock || 0,
            description: req.body.description || 'Sample description',
        });

        const createdProduct = await product.save();
        res.status(201).json({ success: true, data: createdProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ success: true, message: 'Product removed' });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const { name, price, description, image, brand, category, countInStock } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            if (image) {
                product.images = [image];
            }
            product.brand = brand || product.brand;
            
            if (category) {
                let categoryId;
                if (String(category).match(/^[0-9a-fA-F]{24}$/)) {
                    categoryId = category;
                } else {
                    let existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${category}$`, 'i') } });
                    if (existingCategory) {
                        categoryId = existingCategory._id;
                    } else {
                        const newCategory = await Category.create({ 
                            name: category,
                            slug: category.toLowerCase().replace(/ /g, '-') + '-' + Date.now()
                        });
                        categoryId = newCategory._id;
                    }
                }
                product.category = categoryId;
            }

            product.stock = countInStock !== undefined ? countInStock : product.stock;

            const updatedProduct = await product.save();
            res.json({ success: true, data: updatedProduct });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
