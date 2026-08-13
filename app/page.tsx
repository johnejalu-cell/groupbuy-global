export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        GroupBuy
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Factory prices, together. Join a group buy — your payment is held
        safely until enough people join to unlock the price.
      </p>
      <div className="mt-8 rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
        Phase 0 scaffold — auth, deals, and payments land in the next phases.
      </div>
    </main>
  );
}
