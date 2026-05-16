import React from 'react';

const Returns = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-textMuted">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 text-center">Returns & Refunds</h1>
      
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 space-y-6">
        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">Our 30-Day Return Policy</h2>
          <p className="leading-relaxed">
            We want you to be completely satisfied with your purchase from Shopflow. If for any reason you are not satisfied, we will gladly accept returns within 30 days of the delivery date. Items must be in their original condition, unworn, unwashed, and with all tags attached.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">How to Initiate a Return</h2>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Log in to your account and go to the <strong>Orders</strong> section.</li>
            <li>Select the order containing the item you wish to return.</li>
            <li>Click on <strong>Return Item</strong> and follow the instructions to generate a shipping label.</li>
            <li>Pack the item securely and drop it off at the nearest designated courier facility.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">Refund Process</h2>
          <p className="leading-relaxed">
            Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-heading font-semibold text-white mb-4">Non-Returnable Items</h2>
          <p className="leading-relaxed">
            Certain types of items cannot be returned, including perishable goods, custom products, personal care goods, and clearance items. Please contact our support team if you have questions about your specific item.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Returns;
