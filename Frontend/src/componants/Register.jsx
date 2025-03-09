import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function signin(values) {
    if (values.password !== values.confirm_password) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        values,
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("Registration successful! Redirecting...");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      console.error("Registration Error:", error.response?.data);
      setMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }
  }

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: signin,
  });

  return (
    <div className="flex md:flex-row flex-col-reverse justify-evenly pt-24 py-5 gap-2 bg-transparent">
      <form onSubmit={form.handleSubmit} className="w-1/2">
        <h2 className="font-bold text-4xl mb-2">Get Started Shopping</h2>
        <p className="mb-4 text-gray-600">Welcome to FreshCart! Enter your details to sign up.</p>

        {message && <p className="mb-4 text-center text-red-500">{message}</p>}

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 font-medium">Name</label>
          <input type="text" id="name" className="border rounded-lg block w-full p-2.5" required {...form.getFieldProps("name")} />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 font-medium">Email</label>
          <input type="email" id="email" className="border rounded-lg block w-full p-2.5" required {...form.getFieldProps("email")} />
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 font-medium">Phone</label>
          <input type="tel" id="phone" className="border rounded-lg block w-full p-2.5" required {...form.getFieldProps("phone")} />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 font-medium">Password</label>
          <input type="password" id="password" className="border rounded-lg block w-full p-2.5" required {...form.getFieldProps("password")} />
        </div>

        <div className="mb-5">
          <label htmlFor="confirm_password" className="block mb-2 font-medium">Confirm Password</label>
          <input type="password" id="confirm_password" className="border rounded-lg block w-full p-2.5" required {...form.getFieldProps("confirm_password")} />
        </div>

        <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-5 py-2.5 w-full">
          Signup
        </button>
      </form>
    </div>
  );
}
