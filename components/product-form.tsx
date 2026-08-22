'use client';

type ProductFormProps = {
  action: (formData: FormData) => void;
  suppliers: { id: string; name: string }[];
  defaultValues?: {
    supplier_id?: string;
    title?: string;
    description?: string;
    factory_unit_price?: number;
    currency?: string;
    min_quantity?: number;
    shipping_notes?: string;
    status?: string;
    image_url?: string;
  };
};

export function ProductForm({ action, suppliers, defaultValues }: ProductFormProps) {
  return (
    <form action={action} className="space-y-4">
      {defaultValues?.image_url && (
        <input type="hidden" name="existing_image_url" value={defaultValues.image_url} />
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Supplier</label>
        <select
          name="supplier_id"
          required
          defaultValue={defaultValues?.supplier_id}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a supplier</option>
          {suppliers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          required
          defaultValue={defaultValues?.title}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={defaultValues?.description}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Product Image</label>
        <input type="file" name="image" accept="image/*" className="w-full text-sm" />
        {defaultValues?.image_url && (
          <p className="text-xs text-muted-foreground mt-1">Leave blank to keep the current image.</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Factory Unit Price</label>
          <input
            type="number"
            step="0.01"
            name="factory_unit_price"
            required
            defaultValue={defaultValues?.factory_unit_price}
            className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Currency</label>
          <select
            name="currency"
            defaultValue={defaultValues?.currency || 'UGX'}
            className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="UGX">UGX</option>
            <option value="KES">KES</option>
            <option value="TZS">TZS</option>
            <option value="RWF">RWF</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Minimum Quantity Threshold</label>
        <input
          type="number"
          name="min_quantity"
          required
          defaultValue={defaultValues?.min_quantity}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Shipping Notes</label>
        <textarea
          name="shipping_notes"
          rows={2}
          defaultValue={defaultValues?.shipping_notes}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          name="status"
          defaultValue={defaultValues?.status || 'draft'}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium hover:opacity-90 transition"
      >
        Save Product
      </button>
    </form>
  );
}
