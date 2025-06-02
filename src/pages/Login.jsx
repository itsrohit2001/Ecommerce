import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Toast = ({ message, onClose, isSuccess = false }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed z-50 flex items-center gap-2 px-6 py-3 text-white transform -translate-x-1/2 rounded-xl shadow-2xl top-6 left-1/2 animate-fade-in ${
        isSuccess ? "bg-green-500" : "bg-red-500"
      }`}
      style={{
        border: isSuccess ? "2px solid #22c55e" : "2px solid #ef4444",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        backdropFilter: "blur(4px)",
      }}
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
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Login = () => {
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
    <div className="flex items-center justify-center p-8 bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200">
      <div className="w-full max-w-md p-10 border border-blue-100 shadow-2xl bg-white/90 rounded-3xl backdrop-blur-md">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-blue-700 drop-shadow">
          {isRegister ? (
            <>
              Create <span className="text-purple-500">Account</span>
            </>
          ) : (
            <>
              Sign In to <span className="text-purple-500">Bandage</span>
            </>
          )}
        </h2>
        <form className="space-y-5">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 transition border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
            />
          )}
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 transition border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
            />
            {isRegister && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  requestOtp();
                }}
                className="absolute right-2 px-4 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-lg shadow  hover:bg-blue-600"
                style={{
                  boxShadow: "0 2px 8px 0 rgba(59,130,246,0.10)",
                  minWidth: 100,
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                Request OTP
              </button>
            )}
          </div>

          {(!isRegister || isVerified) && (
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 transition border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
            />
          )}
          {isRegister && isVerified && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 transition border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
            />
          )}
          <button
            className="w-full py-3 text-lg font-semibold text-white transition bg-blue-500 rounded-lg shadow bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              alert("user does not exist");
            }}
            type="submit"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          {!isRegister && (
            <Link to="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          )}
          <button
            className="text-sm font-semibold text-purple-600 hover:underline"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <span className="text-sm text-gray-400">or continue with</span>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="p-2 transition bg-white border border-blue-100 rounded-full shadow hover:bg-blue-50">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="p-2 transition bg-white border border-blue-100 rounded-full shadow hover:bg-blue-50">
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
};

export default Login;
