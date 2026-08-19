import { signInWithPassword } from '@/app/auth/actions';
import Link from 'next/link';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome back</h1>
        <p className="text-muted-foreground text-center mb-8">
          Sign in to GroupBuy
        </p>

        {searchParams.error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {searchParams.error}
          </div>
        )}

        <form action={signInWithPassword} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            required
            placeholder="Password"
            className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium hover:opacity-90 transition"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
