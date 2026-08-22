'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createSupplier(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.from('suppliers').insert({
    name: formData.get('name') as string,
    phone: formData.get('phone') as string,
    contact_notes: formData.get('contact_notes') as string,
  });

  if (error) redirect(`/admin/suppliers/new?error=${encodeURIComponent(error.message)}`);

  revalidatePath('/admin/suppliers');
  redirect('/admin/suppliers');
}

export async function updateSupplier(supplierId: string, formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase
    .from('suppliers')
    .update({
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      contact_notes: formData.get('contact_notes') as string,
    })
    .eq('id', supplierId);

  if (error) redirect(`/admin/suppliers/${supplierId}/edit?error=${encodeURIComponent(error.message)}`);

  revalidatePath('/admin/suppliers');
  redirect('/admin/suppliers');
}

export async function deleteSupplier(supplierId: string) {
  const supabase = createClient();
  await supabase.from('suppliers').delete().eq('id', supplierId);
  revalidatePath('/admin/suppliers');
  redirect('/admin/suppliers');
}
