import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function DealDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: deal } = await supabase
    .from('deals')
    .select('*, products(title, description, image_url, factory_unit_price, currency, shipping_notes)')
    .eq('id', params.id)
    .single();

  if (!deal) notFound();

  const { data: supplier } = await supabase
    .from('profiles')
    .select('full_name, phone')
    .eq('id', deal.supplier_id)
    .single();

  const pct = Math.min(100, Math.round((deal.current_quantity / deal.threshold_quantity) * 100));
  const deadlinePassed = new Date(deal.deadline) < new Date();

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      {deal.products?.image_url && (
        <img
          src={deal.products.image_url}
          alt={deal.products.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-2xl font-bold">{deal.products?.title}</h1>
      <p className="text-muted-foreground mt-1">
        {deal.products?.currency} {deal.products?.factory_unit_price} / unit
      </p>

      {supplier && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm">
          <span className="text-green-700 font-medium">✓ Verified supplier</span>
          <span className="text-muted-foreground">
            {supplier.full_name}
            {supplier.phone ? ` · ${supplier.phone}` : ''}
          </span>
        </div>
      )}

      <div className="mt-6">
        <div className="w-full bg-muted rounded-full h-3 mb-2">
          <div className="bg-primary h-3 rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-sm text-muted-foreground">
          {deal.current_quantity} / {deal.threshold_quantity} joined ·{' '}
          {deadlinePassed ? 'Deadline passed' : `Ends ${new Date(deal.deadline).toLocaleDateString()}`}
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
        Your order is held with our payment partner — pending activation, fully refundable if this deal doesn&apos;t fill by the deadline.
      </div>

      {deal.products?.description && (
        <p className="mt-6 text-sm">{deal.products.description}</p>
      )}

      {deal.products?.shipping_notes && (
        <p className="mt-4 text-sm text-muted-foreground">
          Shipping: {deal.products.shipping_notes}
        </p>
      )}

      <button
        disabled
        className="mt-8 w-full rounded-lg bg-primary text-primary-foreground px-4 py-3 font-medium opacity-50 cursor-not-allowed"
      >
        Join this deal (payments coming in Phase 4)
      </button>
    </main>
  );
}
