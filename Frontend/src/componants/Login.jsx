import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // ⬅️ Add Link
import { UserContext } from "../context/UserContext";

export default function Login() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("http://localhost:8000/api/login/", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      setUser(response.data.user);

      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {message && <p className="mb-4 text-red-500">{message}</p>}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" className="border w-full p-2 rounded" required />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Password</label>
          <input type="password" name="password" className="border w-full p-2 rounded" required />
        </div>

        {/* 🔗 Add Forget Password link */}
        <div className="mb-4 text-right">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
