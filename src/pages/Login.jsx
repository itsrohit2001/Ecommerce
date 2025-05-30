import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Create Account" : "Sign In to Bandage"}
        </h2>
        <form className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          {!isRegister && (
            <Link to="#" className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </Link>
          )}
          <button
            className="text-blue-500 text-sm hover:underline ml-auto"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center">
          <span className="text-gray-400 text-sm">or continue with</span>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button className="border rounded-full p-2 hover:bg-gray-100">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          </button>
          <button className="border rounded-full p-2 hover:bg-gray-100">
            <img src="https://www.svgrepo.com/show/448234/facebook.svg" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;