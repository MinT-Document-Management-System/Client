import React, { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import Logo from "../assets/Logo.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const mockUser = {
    email: "test@example.com",
    password: "password123",
  };
  const handleLogin = () => {
    if (email === mockUser.email && password === mockUser.password) {
      window.location.href = "/";
      alert("Login successful!");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div
      className="flex h-screen"
      style={{ backgroundColor: "#FFB27D" }} 
    >
   
      <div className="w-1/6 bg-blue-green">
        <div className="flex items-center justify-center h-full text-white font-bold text-3xl">
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className=" p-12 rounded-lg  w-3/5 max-w-xl">
          <img
  src={Logo}
  alt="Logo"
  className="w-55 h-55 rounded-full object-cover p-4 mx-auto" 
/>
          <div className="mb-6">
            <label className="flex items-center border rounded-md p-4 bg-gray-50">
              <FaEnvelope className="text-gray-500 mr-3 text-xl" />
              <input
                type="email"
                placeholder="Email"
                className="outline-none w-full text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="flex items-center border rounded-md p-4 bg-gray-50">
              <FaKey className="text-gray-500 mr-3 text-xl" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none w-full text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </label>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-200"
              />
              <span className="ml-2 text-lg text-gray-600">Remember me</span>
            </label>
            <button className="text-lg text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-600 transition"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
