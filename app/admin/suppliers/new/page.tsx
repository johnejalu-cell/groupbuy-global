import { SupplierForm } from '@/components/supplier-form';
import { createSupplier } from '@/app/admin/suppliers/actions';

export default function NewSupplierPage() {
  return (
    <main className="min-h-screen px-6 py-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">New Supplier</h1>
      <SupplierForm action={createSupplier} />
    </main>
  );
}
