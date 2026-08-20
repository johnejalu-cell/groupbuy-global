import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { markPaymentSent } from '@/app/dashboard/orders/actions';

const statusLabel: Record<string, string> = {
  placed: 'Order placed — awaiting activation',
  invited_to_pay: 'Deal activated — payment required',
  pending_confirmation: 'Payment reported — awaiting confirmation',
  confirmed: 'Confirmed',
  refunded: 'Refunded',
  expired: 'Expired — payment window missed',
  cancelled: 'Cancelled',
};

export default async function OrdersPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: orders } = await supabase
    .from('participations')
    .select('*, deals(products(title))')
    .eq('buyer_id', user.id)
    .order('created_at', { ascending: false });

  const momoMerchantCode = process.env.NEXT_PUBLIC_MOMO_MERCHANT_CODE;
  const momoName = process.env.NEXT_PUBLIC_MOMO_NAME;

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {!orders || orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order: any) => {
            const markPaidWithId = markPaymentSent.bind(null, order.id);
            return (
              <div key={order.id} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{order.deals?.products?.title}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {statusLabel[order.status] || order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {order.quantity} unit(s) · {order.currency} {order.amount.toLocaleString()} · Ref: {order.order_ref}
                </p>

                {order.status === 'invited_to_pay' && (
                  <div className="mt-3 rounded-lg bg-muted p-3 text-sm">
                    <p className="font-medium mb-1">Pay via MTN MoMoPay</p>
                    <p>
                      Dial <span className="font-medium">*165*3#</span> on your phone
                    </p>
                    <p className="mt-1">
                      Enter merchant code <span className="font-medium">{momoMerchantCode}</span> ({momoName})
                    </p>
                    <p className="mt-1">
                      Enter amount{' '}
                      <span className="font-medium">
                        {order.currency} {order.amount.toLocaleString()}
                      </span>
                      , then your PIN
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Important: pay using the same phone number registered on your GroupBuy account —
                      this is how your payment gets matched to order {order.order_ref}.
                    </p>
                    {order.payment_deadline && (
                      <p className="mt-1 text-muted-foreground">
                        Pay before {new Date(order.payment_deadline).toLocaleString()}
                      </p>
                    )}
                    <form action={markPaidWithId} className="mt-3">
                      <button
                        type="submit"
                        className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                      >
                        I&apos;ve sent payment
                      </button>
                    </form>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
