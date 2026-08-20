import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        GroupBuy
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Factory prices, together. Join a group buy — no payment now, and you
        only pay if enough people join to unlock the price.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/deals"
          className="rounded-lg bg-primary text-primary-foreground px-5 py-2.5 font-medium hover:opacity-90 transition"
        >
          Explore Deals
        </Link>
        <Link
          href="/signup"
          className="rounded-lg border border-border px-5 py-2.5 font-medium hover:bg-muted transition"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
