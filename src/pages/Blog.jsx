import React from "react";

function Blog() {
  return (
    <div className="flex items-center justify-center bg-gray-50 p-8">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Our Blog</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">5 Tips for Smart Online Shopping</h2>
          <p className="text-gray-600">May 2025</p>
          <p>Learn how to get the best deals and avoid scams while shopping online.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Latest Trends in E-Commerce</h2>
          <p className="text-gray-600">April 2025</p>
          <p>Stay updated with the newest features and trends in the world of online shopping.</p>
        </div>
      </div>
    </div>
  );
}

export default Blog;