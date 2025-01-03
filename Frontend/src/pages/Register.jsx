import {React,useEffect,useState} from 'react'
import { base_url } from '../utils/baseUrl';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const Register = () => {
  const navigate= useNavigate()
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        email: '',
        phone_number: '',
        department_name: '',
        role_name: '',
      });
      const [department,setDepartments]=useState([])
      const [Roles,setRoles]=useState([])
      const [isUsernameTaken, setIsUsernameTaken] = useState(false);
      const [usernameCheckLoading, setUsernameCheckLoading] = useState(false);
      useEffect(() => {
        const timeout = setTimeout(() => {
          if (formData.username.trim()) {
            checkUsernameAvailability();
          }
        }, 500); 
      
        return () => clearTimeout(timeout);
      }, [formData.username]);
      
      useEffect(() => {
        axios
          .get(`${base_url}department/get_all_departments/${1}/${100}`)
          .then(response => {
            console.log(response)
            if (response.status==200) {
              const DepartmentNames = response.data.map(dept => dept.department_name);
              console.log(DepartmentNames)
              setDepartments(DepartmentNames);
            }
          })
          .catch(err => console.error('Error fetching departments:', err));
      }, []);
      
      useEffect(() => {
        axios
          .get(`${base_url}role/getAllRoles`)
          .then(response => {
            console.log(response)
            if (response.status==200) {
              const RoleNames = response.data.map(role => role.role_name);
              console.log(response)
              setRoles(RoleNames);
            }
          })
          .catch(err => console.error('Error fetching roles:', err));
      }, []);
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        setIsUsernameTaken(false);
      };
    
      const handleOnSubmit = async (e)=> {
        e.preventDefault()
         
        try{
        console.log('Form Data:', formData);
        const response= await axios.post(`${base_url}user/signup`,formData)
        console.log(response)
        if (response.status==201){
       
          toast.success('User Create Succesfully');
          navigate("/login")
        }
        else{
          alert("An Errior occure")
        }
        }
    
         catch (error) {
            toast.error('Something is wronge');
           
          
            if (error.response) {
              console.error('Error:', error.response.data);

            }  else {
              console.error('Error', error.message);
            }
            toast.error('your password or email is incorrect');
           
          }
        };

        const checkUsernameAvailability = async () => {
          if (!formData.username.trim()) return; 
      
          setUsernameCheckLoading(true);
          try {
            const response = await axios.get(`${base_url}user/username_check/:formData.username`);
            console.log(response)
            if (response.data.message=="username is not taken") {
              setIsUsernameTaken(response.data.exists); 
            }
          } catch (error) {
            console.error("Error checking username:", error);
          } finally {
            setUsernameCheckLoading(false);
          }
        };

      return (
        <div className="p-4 max-w-5xl mx-auto">
          <form onSubmit={handleOnSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-xl font-bold mb-4">Add a New USER Account</h1>
            <div className="flex flex-col gap-4">
            <input
              name="full_name"
              value={formData.full_name}
              onChange={(e) => {
                const { name, value } = e.target;
                if (/^[a-zA-Z\s]*$/.test(value) || value === "") 
                  {handleInputChange(e);}}}
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
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 rounded"
                placeholder="Email Address"
                
                required
              />
              <input
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10); 
                  setFormData({ ...formData, phone_number: value });}}
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) && // Allow only number keys
                      e.key !== "Backspace" && // Allow backspace
                       e.key !== "Tab" && // Allow tab
                       e.key !== "ArrowLeft" && // Allow left arrow
                       e.key !== "ArrowRight" // Allow right arrow
                        ) {
                      e.preventDefault();} }}
                      maxLength={10} 
                      className="border p-2 rounded"
                      placeholder="Phone Number"
                      required
              />

              <select
               name="department_name"
               value={formData.department_name}
               onChange={handleInputChange}
               className="border p-2 rounded"
               required>
                <option value="">Select Department</option>
                {department.map((department, index) => (
                   <option key={index} value={department}>
                    {department}
                    </option>))}
              </select>
              <select
               name="role_name"
               value={formData.role_name}
               onChange={handleInputChange}
               className="border p-2 rounded"
               required>
                <option value="">Select Role</option>
                {Roles.map((role, index) => (
                   <option key={index} value={role}>
                    {role}
                    </option>))}
              </select>
              {usernameCheckLoading && <p className="text-blue-500">Checking...</p>}
                {isUsernameTaken && (
              <p className="text-red-500">Username already exists!</p>)}
              {!isUsernameTaken && formData.username && !usernameCheckLoading && (
              <p className="text-green-500">Username is available!</p>)}
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