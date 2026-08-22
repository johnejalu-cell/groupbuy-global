import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function ProductsPage() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*, suppliers(name)')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          + New Product
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <p className="text-muted-foreground">No products yet.</p>
      ) : (
        <div className="space-y-3">
          {products.map((p: any) => (
            <Link
              key={p.id}
              href={`/admin/products/${p.id}/edit`}
              className="block rounded-lg border border-border p-4 hover:bg-muted transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {p.suppliers?.name} · {p.currency} {p.factory_unit_price}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    p.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
