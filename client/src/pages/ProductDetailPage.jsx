
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useApi from "../api/axios";

const ProductDetailPage = () => {
  const { id } = useParams();
  const api = useApi();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.data.product);
      } catch {
        setError("Could not load this product.");
      }
    };

    getProduct();
  }, [api, id]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-rose-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading product...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">

        {/* Back */}
        <Link
          to="/main"
          className="text-sm font-medium text-slate-500 hover:text-indigo-600"
        >
          ← Back to Products
        </Link>

        {/* Product Card */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <h1 className="text-3xl font-bold text-slate-900">
            {product.name}
          </h1>

          <p className="mt-4 leading-7 text-slate-500">
            {product.description}
          </p>

          <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Price
              </p>

              <p className="mt-1 text-2xl font-bold text-indigo-600">
                ₹{product.price}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Stock
              </p>

              <p className="mt-1 text-lg font-semibold text-slate-800">
                {product.stock} units
              </p>
            </div>
          </div>

          <button
            disabled={product.stock === 0}
            className="mt-7 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
          >
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;

