import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import Product from './models/product.model.js';
import Category from './models/category.model.js';
import User from './models/user.model.js';

const MOCK_DATA = [
    {
        name: "FASHION & APPAREL",
        products: [
            { name: "Men's T-Shirts", price: 499, description: "Comfortable cotton t-shirts for everyday wear.", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop" },
            { name: "Women's Sarees", price: 2499, description: "Elegant silk and cotton sarees for festive occasions.", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop" },
            { name: "Men's Jeans", price: 1299, description: "Classic slim and straight fit denim jeans.", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop" },
            { name: "Women's Kurtis", price: 899, description: "Stylish designer kurtis for daily and office wear.", image: "https://images.unsplash.com/photo-1583391733958-650fac5ebf7f?q=80&w=800&auto=format&fit=crop" },
            { name: "Kids Frocks", price: 699, description: "Cute and colorful frocks for little girls.", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop" },
            { name: "Men's Formal Suits", price: 5999, description: "Premium tailored suits for business and weddings.", image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?q=80&w=800&auto=format&fit=crop" },
            { name: "Women's Leggings", price: 399, description: "Stretchable and comfortable leggings in all colors.", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop" },
            { name: "Men's Hoodies", price: 1499, description: "Warm and stylish winter hoodies.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "FOOTWEAR",
        products: [
            { name: "Men's Sneakers", price: 1999, description: "Trendy and comfortable casual sneakers.", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop" },
            { name: "Women's Heels", price: 1499, description: "Elegant stilettos and block heels for parties.", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop" },
            { name: "Men's Formal Shoes", price: 2499, description: "Premium leather oxfords and loafers.", image: "https://images.unsplash.com/photo-1614252235316-cb2b85e09bd2?q=80&w=800&auto=format&fit=crop" },
            { name: "Women's Flats", price: 699, description: "Comfortable everyday flat sandals and bellies.", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop" },
            { name: "Kids School Shoes", price: 899, description: "Durable black leather school shoes.", image: "https://images.unsplash.com/photo-1502780696253-46844b6bf666?q=80&w=800&auto=format&fit=crop" },
            { name: "Men's Sports Shoes", price: 2999, description: "High-performance running and training shoes.", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
            { name: "Women's Ankle Boots", price: 2299, description: "Stylish winter ankle boots.", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop" },
            { name: "Men's Sandals", price: 999, description: "Casual open-toe sandals for summer.", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "ACCESSORIES",
        products: [
            { name: "Gold Necklaces", price: 15999, description: "Exquisite 22k gold plated necklace sets.", image: "https://images.unsplash.com/photo-1599643478524-fb524b06c649?q=80&w=800&auto=format&fit=crop" },
            { name: "Wristwatches", price: 3499, description: "Premium analog and digital watches.", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop" },
            { name: "Sunglasses", price: 1299, description: "UV-protected stylish aviators and wayfarers.", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop" },
            { name: "Handbags", price: 2499, description: "Designer leather handbags and totes.", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop" },
            { name: "Earrings", price: 499, description: "Beautiful traditional and modern earring designs.", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop" },
            { name: "Leather Wallets", price: 899, description: "Genuine leather bi-fold wallets for men.", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop" },
            { name: "Scarves & Stoles", price: 399, description: "Soft silk and cotton printed scarves.", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop" },
            { name: "Caps & Hats", price: 299, description: "Casual baseball caps and summer hats.", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "ELECTRONICS",
        products: [
            { name: "Smartphones", price: 25000, description: "Latest 5G smartphones with high-res cameras.", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop" },
            { name: "Laptops", price: 65000, description: "High-performance laptops for work and gaming.", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop" },
            { name: "Bluetooth Earbuds", price: 2999, description: "Wireless noise-canceling earbuds.", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop" },
            { name: "Smart Watches", price: 4999, description: "Fitness tracking smartwatches with heart-rate monitor.", image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop" },
            { name: "Smart TVs", price: 35000, description: "4K Ultra HD smart televisions.", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop" },
            { name: "DSLR Cameras", price: 45000, description: "Professional cameras for high-quality photography.", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop" },
            { name: "Tablets", price: 18000, description: "Portable tablets for reading and entertainment.", image: "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?q=80&w=800&auto=format&fit=crop" },
            { name: "Power Banks", price: 1299, description: "Fast-charging high-capacity power banks.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "HOME & FURNITURE",
        products: [
            { name: "Sofa Sets", price: 25000, description: "Comfortable premium fabric 3-seater sofas.", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" },
            { name: "King Size Beds", price: 35000, description: "Solid wood king-size beds with storage.", image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop" },
            { name: "Dining Tables", price: 18000, description: "Elegant 6-seater wooden dining table sets.", image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=800&auto=format&fit=crop" },
            { name: "Wardrobes", price: 22000, description: "Spacious 3-door modern wooden wardrobes.", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop" },
            { name: "Office Chairs", price: 5500, description: "Ergonomic chairs with lumbar support.", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=800&auto=format&fit=crop" },
            { name: "Bookshelves", price: 4500, description: "Minimalist multi-tier bookshelves.", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=800&auto=format&fit=crop" },
            { name: "Coffee Tables", price: 3500, description: "Stylish glass and wood center tables.", image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=800&auto=format&fit=crop" },
            { name: "Dressing Tables", price: 8500, description: "Modern dressing tables with large mirrors.", image: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "KITCHEN & APPLIANCES",
        products: [
            { name: "Refrigerators", price: 28000, description: "Energy-efficient double-door refrigerators.", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop" },
            { name: "Microwave Ovens", price: 8500, description: "Convection microwaves for baking and heating.", image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop" },
            { name: "Mixer Grinders", price: 3500, description: "Powerful 750W mixer grinders with 3 jars.", image: "https://plus.unsplash.com/premium_photo-1663040439626-d35d94efd7db?q=80&w=800&auto=format&fit=crop" },
            { name: "Air Conditioners", price: 38000, description: "1.5 Ton Split ACs for fast cooling.", image: "https://images.unsplash.com/photo-1616183359654-e4359489f4ea?q=80&w=800&auto=format&fit=crop" },
            { name: "Washing Machines", price: 25000, description: "Fully-automatic front load washing machines.", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?q=80&w=800&auto=format&fit=crop" },
            { name: "Electric Kettles", price: 999, description: "1.5L fast boiling electric kettles.", image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=800&auto=format&fit=crop" },
            { name: "Non-Stick Cookware Sets", price: 2499, description: "3-Piece non-stick induction-friendly cookware.", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop" },
            { name: "Induction Cooktops", price: 1999, description: "Fast heating digital induction cooktops.", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "BEAUTY & PERSONAL CARE",
        products: [
            { name: "Lipsticks", price: 499, description: "Long-lasting matte lipsticks in vibrant shades.", image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop" },
            { name: "Face Wash", price: 299, description: "Gentle skin-clearing foaming face wash.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop" },
            { name: "Sunscreen SPF 50", price: 599, description: "Broad-spectrum UV protection sunscreen.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop" },
            { name: "Hair Dryers", price: 1299, description: "1000W professional hot and cold hair dryers.", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop" },
            { name: "Perfumes", price: 1999, description: "Long-lasting luxury fragrances.", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop" },
            { name: "Moisturizing Creams", price: 450, description: "Deep hydrating creams for glowing skin.", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop" },
            { name: "Shampoos", price: 350, description: "Anti-dandruff and hair-fall control shampoos.", image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop" },
            { name: "Electric Shavers", price: 1599, description: "Precision electric beard trimmers for men.", image: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "SPORTS & FITNESS",
        products: [
            { name: "Treadmills", price: 35000, description: "Foldable motorized treadmills for home workouts.", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop" },
            { name: "Yoga Mats", price: 799, description: "Anti-slip thick cushioning yoga mats.", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop" },
            { name: "Dumbbells Set", price: 2500, description: "Adjustable weight dumbbell sets for strength training.", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop" },
            { name: "Bicycles", price: 8500, description: "Multi-gear mountain and city bicycles.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=800&auto=format&fit=crop" },
            { name: "Cricket Bats", price: 3500, description: "Premium English willow cricket bats.", image: "https://plus.unsplash.com/premium_photo-1661376822818-12c5b3d758f8?q=80&w=800&auto=format&fit=crop" },
            { name: "Badminton Rackets", price: 1500, description: "Lightweight carbon graphite badminton rackets.", image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop" },
            { name: "Resistance Bands", price: 499, description: "Set of 5 varying tension resistance bands.", image: "https://plus.unsplash.com/premium_photo-1664302636257-2c9dd20b8b54?q=80&w=800&auto=format&fit=crop" },
            { name: "Protein Supplements", price: 2800, description: "100% Whey protein powder for muscle recovery.", image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "BOOKS, STATIONERY & OFFICE",
        products: [
            { name: "Fiction Novels", price: 299, description: "Bestselling mystery and romance paperback novels.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop" },
            { name: "Notebooks & Diaries", price: 199, description: "Premium ruled notebooks and executive diaries.", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop" },
            { name: "Pens & Pencils Set", price: 150, description: "Smooth writing gel pens and graphite pencils.", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop" },
            { name: "Art Supplies Kit", price: 899, description: "Professional sketching and watercolor painting kits.", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop" },
            { name: "Textbooks", price: 599, description: "Academic curriculum textbooks for schools and colleges.", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop" },
            { name: "File Folders & Organizers", price: 250, description: "Expandable document storage folders.", image: "https://plus.unsplash.com/premium_photo-1661603584852-fb5fc1f40bf2?q=80&w=800&auto=format&fit=crop" },
            { name: "Whiteboards", price: 1200, description: "Magnetic dry-erase whiteboards for offices.", image: "https://images.unsplash.com/photo-1578508197176-db9f52a78726?q=80&w=800&auto=format&fit=crop" },
            { name: "Calculators", price: 650, description: "Scientific and financial desktop calculators.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "TOYS & BABY PRODUCTS",
        products: [
            { name: "Building Blocks (LEGO)", price: 1499, description: "Creative interlocking plastic building blocks.", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop" },
            { name: "Baby Strollers", price: 4500, description: "Lightweight foldable strollers with sun canopy.", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop" },
            { name: "Remote Control Cars", price: 1299, description: "High-speed rechargeable RC racing cars.", image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=800&auto=format&fit=crop" },
            { name: "Dolls & Playsets", price: 899, description: "Interactive fashion dolls and dollhouses.", image: "https://images.unsplash.com/photo-1558066112-70b196886e41?q=80&w=800&auto=format&fit=crop" },
            { name: "Board Games", price: 699, description: "Classic family board games like Monopoly and Chess.", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffaed?q=80&w=800&auto=format&fit=crop" },
            { name: "Baby Car Seats", price: 3500, description: "Safe and comfortable convertible baby car seats.", image: "https://plus.unsplash.com/premium_photo-1661603584852-fb5fc1f40bf2?q=80&w=800&auto=format&fit=crop" },
            { name: "Educational Toys", price: 999, description: "Interactive learning tablets and alphabet games.", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=800&auto=format&fit=crop" },
            { name: "Baby Monitors", price: 2500, description: "Wireless video and audio baby monitoring systems.", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "GROCERY & FOOD",
        products: [
            { name: "Basmati Rice", price: 450, description: "Premium long-grain aromatic basmati rice.", image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=800&auto=format&fit=crop" },
            { name: "Cooking Oils", price: 650, description: "Healthy refined sunflower and olive oils.", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop" },
            { name: "Spices & Masalas", price: 250, description: "Authentic blended Indian spice powders.", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop" },
            { name: "Tea & Coffee", price: 350, description: "Premium Assam tea leaves and roasted coffee beans.", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop" },
            { name: "Chocolates & Candy", price: 450, description: "Assorted rich dark and milk chocolate boxes.", image: "https://images.unsplash.com/photo-1540638349517-3abd5afc5847?q=80&w=800&auto=format&fit=crop" },
            { name: "Dry Fruits & Nuts", price: 850, description: "Premium almonds, cashews, and walnuts.", image: "https://images.unsplash.com/photo-1599551460395-5db91264c1c9?q=80&w=800&auto=format&fit=crop" },
            { name: "Biscuits & Cookies", price: 150, description: "Freshly baked butter and chocolate chip cookies.", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop" },
            { name: "Fresh Fruit Baskets", price: 750, description: "Assorted seasonal fresh organic fruit hampers.", image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "PET SUPPLIES",
        products: [
            { name: "Dog Food", price: 1200, description: "Nutritious dry and wet food for adult dogs and puppies.", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop" },
            { name: "Cat Food", price: 950, description: "High-protein ocean fish and chicken cat food.", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop" },
            { name: "Pet Toys", price: 350, description: "Chew ropes, squeaky toys, and laser pointers.", image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop" },
            { name: "Dog Collars & Leashes", price: 450, description: "Adjustable nylon collars and strong training leashes.", image: "https://images.unsplash.com/photo-1605634568856-11b333a28c46?q=80&w=800&auto=format&fit=crop" },
            { name: "Pet Beds", price: 1500, description: "Soft plush comfortable beds for dogs and cats.", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800&auto=format&fit=crop" },
            { name: "Pet Grooming Kit", price: 850, description: "Brushes, nail clippers, and pet-safe shampoos.", image: "https://images.unsplash.com/photo-1516734212822-43013efa84d8?q=80&w=800&auto=format&fit=crop" },
            { name: "Aquarium Starter Kit", price: 2500, description: "Glass tanks with filters, LED lights, and décor.", image: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be1?q=80&w=800&auto=format&fit=crop" },
            { name: "Pet Treats", price: 250, description: "Healthy dental chews and meat jerky treats.", image: "https://images.unsplash.com/photo-1582560464627-7e61a6b47124?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "AUTOMOTIVE",
        products: [
            { name: "Car Seat Covers", price: 3500, description: "Premium leatherette custom-fit car seat covers.", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop" },
            { name: "Dash Cams", price: 2500, description: "1080p HD dashboard cameras with night vision.", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=800&auto=format&fit=crop" },
            { name: "Car Perfumes", price: 350, description: "Long-lasting gel and spray air fresheners for cars.", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=800&auto=format&fit=crop" },
            { name: "Bike Helmets", price: 1500, description: "ISI certified full-face safety helmets.", image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop" },
            { name: "Engine Oils", price: 1200, description: "High-performance synthetic engine lubricants.", image: "https://images.unsplash.com/photo-1586520377222-7901764df751?q=80&w=800&auto=format&fit=crop" },
            { name: "Car Chargers", price: 450, description: "Dual USB fast-charging adapters for vehicles.", image: "https://images.unsplash.com/photo-1584984260067-12c8b8cd37bb?q=80&w=800&auto=format&fit=crop" },
            { name: "Tyre Inflators", price: 1500, description: "Portable 12V digital air compressor pumps.", image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop" },
            { name: "Bike Covers", price: 450, description: "Waterproof and dust-proof motorcycle body covers.", image: "https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=800&auto=format&fit=crop" }
        ]
    },
    {
        name: "HEALTH & WELLNESS",
        products: [
            { name: "Multivitamins", price: 450, description: "Daily essential vitamin and mineral tablets.", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop" },
            { name: "BP Monitor", price: 1500, description: "Digital automatic blood pressure measuring machines.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop" },
            { name: "Pulse Oximeter", price: 750, description: "Portable fingertip oxygen saturation monitors.", image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=800&auto=format&fit=crop" },
            { name: "First Aid Kit", price: 850, description: "Comprehensive emergency medical supplies box.", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=800&auto=format&fit=crop" },
            { name: "Ayurvedic Supplements", price: 350, description: "Natural herbal immunity and digestion syrups.", image: "https://images.unsplash.com/photo-1611077543944-128a1c97f48e?q=80&w=800&auto=format&fit=crop" },
            { name: "Hand Sanitizers", price: 150, description: "70% alcohol-based germ-killing hand gels.", image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=800&auto=format&fit=crop" },
            { name: "Immunity Boosters", price: 550, description: "Vitamin C, Zinc, and Ashwagandha tablets.", image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?q=80&w=800&auto=format&fit=crop" },
            { name: "Digital Thermometers", price: 250, description: "Fast-reading precise electronic thermometers.", image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=800&auto=format&fit=crop" }
        ]
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Clearing old data...');
        await Product.deleteMany({});
        await Category.deleteMany({});

        // Try to get admin user, if not found, let's just make products without a user or find any user
        let adminUser = await User.findOne({ role: 'admin' });
        let adminUserId = adminUser ? adminUser._id : null;

        console.log('Seeding new 14 categories and 112 products...');
        for (const catData of MOCK_DATA) {
            const category = await Category.create({
                name: catData.name,
                slug: catData.name.toLowerCase().replace(/ & /g, '-').replace(/, /g, '-').replace(/ /g, '-').replace(/[^a-z0-9-]/g, '')
            });

            for (const prodData of catData.products) {
                const sku = 'SKU-' + Date.now() + Math.floor(Math.random() * 10000);
                const slug = prodData.name.toLowerCase().replace(/ /g, '-') + '-' + sku;
                
                await Product.create({
                    name: prodData.name,
                    slug: slug,
                    description: prodData.description,
                    category: category._id,
                    brand: 'Aura Premium',
                    images: [prodData.image],
                    price: prodData.price,
                    stock: 50,
                    sku: sku,
                    user: adminUserId
                });
            }
            console.log(`Seeded category: ${catData.name} with 8 products.`);
        }

        console.log('Database successfully seeded with new catalog!');
        process.exit();
    } catch (error) {
        console.error('Error with database seed:', error);
        process.exit(1);
    }
};

seedDatabase();
