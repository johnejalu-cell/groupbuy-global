'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function uploadImageIfPresent(supabase: any, imageFile: File): Promise<string | null> {
  if (!imageFile || imageFile.size === 0) return null;
  const fileExt = imageFile.name.split('.').pop();
  const filePath = `products/${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage.from('product-images').upload(filePath, imageFile);
  if (error) return null;

  const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
  return data.publicUrl;
}

export async function createProduct(formData: FormData) {
  const supabase = createClient();
  const imageFile = formData.get('image') as File;
  const imageUrl = await uploadImageIfPresent(supabase, imageFile);

  const { error } = await supabase.from('products').insert({
    supplier_id: formData.get('supplier_id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image_url: imageUrl,
    factory_unit_price: parseFloat(formData.get('factory_unit_price') as string),
    currency: formData.get('currency') as string,
    min_quantity: parseInt(formData.get('min_quantity') as string, 10),
    shipping_notes: formData.get('shipping_notes') as string,
    status: formData.get('status') as string,
  });

  if (error) redirect(`/admin/products/new?error=${encodeURIComponent(error.message)}`);

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = createClient();
  let imageUrl = formData.get('existing_image_url') as string;
  const imageFile = formData.get('image') as File;
  const newImageUrl = await uploadImageIfPresent(supabase, imageFile);
  if (newImageUrl) imageUrl = newImageUrl;

  const { error } = await supabase
    .from('products')
    .update({
      supplier_id: formData.get('supplier_id') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image_url: imageUrl,
      factory_unit_price: parseFloat(formData.get('factory_unit_price') as string),
      currency: formData.get('currency') as string,
      min_quantity: parseInt(formData.get('min_quantity') as string, 10),
      shipping_notes: formData.get('shipping_notes') as string,
      status: formData.get('status') as string,
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId);

  if (error) redirect(`/admin/products/${productId}/edit?error=${encodeURIComponent(error.message)}`);

  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(productId: string) {
  const supabase = createClient();
  await supabase.from('products').delete().eq('id', productId);
  revalidatePath('/admin/products');
  redirect('/admin/products');
}
