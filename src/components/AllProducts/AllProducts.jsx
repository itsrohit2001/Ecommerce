import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Example filter options (customize as per your data)
const categories = ["All", "Mobiles", "Laptops", "Accessories"];
const brands = ["All", "Apple", "Samsung", "OnePlus", "Dell", "HP"];
const LIMIT_PER_PAGE = 6;

const AllProducts = () => {
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
    <div className=" py-4 bg-gray-50 sm:py-8">
      <div className="px-2 mx-auto max-w-7xl sm:px-4">
        <h1 className="mb-4 text-2xl font-bold text-center sm:text-3xl sm:mb-6">
          All Products
        </h1>
        {/* Filters & Search */}
        <div className="flex flex-col gap-3 mb-6 sm:gap-4 sm:mb-8">
          {/* Category and Brand in a horizontal row */}
          <div className="flex flex-row w-full gap-3 sm:gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-semibold">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={selectedCategory}
                onChange={(e) => {console.log(e.target.value); setSelectedCategory(e.target.value);}}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-semibold">Brand</label>
              <select
                className="w-full px-3 py-2 border rounded"
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
            <label className="block mb-1 text-sm font-semibold">Search</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
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
        <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 sm:gap-8">
          {products.length === 0 ? (
            <div className="py-8 text-center text-gray-500 col-span-full">
              No products found.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center p-3 bg-white rounded shadow sm:p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-40 mb-3 rounded sm:mb-4 sm:h-48"
                />
                <h2 className="mb-1 text-base font-semibold text-center sm:text-lg">
                  {product.name}
                </h2>
                <p className="mb-1 text-sm text-center text-gray-600 sm:text-base">
                  {product.brand}
                </p>
                <p className="mb-2 text-base font-bold text-center text-blue-700 sm:text-lg">
                  ₹{product.price}
                </p>
                <Link
                  to={`/products/${product.id}`}
                  className="w-full px-3 py-2 text-sm text-center text-white bg-orange-500 rounded hover:bg-orange-600 sm:text-base"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6 sm:mt-8">
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
