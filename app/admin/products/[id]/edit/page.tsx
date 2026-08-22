import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { ProductForm } from '@/components/product-form';
import { updateProduct, deleteProduct } from '@/app/admin/products/actions';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single();
  const { data: suppliers } = await supabase.from('suppliers').select('id, name').order('name');

  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, params.id);
  const deleteWithId = deleteProduct.bind(null, params.id);

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm action={updateWithId} suppliers={suppliers || []} defaultValues={product} />
      <form action={deleteWithId} className="mt-6">
        <button type="submit" className="text-sm text-red-600 hover:underline">
          Delete this product
        </button>
      </form>
    </main>
  );
}
