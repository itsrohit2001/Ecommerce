import { FaHeart, FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { MENU_LIST, LOGO_TEXT, LOGIN_TEXT } from "../../constants/constant";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContextProvider";
import React from "react";

function Header() {
  const { cartItems } = useContext(CartContext);
  const cartItemCount = cartItems.reduce(
    (count, item) => count + (item.quantity || 1),
    0
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search state
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchValue.trim())}`);
      setShowSearch(false);
      setSearchValue("");
    }
  };

  // Hide search input on route change
  React.useEffect(() => {
    setShowSearch(false);
    setSearchValue("");
  }, [location.pathname]);

  return (
    <div className="flex justify-center items-center w-full bg-white shadow">
      <header className="header w-full max-w-7xl flex justify-between items-center py-4 px-4 md:px-8">
        {/* Logo */}
        <div className="logo flex-shrink-0">
          <Link to="/" className="text-2xl font-bold text-black-600 hover:text-blue-400">
            {LOGO_TEXT}
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:block">
          <ul className="flex gap-6">
            {MENU_LIST.map((menu) => (
              <li key={menu.id} className="hover:text-blue-400">
                <Link to={`/${menu.name.toLowerCase()}`}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-gray-600 hover:text-blue-400">
            <Link to="/login">{LOGIN_TEXT}</Link>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Icon and Input */}
            <div className="relative">
              <FaSearch
                className="text-gray-400 hover:text-blue-400 cursor-pointer"
                onClick={() => setShowSearch((prev) => !prev)}
              />
              {/* {showSearch && (
                <form
                  onSubmit={handleSearch}
                  className="absolute right-0 top-8 bg-white shadow rounded flex items-center px-2 py-1 z-50 w-56"
                >
                  <input
                    type="text"
                    className="border-none outline-none flex-1 px-2 py-1 text-sm"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="ml-2 text-blue-500 font-semibold"
                  >
                    Go
                  </button>
                </form>
              )} */}
            </div>
            <div className="relative flex items-center">
              <Link to="/cart">
                <FaShoppingCart
                  className={`cursor-pointer ${
                    cartItems.length > 0
                      ? "text-red-500"
                      : "text-gray-400 hover:text-blue-400"
                  }`}
                />
                {cartItemCount > 0 && (
                  <span
                    className="absolute -right-3 top-1 text-base font-semibold"
                    style={{ background: "none", color: "black" }}
                  >
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
            <FaHeart className="text-gray-400 hover:text-blue-400 cursor-pointer" />
          </div>
          {/* Hamburger for mobile */}
          <button
            className="lg:hidden ml-2 text-2xl text-gray-600"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex flex-col">
            <div className="bg-white w-4/5 max-w-xs h-full p-6 flex flex-col shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <Link
                  to="/"
                  className="text-2xl font-bold text-black-600 hover:text-blue-400"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {LOGO_TEXT}
                </Link>
                <button
                  className="text-2xl text-gray-600"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>
              {/* Mobile Search */}
              <form
                onSubmit={(e) => {
                  handleSearch(e);
                  setMobileMenuOpen(false);
                }}
                className="mb-6 flex items-center gap-2"
              >
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full text-sm"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
                >
                  Go
                </button>
              </form>
              <nav>
                <ul className="flex flex-col gap-6">
                  {MENU_LIST.map((menu) => (
                    <li key={menu.id}>
                      <Link
                        to={`/${menu.name.toLowerCase()}`}
                        className="text-lg hover:text-blue-400"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {menu.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-8 flex flex-col gap-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-400 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {LOGIN_TEXT}
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaShoppingCart
                    className={`${
                      cartItems.length > 0
                        ? "text-red-500"
                        : "text-gray-400 hover:text-blue-400"
                    }`}
                  />
                  Cart
                  {cartItemCount > 0 && (
                    <span className="ml-1 font-semibold text-black">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
            {/* Click outside to close */}
            <div
              className="flex-1"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;