import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model.js';
import Category from './models/category.model.js';

dotenv.config();

const categoriesData = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Clothing', slug: 'clothing' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'Home & Garden', slug: 'home-garden' }
];

const generateProducts = (categoryObj, categoryName) => {
  const products = [];
  const brands = {
    'Electronics': ['Sony', 'Samsung', 'Apple', 'Dell'],
    'Clothing': ['Nike', 'Adidas', 'Zara', 'H&M'],
    'Accessories': ['Rolex', 'Ray-Ban', 'Fossil', 'Casio'],
    'Home & Garden': ['IKEA', 'Dyson', 'Philips', 'Bosch']
  };
  const categoryBrands = brands[categoryName];

  for (let i = 1; i <= 10; i++) {
    const brand = categoryBrands[Math.floor(Math.random() * categoryBrands.length)];
    const price = Math.floor(Math.random() * 50000) + 1000; // 1000 to 51000 INR
    
    // Better images per category
    let image = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80';
    if (categoryName === 'Clothing') image = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80';
    if (categoryName === 'Accessories') image = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80';
    if (categoryName === 'Home & Garden') image = 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&q=80';

    products.push({
      name: `${brand} Premium ${categoryName} Item ${i}`,
      slug: `${brand.toLowerCase()}-premium-${categoryName.toLowerCase().replace(/ & /g, '-')}-item-${i}-${Date.now()}`,
      description: `This is a high quality ${categoryName} item by ${brand}. Perfect for daily use with excellent durability and design.`,
      category: categoryObj._id,
      brand: brand,
      images: [image],
      price: price,
      discountedPrice: price * 0.9,
      stock: Math.floor(Math.random() * 50) + 10,
      sku: `SKU-${categoryName.substring(0,3).toUpperCase()}-${brand.substring(0,3).toUpperCase()}-${i}-${Math.floor(Math.random()*1000)}`,
      ratings: { average: 4.5, count: Math.floor(Math.random() * 100) },
      isFeatured: i === 1
    });
  }
  return products;
};

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');

    await Product.deleteMany();
    await Category.deleteMany();

    const createdCategories = await Category.insertMany(categoriesData);

    let allProducts = [];
    for (const cat of createdCategories) {
      allProducts = [...allProducts, ...generateProducts(cat, cat.name)];
    }

    await Product.insertMany(allProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
