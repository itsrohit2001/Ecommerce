import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContextProvider";

const Pdp = () => {
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
        <span className="inline-block w-12 h-12 border-4 border-blue-400 rounded-full border-t-transparent animate-spin"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <span className="inline-block w-12 h-12 mb-4 border-4 border-red-400 rounded-full border-t-transparent animate-spin"></span>
          <div className="text-xl font-semibold text-gray-600">
            Product does not exist
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-8 bg-gray-50">
      <div className="flex flex-col max-w-5xl gap-12 mx-auto">
        <div
          key={product.id}
          className="flex flex-col gap-8 p-6 bg-white rounded shadow-lg md:flex-row"
        >
          {/* Product Image & Quantity */}
          <div className="flex flex-col items-center flex-1">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain mb-4 w-72 h-72"
            />
            <div className="flex gap-2">
              <button
                className="px-4 py-1 bg-gray-100 border rounded cursor-pointer hover:bg-gray-200"
                disabled={qty <= 1}
                onClick={() => handleQtyChange(-1)}
              >
                -
              </button>
              <span className="px-4 py-1">{qty}</span>
              <button
                className="px-4 py-1 bg-gray-100 border rounded cursor-pointer hover:bg-gray-200"
                disabled={!product.inStock}
                onClick={() => handleQtyChange(1)}
              >
                +
              </button>
            </div>
          </div>
          {/* Product Details */}
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>
            <p className="mb-1 text-gray-600">
              Brand: <span className="font-semibold">{product.brand}</span>
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm font-semibold">
                {product.rating} ★
              </span>
              <span className="text-sm text-gray-500">
                {product.reviews} Ratings & Reviews
              </span>
            </div>
            <div className="flex items-end gap-3 mb-3">
              <span className="text-2xl font-bold text-blue-700">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-gray-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="font-semibold text-green-600">
                {product.discount}
              </span>
            </div>
            <ul className="mb-3">
              {product.highlights.map((h, i) => (
                <li key={i} className="ml-5 text-sm text-gray-700 list-disc">
                  {h}
                </li>
              ))}
            </ul>
            <div className="mb-3">
              <span className="font-semibold">Available Offers:</span>
              <ul className="mt-1 ml-5 text-sm text-green-700">
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
                } text-white px-6 py-2 rounded font-semibold bg-orange-400 hover:bg-orange-600 transition flex items-center justify-center gap-2 cursor-pointer`}
                disabled={!product.inStock || actionLoading}
                onClick={handleAddToCart}
              >
                {actionLoading && (
                  <span className="inline-block w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                )}
                {actionLoading ? "Adding..." : "Add to Cart"}
              </button>
              <button
                className="px-6 py-2 font-semibold text-gray-900 transition bg-yellow-400 rounded cursor-pointer hover:bg-yellow-500"
                disabled={!product.inStock}
              >
                Buy Now
              </button>
            </div>
            {!product.inStock && (
              <p className="mt-2 font-semibold text-red-600">Out of Stock</p>
            )}
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold">
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
