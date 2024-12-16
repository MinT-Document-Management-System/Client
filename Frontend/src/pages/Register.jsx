import {React,useEffect,useState} from 'react'
import axios from "axios";


const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        employeeId: '',
        email: '',
        phoneNumber: '',
        department: '',
        position: '',
      });
      const [department,setDepartment]=useState([])
      useEffect(() => {
        setDepartment([
          "Human Resources",
          "Finance",
          "Marketing",
          "Compliance",
          "Business Development",
        ]);
      }, []);
    
      
      // useEffect=(()=>{
      //   axios.get("http://localhost:3000/api/departments")
      //        .then(response=>{
      //         setDepartment(response.data)
      //        })
      //        .catch((err)=>{
              
      //         console.log(err)
      //        })


      // },[])

    

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleOnSubmit = (e) => {
        e.preventDefault(); 
        console.log('Form Data:', formData);
      
      };
    
      return (
        <div className="p-4 max-w-5xl mx-auto">
          <form onSubmit={handleOnSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-xl font-bold mb-4">Add a New USER Account</h1>
            <div className="flex flex-col gap-4">
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Full Name"
                required
              />
              <input
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Username"
                required
              />
              <input
                name="employeeId"
                value={formData.employeeId}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Employee ID"
                required
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Email Address"
                required
              />
              <input
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Phone Number"
                required
              />
              <select
               name="department"
               value={formData.department}
               onChange={handleInputChange}
               className="border p-2 rounded"
               required>
                <option value="">Select Department</option>
                {department.map((department, index) => (
                   <option key={index} value={department}>
                    {department}
                    </option>))}
              </select>
              <input
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Position"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-700"
            >
              Create User
            </button>
          </form>
        </div>
      );
    };
    
    export default Register;
