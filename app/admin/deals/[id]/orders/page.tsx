import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { activateDeal, confirmPayment, markRefunded } from '@/app/admin/deals/[id]/orders/actions';

export default async function DealOrdersPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: deal } = await supabase
    .from('deals')
    .select('*, products(title)')
    .eq('id', params.id)
    .single();

  if (!deal) notFound();

  const { data: orders } = await supabase
    .from('participations')
    .select('*, profiles(full_name, phone)')
    .eq('deal_id', params.id)
    .order('created_at', { ascending: false });

  const activateWithId = activateDeal.bind(null, params.id);
  const readyToActivate = deal.status === 'active' && deal.current_quantity >= deal.threshold_quantity;

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">{deal.products?.title} — Orders</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {deal.current_quantity} / {deal.threshold_quantity} ordered · Status: {deal.status}
      </p>

      {readyToActivate && (
        <form action={activateWithId} className="mb-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-3 font-medium hover:opacity-90 transition"
          >
            Activate deal & invite all buyers to pay
          </button>
        </form>
      )}

      {!orders || orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order: any) => {
            const confirmWithId = confirmPayment.bind(null, order.id, params.id);
            const refundWithId = markRefunded.bind(null, order.id, params.id);
            return (
              <div key={order.id} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {order.profiles?.full_name} · {order.profiles?.phone}
                  </p>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {order.quantity} unit(s) · {order.currency} {order.amount.toLocaleString()} · Ref: {order.order_ref}
                </p>

                {order.status === 'pending_confirmation' && (
                  <form action={confirmWithId} className="mt-3">
                    <button
                      type="submit"
                      className="rounded-lg bg-green-600 text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                    >
                      Confirm payment received
                    </button>
                  </form>
                )}

                {(order.status === 'confirmed' || order.status === 'pending_confirmation') && (
                  <form action={refundWithId} className="mt-2">
                    <button type="submit" className="text-sm text-red-600 hover:underline">
                      Mark refunded
                    </button>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
