'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function activateDeal(dealId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const paymentDeadline = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

  await supabase
    .from('deals')
    .update({ status: 'activated', updated_at: new Date().toISOString() })
    .eq('id', dealId)
    .eq('supplier_id', user.id);

  await supabase
    .from('participations')
    .update({ status: 'invited_to_pay', payment_deadline: paymentDeadline })
    .eq('deal_id', dealId)
    .eq('status', 'placed');

  revalidatePath(`/dashboard/deals/${dealId}/orders`);
  redirect(`/dashboard/deals/${dealId}/orders`);
}

export async function confirmPayment(orderId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: order } = await supabase
    .from('participations')
    .select('deal_id, deals(supplier_id)')
    .eq('id', orderId)
    .single();

  if (!order || (order.deals as any)?.supplier_id !== user.id) redirect('/dashboard');

  await supabase
    .from('participations')
    .update({ status: 'confirmed', updated_at: new Date().toISOString() })
    .eq('id', orderId);

  revalidatePath(`/dashboard/deals/${order.deal_id}/orders`);
  redirect(`/dashboard/deals/${order.deal_id}/orders`);
}

export async function markRefunded(orderId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: order } = await supabase
    .from('participations')
    .select('deal_id, deals(supplier_id)')
    .eq('id', orderId)
    .single();

  if (!order || (order.deals as any)?.supplier_id !== user.id) redirect('/dashboard');

  await supabase
    .from('participations')
    .update({ status: 'refunded', updated_at: new Date().toISOString() })
    .eq('id', orderId);

  revalidatePath(`/dashboard/deals/${order.deal_id}/orders`);
  redirect(`/dashboard/deals/${order.deal_id}/orders`);
}
