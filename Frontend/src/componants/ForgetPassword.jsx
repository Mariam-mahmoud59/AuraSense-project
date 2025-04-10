import React, { useState } from "react";
import axios from "axios";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/reset-password/", { email });
      setMessage("Reset link sent to your email.");
    } catch (error) {
      setMessage("Email not found.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        {message && <p className="mb-4 text-red-500">{message}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
