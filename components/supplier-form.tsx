'use client';

type SupplierFormProps = {
  action: (formData: FormData) => void;
  defaultValues?: { name?: string; phone?: string; contact_notes?: string };
};

export function SupplierForm({ action, defaultValues }: SupplierFormProps) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          required
          defaultValue={defaultValues?.name}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone</label>
        <input
          type="text"
          name="phone"
          defaultValue={defaultValues?.phone}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Contact Notes</label>
        <textarea
          name="contact_notes"
          rows={2}
          defaultValue={defaultValues?.contact_notes}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium hover:opacity-90 transition"
      >
        Save Supplier
      </button>
    </form>
  );
}
