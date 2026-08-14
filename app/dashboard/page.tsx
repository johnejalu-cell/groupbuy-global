import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/auth/actions';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-bold">Welcome, {profile?.full_name || user.email}</h1>
      <p className="mt-2 text-muted-foreground">Role: {profile?.role || 'buyer'}</p>
      <form action={signOut} className="mt-8">
        <button
          type="submit"
          className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted transition"
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
