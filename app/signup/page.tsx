import { signUpWithPassword } from '@/app/auth/actions';
import Link from 'next/link';

export default function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2">Create your account</h1>
        <p className="text-muted-foreground text-center mb-8">Join GroupBuy</p>

        {searchParams.error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {searchParams.error}
          </div>
        )}

        <form action={signUpWithPassword} className="space-y-4">
          <input
            type="text"
            name="full_name"
            required
            placeholder="Full name"
            className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="tel"
            name="phone"
            required
            placeholder="Phone number (e.g. 0772xxxxxx)"
            className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
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
            minLength={6}
            placeholder="Password (min. 6 characters)"
            className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium hover:opacity-90 transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
