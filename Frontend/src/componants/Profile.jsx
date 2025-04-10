// This is the profile page displayed after successful login. It shows the user's information.

import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; //  import context

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); //  get user and setUser from context

  useEffect(() => {
    if (!user) {
      navigate("/login"); //  redirect if user not found
    }
  }, [user, navigate]);

  const handleLogout = () => {
    //  clear everything
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      {user ? (
        <div className="space-y-3">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
