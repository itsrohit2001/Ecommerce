import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContextProvider";

function Pdp() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?id=${id}`);
        const data = await response.json();
        if (!data) {
          setTimeout(() => {
            setLoading(false);
            setProduct(null);
            window.location.href = "/products";
          }, 3000);
        }
        setProduct(data);
        console.log("Products fetched successfully:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleQtyChange = (delta) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (qty > 0 && product) {
      setActionLoading(true);
      setTimeout(() => {
        addToCart({ ...product, quantity: qty });
        setActionLoading(false);
        setQty(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1200);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="inline-block w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="inline-block w-12 h-12 border-4 border-red-400 border-t-transparent rounded-full animate-spin mb-4"></span>
          <div className="text-xl font-semibold text-gray-600">
            Product does not exist
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 flex justify-center">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <div
          key={product.id}
          className="bg-white rounded shadow-lg flex flex-col md:flex-row gap-8 p-6"
        >
          {/* Product Image & Quantity */}
          <div className="flex-1 flex flex-col items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-72 h-72 object-contain mb-4"
            />
            <div className="flex gap-2">
              <button
                className="border px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
                disabled={qty <= 1}
                onClick={() => handleQtyChange(-1)}
              >
                -
              </button>
              <span className="px-4 py-1">{qty}</span>
              <button
                className="border px-4 py-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
                disabled={!product.inStock}
                onClick={() => handleQtyChange(1)}
              >
                +
              </button>
            </div>
          </div>
          {/* Product Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-1">
              Brand: <span className="font-semibold">{product.brand}</span>
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm font-semibold">
                {product.rating} ★
              </span>
              <span className="text-gray-500 text-sm">
                {product.reviews} Ratings & Reviews
              </span>
            </div>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-2xl font-bold text-blue-700">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="line-through text-gray-400">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-green-600 font-semibold">
                {product.discount}
              </span>
            </div>
            <ul className="mb-3">
              {product.highlights.map((h, i) => (
                <li key={i} className="text-gray-700 text-sm list-disc ml-5">
                  {h}
                </li>
              ))}
            </ul>
            <div className="mb-3">
              <span className="font-semibold">Available Offers:</span>
              <ul className="text-green-700 text-sm ml-5 mt-1">
                {product.offers.map((offer, i) => (
                  <li key={i}>• {offer}</li>
                ))}
              </ul>
            </div>
            <div className="mb-3">
              <span className="font-semibold">Delivery:</span>
              <span className="ml-2 text-gray-700">{product.delivery}</span>
            </div>
            <div className="mb-3">
              <span className="font-semibold">Warranty:</span>
              <span className="ml-2 text-gray-700">{product.warranty}</span>
            </div>
            <div className="mb-3">
              <span className="font-semibold">Seller:</span>
              <span className="ml-2 text-blue-700">{product.seller}</span>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className={`${
                  actionLoading ? "bg-orange-500" : "bg-orange-600"
                } text-white px-6 py-2 rounded font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2 cursor-pointer`}
                disabled={!product.inStock || actionLoading}
                onClick={handleAddToCart}
              >
                {actionLoading && (
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {actionLoading ? "Adding..." : "Add to Cart"}
              </button>
              <button
                className="bg-yellow-400 text-gray-900 px-6 py-2 rounded font-semibold hover:bg-yellow-500 transition cursor-pointer"
                disabled={!product.inStock}
              >
                Buy Now
              </button>
            </div>
            {!product.inStock && (
              <p className="text-red-600 mt-2 font-semibold">Out of Stock</p>
            )}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">
                Product Description
              </h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pdp;
