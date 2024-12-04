import { React, useEffect, useState } from 'react';
import axios from 'axios';

const AddNewDeprtment = () => {
  const [formData, setFormData] = useState({
    DepartmentName: '',
    offoceNo: "",
    DepartmentId: '',
   
  

  
  });
  const [department, setDepartment] = useState([]);

 

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
      // Assuming you're sending this data to a backend
    //   const response = await axios.post('your-api-endpoint', formData)
      setFormData({
        DepartmentName: '',
        offoceNo: "",
        DepartmentId: ''

      
    } catch (error) {
     
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form.');
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleOnSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-xl font-bold mb-4">Add a New USER Account</h1>
        <div className="flex flex-col gap-4">
          <input
            name="DepartmentName"
            value={formData.DepartmentName}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder="Department Name"
            required
          />
        
          <input
            name="employeeId"
            value={formData.DepartmentId}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder="Employee ID"
            required
          />
        
         
          
          <input
            name="offoceNo"
            value={formData.offoceNo}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder="offoce Number"
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
}
export default AddNewDeprtment
