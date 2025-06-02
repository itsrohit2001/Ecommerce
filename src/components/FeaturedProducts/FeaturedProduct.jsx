import React, { useEffect } from "react";
import { ProductListUI } from "../ProductList/ProductList";
import { Link } from "react-router-dom";

export const FeaturedProduct = () => {
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products/popular?count=5`);
        const data = await response.json();
        setProducts(data);
        console.log("Products fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return(
    <div className="flex flex-col items-center justify-center gap-8 p-8 bg-gray-50">
         <ProductListUI products={products} />
         <Link to={"/products"} className="flex items-center gap-2 px-6 py-3 text-white bg-orange-500 rounded shadow-lg hover:bg-orange-600 full animate-bounce hover:animate-none">View More</Link>
    </div>
    );
}
