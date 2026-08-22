import { createClient } from '@/lib/supabase/server';
import { ProductForm } from '@/components/product-form';
import { createProduct } from '@/app/admin/products/actions';

export default async function NewProductPage() {
  const supabase = createClient();
  const { data: suppliers } = await supabase.from('suppliers').select('id, name').order('name');

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">New Product</h1>
      {(!suppliers || suppliers.length === 0) && (
        <p className="text-sm text-muted-foreground mb-6">
          Add a supplier first before creating a product.
        </p>
      )}
      <ProductForm action={createProduct} suppliers={suppliers || []} />
    </main>
  );
}
