import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProductForm } from '@/components/product-form';
import { createProduct } from '@/app/dashboard/products/actions';

export default async function NewProductPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New Product</h1>
      <ProductForm action={createProduct} />
    </main>
  );
}
