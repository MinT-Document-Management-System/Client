import React, { useState } from 'react';
import axios from 'axios';

const AddNewDepartment = () => {
  const [formData, setFormData] = useState({
    DepartmentName: '',
    officeNo: '',
    DepartmentId: '',
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
      
      alert('Department added successfully!');
      setFormData({
        DepartmentName: '',
        officeNo: '',
        DepartmentId: '',
      });
      axios.post("http://localhost:3000/api/departments",formData)
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
        <h1 className="text-xl font-bold mb-4">Add a New Department</h1>
        <div className="flex flex-col gap-4">
          <input
            name="DepartmentName"
            value={formData.DepartmentName}
            onChange={handleInputChange}
            className="border p-6 rounded"
            placeholder="Department Name"
            required
          />
          <input
            name="DepartmentId"
            value={formData.DepartmentId}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder="Department ID"
            required
          />
          <input
            name="officeNo"
            value={formData.officeNo}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder="Office Number"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700"
        >
          Create A New Department
        </button>
      </form>
    </div>
  );
};

export default AddNewDepartment;
