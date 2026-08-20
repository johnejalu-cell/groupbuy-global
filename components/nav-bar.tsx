import { createClient } from '@/lib/supabase/server';
import { signOut } from '@/app/auth/actions';
import Link from 'next/link';

export async function NavBar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold">
          GroupBuy
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/deals" className="hover:underline">
            Explore Deals
          </Link>

          {user ? (
            <>
              <Link href="/dashboard/orders" className="hover:underline">
                My Orders
              </Link>
              <Link href="/dashboard/products" className="hover:underline">
                My Products
              </Link>
              <Link href="/dashboard/deals" className="hover:underline">
                My Deals
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <form action={signOut}>
                <button type="submit" className="hover:underline">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5 hover:opacity-90 transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
