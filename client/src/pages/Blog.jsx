import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "10 Must-Have Accessories for the Modern Professional",
    excerpt: "Elevate your work-from-home or office setup with these essential, stylish, and functional accessories that boost productivity.",
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Jane Doe",
    date: "Oct 12, 2026",
    category: "Lifestyle"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Minimalist Fashion",
    excerpt: "Discover how to build a versatile capsule wardrobe that saves you time and money while keeping you looking effortlessly chic.",
    image: "https://images.unsplash.com/photo-1434389678369-182cb2072919?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Alex Smith",
    date: "Sep 28, 2026",
    category: "Fashion"
  },
  {
    id: 3,
    title: "Top 5 Smart Home Devices for 2026",
    excerpt: "Upgrade your living space with the latest smart home technology designed for convenience, security, and energy efficiency.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Sarah Johnson",
    date: "Sep 15, 2026",
    category: "Technology"
  }
];

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Shopflow Blog</h1>
        <p className="text-lg text-textMuted max-w-2xl mx-auto">
          Stay updated with the latest trends, styling tips, and tech reviews from our expert team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(123,47,255,0.2)] transition-all duration-300 transform hover:-translate-y-2">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-accent/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                {post.category}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-4 text-xs text-textMuted mb-4">
                <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
              </div>
              
              <h2 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h2>
              
              <p className="text-textMuted text-sm mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              
              <a href="#" className="inline-flex items-center text-accent hover:text-highlight font-medium text-sm transition-colors">
                Read More <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
