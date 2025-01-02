import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';

const AddNewDepartment = () => {
  const [formData, setFormData] = useState({
    department_name: '',
    department_head_id: '',
    department_description: "",
    
  });
  const [Users,setUsers]=useState([])

  useEffect(() => {
    axios
      .get(`${base_url}user/get_all_users`)
      .then(response => {
        console.log(response)
        if (response.status==200) {
          const AllUsers = response.data.map(user => user.full_name);
          console.log(AllUsers)
          setUsers(AllUsers);
        }
      })
      .catch(err => console.error('Error fetching departments:', err));
  }, []);

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
      
      axios.post(`${base_url}department/add_department`,formData)
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
            name="department_name"
            value={formData.department_name}
            onChange={handleInputChange}
            className="border p-6 rounded"
            placeholder="Department Name"
            required
          />
          <textarea
            name="department_description"
            value={formData.department_description}
            onChange={handleInputChange}
            className="border p-2 rounded"
            placeholder="Department Description"
            rows={4} 
            required
          />


          <select
               name="department_head_id"
               value={formData.department_head_id}
               onChange={handleInputChange}
               className="border p-2 rounded"
               required>
                <option value="">Select Head</option>
                {Users.map((user, index) => (
                   <option key={index} value={user}>
                    {user}
                    </option>))}
            </select>
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
