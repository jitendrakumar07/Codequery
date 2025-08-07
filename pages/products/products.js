import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Products({ products, total, currentPage }) {
  const router = useRouter();
  const totalPages = Math.ceil(total / 10);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debounceTimeout = useRef(null);

  // Pagination
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    router.push(`/products?page=${page}`);
  };

  // Debounced Search Logic
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
      const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
      const data = await res.json();
      setSearchResults(data.products);
    }, 1000); // 1 second debounce
  }, [searchTerm]);

  const activeProducts = searchTerm ? searchResults : products;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🛍️ Stylish Product Listings
        </h1>

   {/* Premium Search Input */}
<div className="mb-10 flex justify-center px-4">
  <div className="relative w-full max-w-xl">
    <input
      type="text"
      placeholder="Search for products, brands, categories..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full pl-12 pr-12 py-3 text-sm sm:text-base rounded-full border border-gray-300 bg-white shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
    />

    {/* Search Icon */}
    <div className="absolute inset-y-0 left-4 flex items-center text-gray-400 pointer-events-none text-lg">
      🔍
    </div>

    {/* Optional Clear Button */}
    {searchTerm && (
      <button
        onClick={() => setSearchTerm('')}
        className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none text-sm"
      >
        ✕
      </button>
    )}
  </div>
</div>



        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {activeProducts.map((product) => {
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

                  <div className="text-xs text-gray-500 mt-1">
                    Brand: {product.brand}
                  </div>

                  <div className="text-xs text-gray-500 mb-2">
                    Category: {product.category}
                  </div>

                  {/* Price & Rating */}
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
                      <div className="text-yellow-500 text-sm font-medium">
                        ⭐ {product.rating}
                      </div>
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

        {/* Pagination */}
        {!searchTerm && (
          <div className="mt-12 flex justify-center items-center gap-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              ⬅ Previous
            </button>

            <span className="text-gray-700 text-lg">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next ➡
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Server-side fetching for paginated results
export async function getServerSideProps(context) {
  const page = parseInt(context.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const data = await res.json();

  return {
    props: {
      products: data.products,
      total: data.total,
      currentPage: page,
    },
  };
}
