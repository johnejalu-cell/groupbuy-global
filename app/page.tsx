import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = createClient();
  const { data: featuredDeals } = await supabase
    .from('deals')
    .select('*, products(title, image_url, factory_unit_price, currency)')
    .eq('status', 'active')
    .order('deadline', { ascending: true })
    .limit(3);

  return (
    <main className="min-h-screen">
      <section className="px-6 py-16 text-center bg-muted">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl max-w-2xl mx-auto">
          Factory prices. No middlemen. Together.
        </h1>
        <p className="mt-4 max-w-lg mx-auto text-muted-foreground text-lg">
          Join with other buyers to unlock bulk pricing on the goods you already buy.
          No payment until enough people join — then pay directly, safely, via Mobile Money.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/deals"
            className="rounded-lg bg-primary text-primary-foreground px-6 py-3 font-medium hover:opacity-90 transition"
          >
            Explore Deals
          </Link>
        </div>
      </section>

      <section className="px-6 py-14 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">How it works</h2>
        <div className="grid gap-8 sm:grid-cols-3 text-center">
          <div>
            <div className="text-3xl mb-2">1️⃣</div>
            <p className="font-medium mb-1">Place your order</p>
            <p className="text-sm text-muted-foreground">
              No payment needed yet — just commit to the deal.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">2️⃣</div>
            <p className="font-medium mb-1">Deal fills up</p>
            <p className="text-sm text-muted-foreground">
              Once enough buyers join, the factory price unlocks.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">3️⃣</div>
            <p className="font-medium mb-1">Pay & receive</p>
            <p className="text-sm text-muted-foreground">
              Pay via Mobile Money, then get your order — verified suppliers only.
            </p>
          </div>
        </div>
      </section>

      {featuredDeals && featuredDeals.length > 0 && (
        <section className="px-6 py-14 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Deals filling up now</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {featuredDeals.map((deal: any) => {
              const pct = Math.min(100, Math.round((deal.current_quantity / deal.threshold_quantity) * 100));
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
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-3">
                    <p className="font-medium text-sm">{deal.products?.title}</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2 mb-1">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {deal.current_quantity} / {deal.threshold_quantity} ordered
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="px-6 py-14 bg-muted text-center">
        <p className="max-w-xl mx-auto text-muted-foreground">
          No payment is ever taken upfront. If a deal doesn&apos;t fill, you owe nothing.
          Every supplier is reviewed before their products go live.
        </p>
        <Link href="/signup" className="mt-4 inline-block text-primary font-medium hover:underline">
          Create an account to get started →
        </Link>
      </section>
    </main>
  );
}
