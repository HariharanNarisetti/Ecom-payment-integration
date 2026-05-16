import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Search } from 'lucide-react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      navigate(`/order/${orderId.trim()}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[70vh] flex flex-col justify-center">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <Package size={40} />
        </div>
        <h1 className="text-4xl font-heading font-bold text-white mb-4">Track Your Order</h1>
        <p className="text-lg text-textMuted max-w-xl mx-auto">
          Enter your Order ID below to check the current status of your shipment. You can find the Order ID in your confirmation email or in your account profile.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-textMuted" />
            </div>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. 64b8f... or Order Number"
              className="block w-full pl-12 pr-4 py-4 border border-white/10 rounded-xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center py-4 px-8 bg-accent hover:bg-accent/90 text-white rounded-xl font-medium transition-colors shadow-[0_0_15px_rgba(123,47,255,0.4)] sm:w-auto w-full text-lg"
          >
            Track
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-white/10 pt-6">
          <p className="text-textMuted text-sm">
            Can't find your Order ID? <a href="/profile" className="text-accent hover:text-highlight transition-colors">Log in to your account</a> to view all your orders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
