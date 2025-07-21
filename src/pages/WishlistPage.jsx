import { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";
import { Link, useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!wishlistItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="flex flex-col items-center p-10 shadow-2xl bg-white/90 rounded-2xl">
          <h2 className="mb-4 text-3xl font-extrabold text-center text-blue-700 drop-shadow">
            Your Wishlist is Empty
          </h2>
          <Link
            to="/products"
            className="px-6 py-2 mt-2 font-semibold text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-2 py-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-4xl p-4 shadow-2xl bg-white/90 rounded-2xl sm:p-8">
        <h1 className="mb-8 text-3xl font-extrabold text-center text-pink-600 drop-shadow">
          Your Wishlist
        </h1>
        <div>
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center gap-6 py-6 border-b border-blue-100 sm:flex-row last:border-b-0 hover:bg-pink-50/40 rounded-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="object-contain bg-white border-2 border-pink-100 shadow w-28 h-28 rounded-xl"
              />
              <div className="flex flex-col items-center flex-1 w-full sm:items-start">
                <h2 className="text-lg font-bold text-center text-blue-700 sm:text-left">{item.name}</h2>
                <p className="text-center text-gray-500 sm:text-left">{item.brand}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="px-4 py-1 font-semibold text-pink-600 rounded bg-pink-50">
                    ₹{item.price}
                  </span>
                </div>
              </div>
              <button
                className="mt-4 ml-0 font-semibold text-blue-500 sm:ml-4 hover:text-blue-700 sm:mt-0"
                onClick={() => {
                  addToCart({ ...item, quantity: 1 });
                  removeFromWishlist(item.id);
                  // You could use <Link> for navigation, but since this is inside an onClick handler (not render), useNavigate is the correct approach.
                  // If you want to avoid navigate, you could set a state and conditionally render <Navigate to="/cart" />, but that's more complex.
                  // <Link> cannot be used here directly.
                  navigate("/cart");
                }}
              >
                Move to Cart
              </button>
              <button
                className="mt-4 ml-0 font-semibold text-red-500 sm:ml-4 hover:text-red-700 sm:mt-0"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 mt-8 sm:flex-row">
          <Link
            to="/products"
            className="w-full px-8 py-3 text-lg font-bold text-white bg-blue-500 rounded-lg shadow sm:w-auto hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;