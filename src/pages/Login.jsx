import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Toast({ message, onClose, isSuccess = false }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed z-50 flex items-center gap-2 px-6 py-3 text-white transform -translate-x-1/2 rounded shadow-lg top-6 left-1/2 animate-fade-in ${
        isSuccess ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <span className="font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-lg font-bold leading-none hover:text-gray-200"
      >
        &times;
      </button>
    </div>
  );
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [formData, setFormData] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  const closeToast = () => {
    setToastMessage("");
  };

  const requestOtp = async () => {
    try {
      if (!formData.email) {
        setIsSuccessToast(false);
        setToastMessage("Email address is required");
        return;
      }
      if (!validateEmail(formData.email)) {
        setIsSuccessToast(false);
        setToastMessage("Invalid email address");
        return;
      }
      const res = await fetch("/api/user/request-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (res.ok) {
        setIsSuccessToast(true);
        setToastMessage("Email Sent Successfully");
      } else {
        setIsSuccessToast(false);
        setToastMessage("Failed to Send OTP! Please Retry Again");
      }
    } catch (error) {
      setIsSuccessToast(false);
      setToastMessage("Failed to Send OTP! Please Retry Again");
    }
  };

  return (
    <div className="flex items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">
          {isRegister ? "Create Account" : "Sign In to Bandage"}
        </h2>
        <form className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {isRegister && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  requestOtp();
                }}
                className="absolute flex items-center justify-center px-4 py-0.5 mt-2 text-sm font-medium text-white transition-all -translate-y-1/2 bg-blue-500 rounded shadow top-1/2 right-2 hover:underline hover:bg-blue-600"
              >
                Request otp
              </button>
            )}
          </div>

          {(!isRegister || isVerified) && (
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          {isRegister && isVerified && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          <button
            className="w-full py-2 text-white transition bg-blue-500 rounded hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              alert("user does not exist");
            }}
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="flex items-center justify-between mt-4">
          {!isRegister && (
            <Link to="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          )}
          <button
            className="ml-auto text-sm text-blue-500 hover:underline"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
        <div className="flex items-center justify-center mt-6">
          <span className="text-sm text-gray-400">or continue with</span>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="p-2 border rounded-full hover:bg-gray-100">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="p-2 border rounded-full hover:bg-gray-100">
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={closeToast}
          isSuccess={isSuccessToast}
        />
      )}
    </div>
  );
}

export default Login;
