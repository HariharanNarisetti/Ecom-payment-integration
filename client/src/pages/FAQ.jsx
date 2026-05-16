import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping usually takes 3-5 business days. Express shipping options are available at checkout for 1-2 day delivery."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. If you're not completely satisfied with your purchase, you can return it for a full refund or exchange."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 100 countries worldwide. International shipping times vary between 7-14 business days depending on the destination."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you will receive a confirmation email with a tracking number. You can also track your order directly from your account dashboard."
  },
  {
    question: "Are my payment details secure?",
    answer: "Absolutely. We use industry-standard encryption protocols and partner with secure payment gateways like Stripe and PayPal to ensure your information is always protected."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Frequently Asked Questions</h1>
        <p className="text-lg text-textMuted">
          Find answers to common questions about our products, shipping, returns, and more.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="text-lg font-heading font-semibold text-white">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-accent flex-shrink-0" />
              ) : (
                <ChevronDown className="text-textMuted flex-shrink-0" />
              )}
            </button>
            
            <div 
              className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-textMuted leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-textMuted mb-4">Still have questions?</p>
        <a href="/contact" className="inline-block bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors border border-white/10">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default FAQ;
