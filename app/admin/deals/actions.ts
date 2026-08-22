'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createDeal(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.from('deals').insert({
    product_id: formData.get('product_id') as string,
    threshold_quantity: parseInt(formData.get('threshold_quantity') as string, 10),
    deadline: formData.get('deadline') as string,
    status: formData.get('status') as string,
  });

  if (error) redirect(`/admin/deals/new?error=${encodeURIComponent(error.message)}`);

  revalidatePath('/admin/deals');
  redirect('/admin/deals');
}

export async function updateDeal(dealId: string, formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase
    .from('deals')
    .update({
      threshold_quantity: parseInt(formData.get('threshold_quantity') as string, 10),
      deadline: formData.get('deadline') as string,
      status: formData.get('status') as string,
      updated_at: new Date().toISOString(),
    })
    .eq('id', dealId);

  if (error) redirect(`/admin/deals/${dealId}/edit?error=${encodeURIComponent(error.message)}`);

  revalidatePath('/admin/deals');
  redirect('/admin/deals');
}

export async function deleteDeal(dealId: string) {
  const supabase = createClient();
  await supabase.from('deals').delete().eq('id', dealId);
  revalidatePath('/admin/deals');
  redirect('/admin/deals');
}
