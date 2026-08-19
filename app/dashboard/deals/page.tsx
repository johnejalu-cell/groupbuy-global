import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DealsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: deals } = await supabase
    .from('deals')
    .select('*, products(title)')
    .eq('supplier_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Deals</h1>
        <Link
          href="/dashboard/deals/new"
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          + New Deal
        </Link>
      </div>

      {!deals || deals.length === 0 ? (
        <p className="text-muted-foreground">
          No deals yet. Create one from a product to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {deals.map((deal: any) => {
            const pct = Math.min(
              100,
              Math.round((deal.current_quantity / deal.threshold_quantity) * 100)
            );
            return (
              <Link
                key={deal.id}
                href={`/dashboard/deals/${deal.id}/edit`}
                className="block rounded-lg border border-border p-4 hover:bg-muted transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{deal.products?.title}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      deal.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : deal.status === 'activated'
                        ? 'bg-blue-100 text-blue-700'
                        : deal.status === 'failed'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {deal.status}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-1">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {deal.current_quantity} / {deal.threshold_quantity} joined · Deadline{' '}
                  {new Date(deal.deadline).toLocaleDateString()}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
