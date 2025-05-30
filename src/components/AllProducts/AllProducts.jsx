import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Example filter options (customize as per your data)
const categories = ["All", "Mobiles", "Laptops", "Accessories"];
const brands = ["All", "Apple", "Samsung", "OnePlus", "Dell", "HP"];
const LIMIT_PER_PAGE = 6;

function AllProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = React.useState([]);
  const [totalPages, setTotalPages] = useState(1);
  // Search & Filters
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/products?skip=${
            (currentPage - 1) * LIMIT_PER_PAGE
          }&limit=${LIMIT_PER_PAGE}&search=${search}&category=${selectedCategory}`
        );
        const data = await response.json();
        setProducts(data.products || []);
        setTotalPages(Math.ceil(data.count / LIMIT_PER_PAGE));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, search, selectedCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on filter/search change
  }, [search, selectedCategory, selectedBrand]);

  // FE logic for filtering products
  // const filteredProducts = products.filter((product) => {
  //   const matchesSearch =
  //     search === "" ||
  //     product.name.toLowerCase().includes(search.toLowerCase()) ||
  //     product.brand.toLowerCase().includes(search.toLowerCase());

  //   return matchesSearch;
  // });

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          All Products
        </h1>
        {/* Filters & Search */}
        <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Category and Brand in a horizontal row */}
          <div className="flex flex-row gap-3 sm:gap-4 w-full">
            <div className="w-1/2">
              <label className="block mb-1 font-semibold text-sm">
                Category
              </label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={selectedCategory}
                onChange={(e) => {console.log(e.target.value); setSelectedCategory(e.target.value);}}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block mb-1 font-semibold text-sm">Brand</label>
              <select
                className="border rounded px-3 py-2 w-full"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                {brands.map((brand) => (
                  <option key={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Search below */}
          <div>
            <label className="block mb-1 font-semibold text-sm">Search</label>
            <input
              type="text"
              className="border rounded px-3 py-2 w-full"
              placeholder="Search products..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setCurrentPage(1);
                  setSearch(e.target.value.trim());
                }
              }}
            />
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {products.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 py-8">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded shadow p-3 sm:p-4 flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-3 sm:mb-4 w-full h-40 sm:h-48 object-contain rounded"
                />
                <h2 className="text-base sm:text-lg font-semibold mb-1 text-center">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-1 text-center text-sm sm:text-base">
                  {product.brand}
                </p>
                <p className="text-blue-700 font-bold mb-2 text-center text-base sm:text-lg">
                  ₹{product.price}
                </p>
                <Link
                  to={`/products/${product.id}`}
                  className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 w-full text-center text-sm sm:text-base"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-6 sm:mt-8 gap-2">
            <button
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage((p) => p - 1);
                }
              }}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {/* Page numbers (optional, uncomment if needed)
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                className={`px-3 py-1 rounded border ${
                  currentPage === idx + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))} */}
            <button
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage((p) => p + 1);
                }
              }}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
