import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';

const AddNewRole = () => {
  const [formData, setFormData] = useState({
    role_name: '',
    role_description: "",
    
  });
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    try {
      
      alert('Role added successfully!');
      
      axios.post(`${base_url}role/add_role`,formData)
        .then((response)=>{
            console.log(response.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <form
        onSubmit={handleOnSubmit}
        className="bg-white shadow-md rounded px-10 pt-6 pb-10 mb-4"
      >
        <h1 className="text-xl font-bold mb-4">Add a New Role</h1>
        <div className="flex flex-col gap-4">
          <input
            name="role_name"
            value={formData.role_name}
            onChange={handleInputChange}
            className="border p-6 rounded"
            placeholder="Role Name"
            required
          />
          <textarea
            name="role_description"
            value={formData.role_description}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder="Role Description"
            rows={4} 
            required
          />


         
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700"
        >
          Create A New Role
        </button>
      </form>
    </div>
  );
};

export default AddNewRole;
