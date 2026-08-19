import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DealForm } from '@/components/deal-form';
import { createDeal } from '@/app/dashboard/deals/actions';

export default async function NewDealPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: products } = await supabase
    .from('products')
    .select('id, title')
    .eq('supplier_id', user.id)
    .eq('status', 'active');

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">New Deal</h1>
      {(!products || products.length === 0) && (
        <p className="text-sm text-muted-foreground mb-6">
          You need at least one active product before creating a deal.
        </p>
      )}
      <DealForm action={createDeal} products={products || []} />
    </main>
  );
}
