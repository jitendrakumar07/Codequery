// import { useEffect, useRef, useState } from 'react';

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [skip, setSkip] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const observerRef = useRef();

//   const fetchProducts = async () => {
//     if (loading || !hasMore) return;
//     setLoading(true);
//     try {
//       const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
//       const data = await res.json();
//       if (data.products.length > 0) {
//         setProducts(prev => [...prev, ...data.products]);
//         setSkip(prev => prev + 10);
//       }
//       if (data.products.length < 10) {
//         setHasMore(false);
//       }
//     } catch (err) {
//       console.error('Failed to load products:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore && !loading) {
//         fetchProducts();
//       }
//     });

//     const current = observerRef.current;
//     if (current) observer.observe(current);

//     return () => {
//       if (current) observer.unobserve(current);
//     };
//   }, [loading, hasMore]);

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Infinite Products</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {products.map(product => (
//           <div key={product.id} className="border p-4 rounded shadow">
//             <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded" />
//             <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
//             <p className="text-gray-600 text-sm">{product.description}</p>
//             <p className="font-bold text-blue-600 mt-1">${product.price}</p>
//           </div>
//         ))}
//       </div>

//       {loading && <p className="text-center my-4">Loading...</p>}
//       {!hasMore && <p className="text-center my-4 text-gray-500">No more products.</p>}

//       {/* Observer Target */}
//       <div ref={observerRef} className="h-10" />
//     </div>
//   );
// }
