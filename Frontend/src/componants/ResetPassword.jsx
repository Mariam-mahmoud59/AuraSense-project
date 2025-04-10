import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react"; 


export default function ResetPassword() {
    const { uidb64, token } = useParams(); // get uid and token from URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    console.log("UID:", uidb64);
    console.log("Token:", token);
  }, [uidb64, token]);
  

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/api/reset-password/${uidb64}/${token}/`, {
        
  new_password: password,
  confirm_password: confirmPassword,
});

      setMessage("Password reset successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Invalid or expired link.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <input
          type="password"
          placeholder="New password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          className="w-full p-2 border rounded mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
          Reset Password
        </button>
      </form>
    </div>
  );
}
