'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function activateDeal(dealId: string) {
  const supabase = createClient();
  const paymentDeadline = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

  await supabase
    .from('deals')
    .update({ status: 'activated', updated_at: new Date().toISOString() })
    .eq('id', dealId);

  await supabase
    .from('participations')
    .update({ status: 'invited_to_pay', payment_deadline: paymentDeadline })
    .eq('deal_id', dealId)
    .eq('status', 'placed');

  revalidatePath(`/admin/deals/${dealId}/orders`);
  redirect(`/admin/deals/${dealId}/orders`);
}

export async function confirmPayment(orderId: string, dealId: string) {
  const supabase = createClient();
  await supabase
    .from('participations')
    .update({ status: 'confirmed', updated_at: new Date().toISOString() })
    .eq('id', orderId);

  revalidatePath(`/admin/deals/${dealId}/orders`);
  redirect(`/admin/deals/${dealId}/orders`);
}

export async function markRefunded(orderId: string, dealId: string) {
  const supabase = createClient();
  await supabase
    .from('participations')
    .update({ status: 'refunded', updated_at: new Date().toISOString() })
    .eq('id', orderId);

  revalidatePath(`/admin/deals/${dealId}/orders`);
  redirect(`/admin/deals/${dealId}/orders`);
}
