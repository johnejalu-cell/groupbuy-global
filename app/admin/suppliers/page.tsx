import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function SuppliersPage() {
  const supabase = createClient();
  const { data: suppliers } = await supabase.from('suppliers').select('*').order('name');

  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Suppliers</h1>
        <Link
          href="/admin/suppliers/new"
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition"
        >
          + New Supplier
        </Link>
      </div>

      {!suppliers || suppliers.length === 0 ? (
        <p className="text-muted-foreground">No suppliers yet.</p>
      ) : (
        <div className="space-y-3">
          {suppliers.map((s) => (
            <Link
              key={s.id}
              href={`/admin/suppliers/${s.id}/edit`}
              className="block rounded-lg border border-border p-4 hover:bg-muted transition"
            >
              <p className="font-medium">{s.name}</p>
              <p className="text-sm text-muted-foreground">{s.phone}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
