import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Get in Touch</h1>
        <p className="text-lg text-textMuted max-w-2xl mx-auto">
          Have a question or feedback? We would love to hear from you. Fill out the form below or use our contact details to reach out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">First Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent text-white" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-textMuted mb-2">Last Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent text-white" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Email Address</label>
              <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent text-white" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-2">Message</label>
              <textarea rows="5" className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent text-white resize-none" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="w-full flex justify-center items-center py-3 px-4 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors">
              <Send size={18} className="mr-2" /> Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-2">Our Location</h3>
              <p className="text-textMuted">Eluru Hanuman Nagar<br/>Andhra Pradesh<br/>India</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-2">Phone Number</h3>
              <p className="text-textMuted">+1 (800) 123-4567<br/>Mon-Fri 9am-6pm PST</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/20 text-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-2">Email Address</h3>
              <p className="text-textMuted">support@shopflow.com<br/>info@shopflow.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
