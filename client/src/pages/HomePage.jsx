
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useApi from "../api/axios";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { setUser, setAccessToken } = useContext(AuthContext);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isForm, setIsForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    const response = await api.get("/products");
    setProducts(response.data.data.products);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsForm(true);
  };

  const handleUpdate = (product) => {
    setEditingProduct(product);
    setIsForm(true);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setUser(null);
      setAccessToken(null);
      navigate("/");
    }
  };

  const handleProductSubmit = async (data) => {
    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, data);
      } else {
        await api.post("/products", data);
      }

      const response = await api.get("/products");
      setProducts(response.data.data.products);
      setEditingProduct(null);
      setIsForm(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          (editingProduct
            ? "Could not update product."
            : "Could not create product.")
      );
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data.data.products);
      } catch {
        setError("Could not load products.");
      }
    };

    getProducts();
  }, [api]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 text-xl font-bold">
            !
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  if (isForm) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <ProductForm
          initialData={editingProduct}
          onCancel={() => {
            setEditingProduct(null);
            setIsForm(false);
          }}
          onSubmit={handleProductSubmit}
          submitLabel={editingProduct ? "Update Product" : "Add Product"}
        />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="text-white">
              <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
                New Collection
              </span>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Find Your Style.
              </h1>

              <p className="mt-4 max-w-xl text-base leading-7 text-indigo-100 sm:text-lg">
                Discover carefully selected products designed to fit your
                everyday style.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="self-start rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 md:self-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Toolbar */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              All Products
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"} available
            </p>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
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

            Add
          </button>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                <svg
                  className="h-8 w-8 text-indigo-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0-2.5 3H6.5L4 13m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-slate-900">
                No products found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Check back later for new products.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;

