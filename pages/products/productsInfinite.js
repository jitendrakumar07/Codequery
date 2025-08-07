import { useEffect, useRef, useState } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    const data = await res.json();

    setProducts((prev) => [...prev, ...data.products]);
    setSkip((prev) => prev + 10);
    setHasMore(skip + 10 < data.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchProducts();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore, loading]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🛍️ Infinite Scroll Products
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => {
            const discount = Math.round(
              ((product.discountPercentage * product.price) / (100 - product.discountPercentage)) || 0
            );
            const originalPrice = product.price + discount;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden relative flex flex-col"
              >
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  -{Math.round(product.discountPercentage)}%
                </div>

                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 sm:h-52 md:h-48 lg:h-40 object-cover"
                />

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2">
                    {product.title}
                  </h2>

                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="text-xs text-gray-500 mt-1">Brand: {product.brand}</div>
                  <div className="text-xs text-gray-500 mb-2">Category: {product.category}</div>

                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm">
                        <span className="text-gray-400 line-through mr-1">
                          ₹{originalPrice}
                        </span>
                        <span className="text-green-600 font-semibold">
                          ₹{product.price}
                        </span>
                      </div>
                      <div className="text-yellow-500 text-sm font-medium">⭐ {product.rating}</div>
                    </div>

                    <button className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition">
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Observer Trigger */}
        <div ref={loaderRef} className="h-12 mt-10 flex justify-center items-center">
          {loading && <p className="text-gray-500">Loading more products...</p>}
          {!hasMore && <p className="text-gray-500">No more products.</p>}
        </div>
      </div>
    </div>
  );
}
