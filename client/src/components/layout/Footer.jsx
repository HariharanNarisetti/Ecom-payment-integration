import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#080C24] border-t border-white/5 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="font-heading font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">
                Shopflow
              </span>
            </Link>
            <p className="text-textMuted mb-6 text-sm leading-relaxed">
              Elevating your lifestyle with premium products. Experience the future of online shopping with Shopflow's curated collection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-textMuted hover:bg-accent hover:text-white transition-all">
                <FacebookIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-textMuted hover:bg-accent hover:text-white transition-all">
                <TwitterIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-textMuted hover:bg-accent hover:text-white transition-all">
                <InstagramIcon size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-textMuted hover:bg-accent hover:text-white transition-all">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-textMuted hover:text-highlight transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-textMuted hover:text-highlight transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/products" className="text-textMuted hover:text-highlight transition-colors text-sm">All Products</Link></li>
              <li><Link to="/faq" className="text-textMuted hover:text-highlight transition-colors text-sm">FAQ</Link></li>
              <li><Link to="/blog" className="text-textMuted hover:text-highlight transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-6 text-lg">Customer Service</h3>
            <ul className="space-y-4">
              <li><Link to="/profile" className="text-textMuted hover:text-highlight transition-colors text-sm">My Account</Link></li>
              <li><Link to="/orders" className="text-textMuted hover:text-highlight transition-colors text-sm">Track Order</Link></li>
              <li><Link to="/returns" className="text-textMuted hover:text-highlight transition-colors text-sm">Returns & Refunds</Link></li>
              <li><Link to="/terms" className="text-textMuted hover:text-highlight transition-colors text-sm">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-textMuted hover:text-highlight transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-6 text-lg">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-textMuted text-sm">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span>Eluru Hanuman Nagar, Andhra Pradesh</span>
              </li>
              <li className="flex items-center space-x-3 text-textMuted text-sm">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-textMuted text-sm">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <span>support@shopflow.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-textMuted text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Shopflow E-Commerce. All rights reserved.
          </p>
          <div className="flex space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Payment method icons placeholder */}
            <div className="w-10 h-6 bg-white rounded"></div>
            <div className="w-10 h-6 bg-white rounded"></div>
            <div className="w-10 h-6 bg-white rounded"></div>
            <div className="w-10 h-6 bg-white rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
