import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import { DealForm } from '@/components/deal-form';
import { updateDeal, deleteDeal } from '@/app/dashboard/deals/actions';

export default async function EditDealPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: deal } = await supabase
    .from('deals')
    .select('*, products(title)')
    .eq('id', params.id)
    .eq('supplier_id', user.id)
    .single();

  if (!deal) notFound();

  const updateWithId = updateDeal.bind(null, params.id);
  const deleteWithId = deleteDeal.bind(null, params.id);

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Edit Deal</h1>
      <p className="text-sm text-muted-foreground mb-6">{deal.products?.title}</p>

      <DealForm
        action={updateWithId}
        defaultValues={{
          product_id: deal.product_id,
          threshold_quantity: deal.threshold_quantity,
          deadline: deal.deadline?.slice(0, 16),
          status: deal.status,
        }}
        lockProduct
      />

      <form action={deleteWithId} className="mt-6">
        <button type="submit" className="text-sm text-red-600 hover:underline">
          Delete this deal
        </button>
      </form>
    </main>
  );
}
