'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function placeOrder(dealId: string, formData: FormData) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/deals/${dealId}`);
  }

  const quantity = parseInt(formData.get('quantity') as string, 10);
  const agreedToTerms = formData.get('agreed_to_terms') === 'on';

  if (!agreedToTerms) {
    redirect(`/deals/${dealId}?error=You must agree to the Terms of Sale`);
  }

  const { data: deal } = await supabase
    .from('deals')
    .select('*, products(factory_unit_price, currency)')
    .eq('id', dealId)
    .single();

  if (!deal || deal.status !== 'active') {
    redirect(`/deals/${dealId}?error=This deal is not accepting orders`);
  }

  const unitPrice = deal!.products.factory_unit_price;
  const currency = deal!.products.currency;
  const amount = unitPrice * quantity;

  const { error: insertError } = await supabase.from('participations').insert({
    deal_id: dealId,
    buyer_id: user!.id,
    quantity,
    unit_price: unitPrice,
    amount,
    currency,
    agreed_to_terms: true,
    status: 'placed',
  });

  if (insertError) {
    redirect(`/deals/${dealId}?error=Could not place order`);
  }

  const { error: rpcError } = await supabase.rpc('increment_deal_quantity', {
    p_deal_id: dealId,
    p_qty: quantity,
  });

  if (rpcError) {
    redirect(`/deals/${dealId}?error=Order saved but progress bar could not update`);
  }

  revalidatePath(`/deals/${dealId}`);
  redirect(`/deals/${dealId}?ordered=true`);
}
