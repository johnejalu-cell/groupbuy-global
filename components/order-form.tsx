'use client';

import { useState } from 'react';

type OrderFormProps = {
  action: (formData: FormData) => void;
  unitPrice: number;
  currency: string;
};

export function OrderForm({ action, unitPrice, currency }: OrderFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [agreed, setAgreed] = useState(false);

  return (
    <form action={action} className="mt-6 space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <input
          type="number"
          name="quantity"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        Total if activated: {currency} {(unitPrice * quantity).toLocaleString()}
      </p>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          name="agreed_to_terms"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          required
          className="mt-1"
        />
        <span>
          I agree to the{' '}
          <a href="/terms" target="_blank" className="text-primary underline">
            Terms of Sale
          </a>{' '}
          and commit to pay {currency} {(unitPrice * quantity).toLocaleString()} via Mobile Money if
          this deal activates.
        </span>
      </label>

      <button
        type="submit"
        disabled={!agreed}
        className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-3 font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Place Order — {currency} {(unitPrice * quantity).toLocaleString()}
      </button>
    </form>
  );
}
