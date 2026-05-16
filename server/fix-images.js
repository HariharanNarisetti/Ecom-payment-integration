import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import Product from './models/product.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const checkImage = (url) => {
    return new Promise((resolve) => {
        if (!url || !url.startsWith('http')) {
            resolve(false);
            return;
        }
        
        const req = https.get(url, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve(true);
            } else {
                resolve(false);
            }
            // Consume response data to free up memory
            res.resume();
        }).on('error', () => {
            resolve(false);
        });
        
        req.setTimeout(5000, () => {
            req.destroy();
            resolve(false);
        });
    });
};

const updateImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const products = await Product.find({});
        console.log(`Found ${products.length} products. Checking images...`);

        let updatedCount = 0;

        for (const product of products) {
            const currentImg = product.images[0];
            const isGood = await checkImage(currentImg);
            
            if (!isGood) {
                console.log(`Broken image found for ${product.name}: ${currentImg}`);
                
                // Extract keywords for loremflickr
                const words = product.name.replace(/[^a-zA-Z ]/g, '').split(' ').filter(w => w.length > 2);
                const keyword = words.length > 0 ? words[words.length - 1].toLowerCase() : 'product';
                
                // Use a reliable placeholder service with a keyword
                const newImg = `https://loremflickr.com/800/800/${keyword}?lock=${Math.floor(Math.random() * 1000)}`;
                
                product.images = [newImg];
                await product.save();
                updatedCount++;
                console.log(`Updated ${product.name} with new image: ${newImg}`);
            }
        }

        console.log(`Finished checking. Updated ${updatedCount} broken images.`);
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

updateImages();
