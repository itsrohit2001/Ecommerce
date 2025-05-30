import React from "react";

function Shop() {
  return (
    <div className="flex items-center justify-center bg-gray-50 p-8">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Shop Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-4 rounded shadow">
            <img src="/assets/product1.jpg" alt="Product 1" className="mb-2 w-full h-40 object-cover" />
            <h2 className="text-xl font-semibold">Product 1</h2>
            <p className="text-gray-600">$29.99</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
          </div>
          <div className="border p-4 rounded shadow">
            <img src="/assets/product2.jpg" alt="Product 2" className="mb-2 w-full h-40 object-cover" />
            <h2 className="text-xl font-semibold">Product 2</h2>
            <p className="text-gray-600">$39.99</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
          </div>
          <div className="border p-4 rounded shadow">
            <img src="/assets/product3.jpg" alt="Product 3" className="mb-2 w-full h-40 object-cover" />
            <h2 className="text-xl font-semibold">Product 3</h2>
            <p className="text-gray-600">$49.99</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;