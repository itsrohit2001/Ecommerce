import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="flex flex-col items-center">
      <span className="w-16 h-16 border-4 border-blue-400 rounded-full shadow-lg border-t-transparent animate-spin"></span>
      <span className="mt-4 text-lg font-semibold text-blue-700 drop-shadow">
        Loading...
      </span>
    </div>
  </div>
);

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
  // const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [isSuccessToast, setIsSuccessToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // const location = useLocation();

  // prefill email if coming from registration page
  // This will only prefill if the email is passed in the location state
  // useEffect(() => {
  //   if (location.state && location.state.email) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       email: location.state.email,
  //       password: "", // Ensure password is not prefilled
  //     }));
  //   }
  // }, [location.state]);

  const closeToast = () => {
    setToastMessage("");
  };

  const requestOtp = async () => {
    setIsLoading(true);
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
        setOtpSent(true);
      } else {
        setIsSuccessToast(false);
        setToastMessage("Failed to Send OTP! Please Retry Again");
      }
    } catch (error) {
      setIsSuccessToast(false);
      setToastMessage("Failed to Send OTP! Please Retry Again");
    } finally {
      setIsLoading(false);
      // setFormData({ ...formData, otp: "" }); // Reset OTP field
    }
  };

  const registerUser = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSuccessToast(true);
        setToastMessage("Registration Successful");
        // Reset form data after successful registration and landing on login page
        setTimeout(() => {
          setIsRegister(false); // Switch to login mode
          setFormData({ email: formData.email }); // Prefill email, clear password i.e., instead of password= "" remove password and confirmPassword from formData
          setOtpSent(false);
        }, 1500);
      } else {
        const errorData = await res.json();
        if (errorData.message) {
          setToastMessage(errorData.message);
        } else {
          setToastMessage("Registration Failed");
        }
        setIsSuccessToast(false);
      }
    } catch (error) {
      setIsSuccessToast(false);
      setToastMessage(error.message || "Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("accessToken", data.accessToken);
        console.log("Login Response:", data);
        setIsSuccessToast(true);
        setToastMessage("Login Successful");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        const errorData = await res.json();
        if (errorData.message) {
          setToastMessage(errorData.message);
        } else {
          setToastMessage("Login Failed");
        }
        setIsSuccessToast(false);
      }
    } catch (error) {
      setIsSuccessToast(false);
      setToastMessage(error.message || "Login Failed");
    } finally {
      setIsLoading(false);
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
              className="w-full px-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
            />
          )}
          {isRegister ? (
            <div className="relative flex items-center">
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  requestOtp();
                }}
                className="absolute right-2 px-4 py-1.5 text-sm font-medium text-white bg-blue-500 rounded-lg shadow  hover:bg-blue-600"
              >
                Request OTP
              </button>
            </div>
          ) : (
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
            />
          )}
          {isRegister && otpSent && (
            <input
              type="number"
              placeholder="OTP"
              className="w-full px-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
            />
          )}
          {(!isRegister || otpSent) && (
            <div className="relative flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <span
                className="absolute text-gray-400 cursor-pointer right-4 hover:text-blue-500"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
                role="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          )}
          {isRegister && otpSent && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/50"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          )}
          <button
            className={`w-full py-3 text-lg font-semibold text-white  bg-blue-500 rounded-lg shadow bg-gradient-to-r focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 hover:bg-blue-600 ${
              !formData.email ||
              !formData.password ||
              (isRegister &&
                (!otpSent ||
                  !formData.otp ||
                  !formData.password ||
                  !formData.confirmPassword))
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (isRegister) {
                registerUser();
              } else {
                loginUser();
              }
            }}
            type="submit"
            disabled={
              !formData.email ||
              (isRegister &&
                (!otpSent ||
                  !formData.otp ||
                  !formData.password ||
                  !formData.confirmPassword))
            }
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          {!isRegister && (
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
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
          <button className="p-2 bg-white border border-blue-100 rounded-full shadow hover:bg-blue-50">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </button>
          <button className="p-2 bg-white border border-blue-100 rounded-full shadow hover:bg-blue-50">
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
      {isLoading && <Loader />}
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
