'use client';

type DealFormProps = {
  action: (formData: FormData) => void;
  products?: { id: string; title: string }[];
  defaultValues?: {
    product_id?: string;
    threshold_quantity?: number;
    deadline?: string;
    status?: string;
  };
  lockProduct?: boolean;
};

export function DealForm({ action, products, defaultValues, lockProduct }: DealFormProps) {
  return (
    <form action={action} className="space-y-4">
      {lockProduct ? (
        <input type="hidden" name="product_id" value={defaultValues?.product_id} />
      ) : (
        <div>
          <label className="block text-sm font-medium mb-1">Product</label>
          <select
            name="product_id"
            required
            defaultValue={defaultValues?.product_id}
            className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select a product</option>
            {products?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Threshold Quantity</label>
        <input
          type="number"
          name="threshold_quantity"
          required
          defaultValue={defaultValues?.threshold_quantity}
          className="w-full rounded-lg border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-1">
          How many units must be committed for this deal to activate.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Deadline</label>
        <input
          type="datetime-local"
          name="deadline"
          required
          defaultValue={defaultValues?.deadline}
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
        Save Deal
      </button>
    </form>
  );
}
