'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createDeal(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { error } = await supabase.from('deals').insert({
    product_id: formData.get('product_id') as string,
    supplier_id: user.id,
    threshold_quantity: parseInt(formData.get('threshold_quantity') as string, 10),
    deadline: formData.get('deadline') as string,
    status: formData.get('status') as string,
  });

  if (error) {
    redirect(`/dashboard/deals/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/dashboard/deals');
  redirect('/dashboard/deals');
}

export async function updateDeal(dealId: string, formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { error } = await supabase
    .from('deals')
    .update({
      threshold_quantity: parseInt(formData.get('threshold_quantity') as string, 10),
      deadline: formData.get('deadline') as string,
      status: formData.get('status') as string,
      updated_at: new Date().toISOString(),
    })
    .eq('id', dealId)
    .eq('supplier_id', user.id);

  if (error) {
    redirect(`/dashboard/deals/${dealId}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/dashboard/deals');
  redirect('/dashboard/deals');
}

export async function deleteDeal(dealId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  await supabase.from('deals').delete().eq('id', dealId).eq('supplier_id', user.id);

  revalidatePath('/dashboard/deals');
  redirect('/dashboard/deals');
}
