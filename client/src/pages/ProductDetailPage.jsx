
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useApi from "../api/axios";
import ProductForm from "../components/ProductForm";

const ProductDetailPage = () => {
  const { id } = useParams();
  const api = useApi();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

  const handleUpdate = async (data) => {
    try {
      const response = await api.put(`/products/${id}`, data);
      setProduct(response.data.data.product);
      setIsEditing(false);
    } catch (error) {
      setError(error.response?.data?.message || "Could not update product.");
    }
  };

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

  if (isEditing) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <ProductForm
          initialData={product}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleUpdate}
          submitLabel="Update Product"
        />
      </main>
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

          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Update Product
          </button>

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

        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;

