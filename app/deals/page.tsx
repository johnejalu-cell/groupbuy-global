import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function ExploreDealsPage() {
  const supabase = createClient();

  const { data: deals } = await supabase
    .from('deals')
    .select('*, products(title, image_url, factory_unit_price, currency)')
    .eq('status', 'active')
    .order('deadline', { ascending: true });

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Explore Deals</h1>
      <p className="text-muted-foreground mb-8">
        Join a group buy — your order is held safely until enough people join to unlock the price.
      </p>

      {!deals || deals.length === 0 ? (
        <p className="text-muted-foreground">No active deals right now. Check back soon.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {deals.map((deal: any) => {
            const pct = Math.min(
              100,
              Math.round((deal.current_quantity / deal.threshold_quantity) * 100)
            );
            return (
              <Link
                key={deal.id}
                href={`/deals/${deal.id}`}
                className="rounded-lg border border-border overflow-hidden hover:shadow-md transition"
              >
                {deal.products?.image_url && (
                  <img
                    src={deal.products.image_url}
                    alt={deal.products.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="font-medium">{deal.products?.title}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {deal.products?.currency} {deal.products?.factory_unit_price} / unit
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 mb-1">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {deal.current_quantity} / {deal.threshold_quantity} joined
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
