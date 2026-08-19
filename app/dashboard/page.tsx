import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProductsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('supplier_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link
          href="/dashboard/products/new"
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          + New Product
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <p className="text-muted-foreground">
          No products yet. Create your first one to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/dashboard/products/${product.id}/edit`}
              className="block rounded-lg border border-border p-4 hover:bg-muted transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.currency} {product.factory_unit_price} · Min qty: {product.min_quantity}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    product.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {product.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
