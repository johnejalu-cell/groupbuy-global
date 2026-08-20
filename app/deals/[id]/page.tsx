import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { OrderForm } from '@/components/order-form';
import { placeOrder } from '@/app/deals/[id]/actions';

export default async function DealDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { ordered?: string; error?: string };
}) {
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
  const orderAction = placeOrder.bind(null, params.id);

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
          {deal.current_quantity} / {deal.threshold_quantity} ordered ·{' '}
          {deadlinePassed ? 'Deadline passed' : `Ends ${new Date(deal.deadline).toLocaleDateString()}`}
        </p>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
        No payment is taken now. If this deal activates, you&apos;ll be asked to pay via Mobile Money
        within a set window. See our{' '}
        <a href="/terms" className="underline">
          Terms of Sale
        </a>
        .
      </div>

      {deal.products?.description && <p className="mt-6 text-sm">{deal.products.description}</p>}

      {deal.products?.shipping_notes && (
        <p className="mt-4 text-sm text-muted-foreground">Shipping: {deal.products.shipping_notes}</p>
      )}

      {searchParams.ordered && (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Order placed. Check &quot;My Orders&quot; for status — you&apos;ll be notified if this deal activates.
        </div>
      )}

      {searchParams.error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {searchParams.error}
        </div>
      )}

      {!deadlinePassed && deal.status === 'active' && (
        <OrderForm
          action={orderAction}
          unitPrice={deal.products.factory_unit_price}
          currency={deal.products.currency}
        />
      )}
    </main>
  );
}
