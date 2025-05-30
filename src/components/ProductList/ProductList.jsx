import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Pdp from "../../pages/Pdp";
import { Routes, Route } from "react-router-dom";
import AllProducts from "../../components/AllProducts/AllProducts";
import React from "react";

export function ProductListUI({ products }) {
  // Show 1 on mobile, 2 on sm, 3 on md+
  const getVisibleCount = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [startIdx, setStartIdx] = useState(0);
  const [direction, setDirection] = useState(""); // for animation

  // Update visibleCount on resize
  React.useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const endIdx = startIdx + visibleCount;
  const canGoLeft = startIdx > 0;
  const canGoRight = endIdx < products.length;

  const handlePrev = () => {
    setDirection("left");
    setTimeout(() => {
      setStartIdx((prev) => Math.max(prev - visibleCount, 0));
      setDirection("");
    }, 200);
  };

  const handleNext = () => {
    setDirection("right");
    setTimeout(() => {
      setStartIdx((prev) =>
        Math.min(prev + visibleCount)
      );
      setDirection("");
    }, 200);
  };

  // Responsive carousel container
  return (
    <div className="product-list px-2 py-8 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Popular Products</h1>
      <div className="relative">
        <div className="flex items-center justify-center gap-2">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={!canGoLeft}
            className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Previous"
          >
            <FaChevronLeft size={20} />
          </button>
          {/* Carousel Items with animation */}
          <div className="flex-1 flex justify-center">
            <div
              className={`
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl
                transition-transform duration-200
                ${direction === "left" ? "-translate-x-10 opacity-50" : ""}
                ${direction === "right" ? "translate-x-10 opacity-50" : ""}
              `}
            >
              {products.slice(startIdx, endIdx).map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  className="no-underline"
                  key={product.id}
                >
                  <div className="product-item border rounded shadow flex flex-col items-center p-4 bg-white h-full">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mb-4 w-full h-40 sm:h-48 object-cover rounded"
                    />
                    <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mb-2 text-center">
                      Price: ₹{product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={!canGoRight}
            className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label="Next"
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductList() {
  return (
    <Routes>
      <Route path="/" element={<AllProducts />} />
      <Route path=":id" element={<Pdp />} />
    </Routes>
  );
}

export default ProductList;