import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">About Shopflow</h1>
        <p className="text-lg text-textMuted max-w-2xl mx-auto">
          We believe in providing the best online shopping experience with premium quality products and exceptional customer service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white mb-4">Our Story</h2>
          <p className="text-textMuted mb-4 leading-relaxed">
            Founded in 2026, Shopflow started with a simple vision: to revolutionize the way people shop online. We wanted to create a platform that not only offers top-tier products but also ensures an intuitive, seamless, and futuristic shopping journey.
          </p>
          <p className="text-textMuted leading-relaxed">
            From our humble beginnings in a small garage to a global e-commerce platform, our dedication to quality and innovation has never wavered. Every product on our store is handpicked to meet the highest standards of excellence.
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Team Collaboration" 
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
          <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
          <h3 className="text-xl font-heading font-semibold text-white mb-3">Premium Quality</h3>
          <p className="text-textMuted text-sm">We source only the finest materials and work with top manufacturers.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
          <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
          <h3 className="text-xl font-heading font-semibold text-white mb-3">Fast Delivery</h3>
          <p className="text-textMuted text-sm">Lightning-fast shipping worldwide with real-time tracking.</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
          <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
          <h3 className="text-xl font-heading font-semibold text-white mb-3">24/7 Support</h3>
          <p className="text-textMuted text-sm">Our dedicated team is always here to help you with any questions.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
