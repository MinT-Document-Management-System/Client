import { useState } from "react"

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(name, password);
  };

  return (
    <div className="bg-slate-500">
      <form onSubmit={handleSubmit} className="">
        <h2>Login</h2>
        <div className="flex flex-col gap-5">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
          <label htmlFor="password">Password</label>
          <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
      </form>
    </div>
  )
}
export default Login