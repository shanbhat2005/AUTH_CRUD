
import { Link, useNavigate } from "react-router";

const ProductCard = ({ product,handleDelete }) => {
  const navigate = useNavigate();
  const totalStock = product.stock ?? 0;

 

  const handleUpdate = () => {
    navigate(`/main/products/${product._id}/update`);
  };

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">

      {/* Product Header */}
      <div className="flex items-start justify-between gap-4">
        <Link
          to={`/main/products/${product._id}`}
          className="min-w-0"
        >
          <h2 className="line-clamp-1 text-lg font-bold text-slate-900 transition group-hover:text-indigo-600">
            {product.name}
          </h2>
        </Link>

        {totalStock === 0 ? (
          <span className="shrink-0 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
            Sold Out
          </span>
        ) : (
          <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            In Stock
          </span>
        )}
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
        {product.description}
      </p>

      {/* Price */}
      <div className="mt-5">
        <span className="text-2xl font-bold text-slate-900">
          ₹{product.price}
        </span>
      </div>

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Available Sizes
          </p>

          <div className="flex flex-wrap gap-2">
            {product.sizes.map((item) => (
              <span
                key={item.size}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                  item.stock > 0
                    ? "border-slate-200 bg-slate-50 text-slate-600"
                    : "border-slate-100 bg-slate-50 text-slate-300 line-through"
                }`}
              >
                {item.size}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stock */}
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-sm text-slate-500">
          Total stock
        </span>

        <span className="text-sm font-bold text-slate-800">
          {totalStock}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-3 gap-2">

        {/* View */}
        <button
          type="button"
          onClick={() =>
            navigate(`/main/products/${product._id}`)
          }
          className="rounded-xl bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          View
        </button>

        {/* Update */}
        <button
          type="button"
          onClick={handleUpdate}
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
        >
          Update
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={()=>handleDelete(product._id)}
          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
        >
          Delete
        </button>

      </div>
    </div>
  );
};

export default ProductCard;

