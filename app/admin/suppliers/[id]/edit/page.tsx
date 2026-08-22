import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { SupplierForm } from '@/components/supplier-form';
import { updateSupplier, deleteSupplier } from '@/app/admin/suppliers/actions';

export default async function EditSupplierPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: supplier } = await supabase.from('suppliers').select('*').eq('id', params.id).single();

  if (!supplier) notFound();

  const updateWithId = updateSupplier.bind(null, params.id);
  const deleteWithId = deleteSupplier.bind(null, params.id);

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Supplier</h1>
      <SupplierForm action={updateWithId} defaultValues={supplier} />
      <form action={deleteWithId} className="mt-6">
        <button type="submit" className="text-sm text-red-600 hover:underline">
          Delete this supplier
        </button>
      </form>
    </main>
  );
}
