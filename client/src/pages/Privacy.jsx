import React from 'react';

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-textMuted">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 text-center">Privacy Policy</h1>
      
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">1. Information We Collect</h2>
          <p className="leading-relaxed mb-4">
            We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, or fill out a form. When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number, or credit card information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">2. How We Use Your Information</h2>
          <p className="leading-relaxed mb-4">Any of the information we collect from you may be used in one of the following ways:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>To personalize your experience and respond to your individual needs.</li>
            <li>To improve our website based on the information and feedback we receive from you.</li>
            <li>To improve customer service and effectively respond to your customer service requests.</li>
            <li>To process transactions securely and efficiently.</li>
            <li>To send periodic emails regarding your order or other products and services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">3. Data Protection</h2>
          <p className="leading-relaxed">
            We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database only to be accessible by those authorized with special access rights to such systems.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">4. Cookies</h2>
          <p className="leading-relaxed">
            Yes, we use cookies. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. We use cookies to help us remember and process the items in your shopping cart and understand and save your preferences for future visits.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">5. Third-Party Disclosure</h2>
          <p className="leading-relaxed">
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
