import React, { useState } from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import Logo from "../assets/Logo.jpg";
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function FrogotPassword() {
  const navigate = useNavigate()
   const [UserData, setUserData] = useState({
    
    email: ''
         
        })
        const handleResetPassword = async () => {
          try {
            const response = await axios.post(`${base_url}user/reset_password`,UserData);
            console.log(response.data)
            if (response.data.success==true){
            toast.success('please check your email addrase')
             
              navigate("/emailMessage");
            }
            else{
              toast.success('your password or email is incorrect')
              window.location.reload()
              
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
    setUserData({
      ...UserData,
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
                value={UserData.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
         
          
          {/* Login Button */}
          <button
            onClick={handleResetPassword}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-600 transition"
          >
            ReSet Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrogotPassword;