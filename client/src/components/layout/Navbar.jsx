import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
    } else {
      navigate('/products');
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img src="/logo.jpg" alt="Shopflow Logo" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <form onSubmit={submitHandler} className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-accent text-white placeholder-gray-400 transition-all"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-highlight transition-colors">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/wishlist" className="text-textMuted hover:text-highlight transition-colors relative">
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="text-textMuted hover:text-highlight transition-colors relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            {userInfo ? (
              <>
                {userInfo.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-textMuted hover:text-highlight transition-colors font-medium text-sm">
                    Admin
                  </Link>
                )}
                <Link to="/profile" className="flex items-center space-x-2 text-textMuted hover:text-white transition-colors">
                  <User size={24} />
                  <span className="text-sm font-medium">{userInfo.name.split(' ')[0]}</span>
                </Link>
              </>
            ) : (
              <Link to="/login" className="bg-accent hover:bg-accent/80 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-[0_0_15px_rgba(123,47,255,0.5)]">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-textMuted hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-white/10">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <form onSubmit={submitHandler} className="relative mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-accent text-white"
              />
            </form>
            {userInfo ? (
              <>
                {userInfo.role === 'admin' && (
                  <Link to="/admin/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                  Profile
                </Link>
              </>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
                Sign In
              </Link>
            )}
            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
              Cart
            </Link>
            <Link to="/wishlist" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">
              Wishlist
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
