import { requestPasswordReset } from '@/app/auth/actions';

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { sent?: string; error?: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-2">Reset your password</h1>
        <p className="text-muted-foreground text-center mb-8">
          We&apos;ll email you a link to set a new one.
        </p>

        {searchParams.sent && (
          <div className="mb-4 rounded-lg border border-border bg-muted px-4 py-3 text-sm">
            If that email is registered, a reset link is on its way.
          </div>
        )}

        {searchParams.error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {searchParams.error}
          </div>
        )}

        <form action={requestPasswordReset} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium hover:opacity-90 transition"
          >
            Send reset link
          </button>
        </form>
      </div>
    </main>
  );
}
