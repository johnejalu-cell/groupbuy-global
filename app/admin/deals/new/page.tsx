import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function DealsPage() {
  const supabase = createClient();
  const { data: deals } = await supabase
    .from('deals')
    .select('*, products(title)')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Deals</h1>
        <Link
          href="/admin/deals/new"
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          + New Deal
        </Link>
      </div>

      {!deals || deals.length === 0 ? (
        <p className="text-muted-foreground">No deals yet.</p>
      ) : (
        <div className="space-y-3">
          {deals.map((deal: any) => {
            const pct = Math.min(100, Math.round((deal.current_quantity / deal.threshold_quantity) * 100));
            return (
              <div key={deal.id} className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <Link href={`/admin/deals/${deal.id}/edit`} className="font-medium hover:underline">
                    {deal.products?.title}
                  </Link>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {deal.status}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-1">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">
                  {deal.current_quantity} / {deal.threshold_quantity} ordered
                </p>
                <Link
                  href={`/admin/deals/${deal.id}/orders`}
                  className="text-xs text-primary hover:underline mt-1 inline-block"
                >
                  View orders →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
