import { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Cart is Empty</h2>
        <Link to="/products" className="text-blue-500 underline">
          Go to Products
        </Link>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + (item.price * (item.quantity || 1)),
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Your Cart</h1>
      <div className="bg-white rounded shadow p-2 sm:p-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-4 border-b py-4 last:border-b-0"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-contain rounded mb-2 sm:mb-0"
            />
            <div className="flex-1 w-full flex flex-col items-center sm:items-start">
              <h2 className="font-semibold text-center sm:text-left">{item.name}</h2>
              <p className="text-gray-600 text-center sm:text-left">{item.brand}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="font-bold text-blue-700 text-lg mt-2 sm:mt-0">
              ₹{item.price * (item.quantity || 1)}
            </div>
            <button
              className="ml-0 sm:ml-4 text-red-500 hover:underline cursor-pointer mt-2 sm:mt-0"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <span className="text-xl font-bold">Total: ₹{total}</span>
          <button
            className="w-full sm:w-auto bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition cursor-pointer"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;