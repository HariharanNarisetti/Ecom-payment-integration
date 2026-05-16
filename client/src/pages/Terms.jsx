import React from 'react';

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-textMuted">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 text-center">Terms & Conditions</h1>
      
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to Shopflow. By accessing our website and purchasing our products, you agree to be bound by these Terms and Conditions. Please read them carefully. These terms apply to all visitors, users, and others who access or use our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">2. Purchases & Payment</h2>
          <p className="leading-relaxed mb-4">
            If you wish to purchase any product made available through the Service, you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
          </p>
          <p className="leading-relaxed">
            All payments are securely processed through trusted payment gateways. We do not store your credit card details on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">3. User Accounts</h2>
          <p className="leading-relaxed">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">4. Intellectual Property</h2>
          <p className="leading-relaxed">
            The Service and its original content, features, and functionality are and will remain the exclusive property of Shopflow and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">5. Limitation of Liability</h2>
          <p className="leading-relaxed">
            In no event shall Shopflow, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
