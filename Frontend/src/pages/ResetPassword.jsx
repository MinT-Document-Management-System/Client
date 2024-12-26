import React, { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import Logo from "../assets/Logo.jpg";
import axios from "axios";
import { base_url } from "../utils/baseUrl";

import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function ResetPassword() {
  const navigate = useNavigate()
   const [PasswordData, setPasswordData] = useState({
    
    email: '',
    old_password: '',
    new_password: '',
    confirm_password: ''
         
        })
        const handleChangePassword = async () => {
          
          
          try {
            if (PasswordData.new_password !== PasswordData.confirm_password) {
                toast.error("New password and confirm password must match!");
                return; }
            const response = await axios.post(`${base_url}user/reset_password`,PasswordData);
            console.log(response.data)
            if (response.data.success==true){
              toast.success('You are Change the password successfully!');
              navigate("/login");
            }
            else{
              toast.success('Temopory password or email is incorrect')
              navigate("/")
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
    setPasswordData({
      ...PasswordData,
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
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🔒 Reset Your Password</h1>

            <label className="flex items-center border rounded-md p-4 bg-gray-50">
              <FaEnvelope className="text-gray-500 mr-3 text-xl" />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="outline-none w-full text-lg"
                value={PasswordData.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="flex items-center border rounded-md p-4 bg-gray-50">
              <FaKey className="text-gray-500 mr-3 text-xl" />
              <input
                name="old_password"
                type="password"
                placeholder="Old Password"
                className="outline-none w-full text-lg"
                value={PasswordData.old_password}
                onChange={handleInputChange} 
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="flex items-center border rounded-md p-4 bg-gray-50">
              <FaKey className="text-gray-500 mr-3 text-xl" />
              <input
                name="new_password"
                type="password"
                placeholder="New Password"
                className="outline-none w-full text-lg"
                value={PasswordData.new_password}
                onChange={handleInputChange} 
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="flex items-center border rounded-md p-4 bg-gray-50">
              <FaKey className="text-gray-500 mr-3 text-xl" />
              <input
                name="confirm_password"
                type="confirm_password"
                placeholder="Confirm Password"
                className="outline-none w-full text-lg"
                value={PasswordData.confirm_password}
                onChange={handleInputChange} 
              />
            </label>
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-600 transition"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
