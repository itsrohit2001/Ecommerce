import React, { useEffect } from "react";
import { ProductListUI } from "../ProductList/ProductList";
import { Link } from "react-router-dom";

export function FeaturedProduct() {
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
    <div className="flex justify-center items-center flex-col gap-8 p-8 bg-gray-50">
         <ProductListUI products={products} />
         <Link to={"/products"} className="text-white bg-orange-500 hover:bg-orange-600 py-3 px-6 rounded full shadow-lg flex items-center gap-2 animate-bounce hover:animate-none">View More</Link>
    </div>
    );
}
