import {React,useEffect,useState} from 'react'
import { base_url } from '../utils/baseUrl';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const { navigate }= useNavigate()
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        email: '',
        phone_number: '',
        department_name: '',
        role_name: '',
      });
      const [department,setDepartment]=useState([])
      const [Roles,setRoles]=useState([])
      const [isUsernameTaken, setIsUsernameTaken] = useState(false);
      const [usernameCheckLoading, setUsernameCheckLoading] = useState(false);
      useEffect(() => {
        setDepartment([
          "HR",
          "IT"
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
      useEffect(() => {
        axios
          .get(`${base_url}role`)
          .then((response) => {
            if (response.data.success === true) {
              console.log(response)
              const roleNames = response.data.all_roles.map((role) => role.role_name);
              setRoles(roleNames);
            } else {
              console.log("An error occurred while fetching roles.");
            }
          })
          .catch((err) => {
            console.error("Error fetching roles:", err);
          });
      }, []);
    

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        setIsUsernameTaken(false);
      };
    
      const handleOnSubmit = async ()=> {
         
        try{
        console.log('Form Data:', formData);
        const response= await axios.post(`${base_url}user/signup`,formData)
        if (response.success==true){
          toast.succes('User Create Succesfully');
          navigate("/login")
        }
        else{
          alert("An Errior occure")
          

        }
        }
    
         catch (error) {
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

        const checkUsernameAvailability = async () => {
          if (!formData.username.trim()) return; 
      
          setUsernameCheckLoading(true);
          try {
            const response = await axios.post(`${base_url}user/check-username`, {
              username: formData.username,
            });
      
            if (response.data.success) {
              setIsUsernameTaken(response.data.exists); // Backend should return `exists: true/false`
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