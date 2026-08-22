import Link from 'next/link';

export default function AdminHomePage() {
  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin</h1>
      <div className="grid gap-3">
        <Link href="/admin/suppliers" className="rounded-lg border border-border p-4 hover:bg-muted transition">
          Suppliers
        </Link>
        <Link href="/admin/products" className="rounded-lg border border-border p-4 hover:bg-muted transition">
          Products
        </Link>
        <Link href="/admin/deals" className="rounded-lg border border-border p-4 hover:bg-muted transition">
          Deals
        </Link>
      </div>
    </main>
  );
}
