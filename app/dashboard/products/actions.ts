'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  let imageUrl: string | null = null;
  const imageFile = formData.get('image') as File;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile);

    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }
  }

  const { error } = await supabase.from('products').insert({
    supplier_id: user.id,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image_url: imageUrl,
    factory_unit_price: parseFloat(formData.get('factory_unit_price') as string),
    currency: formData.get('currency') as string,
    min_quantity: parseInt(formData.get('min_quantity') as string, 10),
    shipping_notes: formData.get('shipping_notes') as string,
    status: formData.get('status') as string,
  });

  if (error) {
    redirect(`/dashboard/products/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  let imageUrl = formData.get('existing_image_url') as string;
  const imageFile = formData.get('image') as File;

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile);

    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
      imageUrl = urlData.publicUrl;
    }
  }

  const { error } = await supabase
    .from('products')
    .update({
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
    .eq('id', productId)
    .eq('supplier_id', user.id);

  if (error) {
    redirect(`/dashboard/products/${productId}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteProduct(productId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  await supabase.from('products').delete().eq('id', productId).eq('supplier_id', user.id);

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}
