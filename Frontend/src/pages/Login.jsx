import React, { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import Logo from "../assets/Logo.jpg";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

function Login() {
  const navigate = useNavigate()
   const [UserLogInData, setUserLogInData] = useState({
    
    email: '',
    password: '',
         
        })
        const handleLogin = async () => {
          try {
            const response = await axios.post(`${base_url}user/login`,UserLogInData);
            console.log(response);
            console.log(response.data)
            if (response.status==200){
              localStorage.setItem('token', response.data);
              toast.success('You are logged in successfully!');
              const decodedToken = jwtDecode(response.data);
              localStorage.setItem('user_id', decodedToken.user_id);
              localStorage.setItem('full_name', decodedToken.full_name);
              localStorage.setItem('email', decodedToken.email);
              navigate("/");
            }
            else{
              toast.success('your password or email is incorrect')
              navigate("/login")
            }
            
           
          } catch (error) {
            toast.error('your password or email is incorrect');
            console.log(response.error)
          
            if (error.response) {
              console.error('Error:', error.response.data);

            }  else {
              console.error('Error', error.message);
            }
            toast.error('your password or email is incorrect');
           
          }
        };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserLogInData({
      ...UserLogInData,
      [name]: value,
    });
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
                name="email"
                type="email"
                placeholder="Email"
                className="outline-none w-full text-lg"
                value={UserLogInData.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="flex items-center border rounded-md p-4 bg-gray-50">
              <FaKey className="text-gray-500 mr-3 text-xl" />
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="outline-none w-full text-lg"
                value={UserLogInData.password}
                onChange={handleInputChange} 
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
