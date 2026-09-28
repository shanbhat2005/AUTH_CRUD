
// pages/ProductForm.jsx
import { useForm } from "react-hook-form";

const ProductForm = ({ onCancel, onSubmit, initialData, submitLabel = "Add Product" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price ?? "",
      stock: initialData?.stock ?? "",
    },
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          
          {/* Header */}
          <div className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-6 py-8 sm:px-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Add New Product
                </h2>

                <p className="mt-1 text-sm leading-6 text-indigo-100">
                  Create a new product and add it to your collection.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-6 sm:p-8"
          >
            {/* Product Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Product Name
              </label>

              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="e.g. Premium Cotton T-Shirt"
                className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                  errors.name
                    ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />

              {errors.name && (
                <p className="mt-2 text-xs font-medium text-rose-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                Description
              </label>

              <textarea
                id="description"
                rows={5}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 15,
                    message: "At least 15 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Maximum 100 characters",
                  },
                })}
                placeholder="Describe your product, its features, material, or anything customers should know..."
                className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                  errors.description
                    ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                    : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />

              {errors.description && (
                <p className="mt-2 text-xs font-medium text-rose-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Price
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                    ₹
                  </span>

                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("price", {
                      required: "Price is required",
                      min: {
                        value: 0,
                        message: "Must be 0 or more",
                      },
                    })}
                    placeholder="0.00"
                    className={`w-full rounded-xl border bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                      errors.price
                        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                    }`}
                  />
                </div>

                {errors.price && (
                  <p className="mt-2 text-xs font-medium text-rose-500">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label
                  htmlFor="stock"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Stock Quantity
                </label>

                <input
                  id="stock"
                  type="number"
                  min="0"
                  {...register("stock", {
                    required: "Stock is required",
                    min: {
                      value: 0,
                      message: "Must be 0 or more",
                    },
                  })}
                  placeholder="e.g. 25"
                  className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                    errors.stock
                      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                  }`}
                />

                {errors.stock && (
                  <p className="mt-2 text-xs font-medium text-rose-500">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100" />

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {submitLabel}
              </button>
            </div>
          </form>
        </div>

        {/* Footer hint */}
        <p className="mt-5 text-center text-xs text-slate-400">
          All product information can be updated later.
        </p>
      </div>
    </div>
  );
};

export default ProductForm;
