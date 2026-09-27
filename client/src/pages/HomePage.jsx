
import { useEffect, useState } from "react";
import useApi from "../api/axios";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const api = useApi();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

   const handleDelete = async(id) => {
    await api.delete(`/products/${id}`)
    const response= await api.get("/products")
    setProducts(response.data.data.products)
    
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

            {/* Search */}
            <div className="relative w-full md:w-80 lg:w-96">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-2xl border border-white/20 bg-white/95 px-5 py-4 pl-12 text-sm text-slate-900 shadow-xl outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-white/20"
              />

              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                />
              </svg>
            </div>
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

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
            Sort by
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m6 9 6 6 6-6"
              />
            </svg>
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
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;

