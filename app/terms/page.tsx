export default function TermsPage() {
  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto text-sm leading-relaxed">
      <h1 className="text-2xl font-bold mb-6">Terms of Sale</h1>

      <h2 className="font-semibold mt-6 mb-2">1. Binding Orders</h2>
      <p>
        Placing an order on GroupBuy is a binding commitment to purchase the stated quantity at the
        stated price, conditional on the deal reaching its activation threshold. No payment is
        collected at the time of ordering.
      </p>

      <h2 className="font-semibold mt-6 mb-2">2. Activation and Payment</h2>
      <p>
        If a deal reaches its threshold before the deadline, it activates and you will be notified
        to complete payment via Mobile Money within the stated payment window. Failure to pay within
        this window may result in your order being cancelled and your spot released to other buyers.
      </p>

      <h2 className="font-semibold mt-6 mb-2">3. Refunds</h2>
      <p>
        If a deal does not reach its threshold by the deadline, no payment is required and no order
        is placed. If you have already paid and the supplier is unable to deliver, you are entitled
        to a full refund via Mobile Money to the number you paid from.
      </p>

      <h2 className="font-semibold mt-6 mb-2">4. Repeated Non-Payment</h2>
      <p>
        Accounts with a pattern of placing orders and failing to pay after activation may be
        restricted from placing further orders.
      </p>

      <h2 className="font-semibold mt-6 mb-2">5. Contact</h2>
      <p>
        Questions about an order can be directed to the supplier contact shown on the deal page.
      </p>
    </main>
  );
}
