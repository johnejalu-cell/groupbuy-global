'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function markPaymentSent(orderId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  await supabase
    .from('participations')
    .update({ status: 'pending_confirmation', updated_at: new Date().toISOString() })
    .eq('id', orderId)
    .eq('buyer_id', user.id)
    .eq('status', 'invited_to_pay');

  revalidatePath('/dashboard/orders');
  redirect('/dashboard/orders');
}
