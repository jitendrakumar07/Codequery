import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchResults = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}`);
      const data = await res.json();
      setResults(data.products);
    } catch (err) {
      console.error('Error fetching:', err);
    }
    setLoading(false);
  };

  const debouncedFetch = useCallback(debounce(fetchResults, 1000), []);

  useEffect(() => {
    debouncedFetch(query);
  }, [query]);

  const handleSelect = (id) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">🔍 Product Search</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {loading && <p className="mt-4 text-gray-500">Loading...</p>}

        {results.length > 0 && (
          <ul className="mt-4 border rounded bg-white divide-y max-h-80 overflow-y-auto shadow">
            {results.map((item) => (
              <li
                key={item.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelect(item.id)}
              >
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-500">₹{item.price}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
