import { useState } from 'react';

export default function ProductDetail({ product }) {
  if (!product) return <p className="p-10 text-center">Product not found.</p>;

  const discount = Math.round(
    ((product.discountPercentage * product.price) / (100 - product.discountPercentage)) || 0
  );
  const originalPrice = product.price + discount;
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Product Image */}
        <div className="relative">
          {/* Discount Badge */}
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
            -{Math.round(product.discountPercentage)}%
          </div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded"
          />
        </div>

        {/* Right: Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <div className="text-gray-600">
            <span className="line-through text-gray-400 text-lg mr-2">₹{originalPrice}</span>
            <span className="text-pink-600 font-bold text-2xl">₹{product.price}</span>
          </div>

          <div className="flex items-center text-yellow-500 text-sm">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
            <span className="text-gray-600 ml-2">(customer reviews)</span>
          </div>

          {/* Quantity & Buttons */}
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 border rounded text-lg"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
            >−</button>
            <span className="px-4">{quantity}</span>
            <button
              className="px-3 py-1 border rounded text-lg"
              onClick={() => setQuantity(q => q + 1)}
            >+</button>
          </div>

          <div className="flex gap-4 mt-4">
            <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded">
              Add To Cart
            </button>
            <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded">
              Buy Now
            </button>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mt-4">
            <span className="cursor-pointer hover:underline">⇄ Add to compare</span>
            <span className="cursor-pointer hover:underline">♥ Add to wishlist</span>
          </div>

          {/* Description */}
          <div className="pt-6">
            <h2 className="font-semibold text-lg mb-2">Product Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await res.json();

  if (!product || product.message === 'Product not found') {
    return { notFound: true };
  }

  return { props: { product } };
}
