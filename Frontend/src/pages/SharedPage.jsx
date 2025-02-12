import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function Home() {
return (
    <div className='grid grid-cols-4 bg-slate-90'>
        <Sidebar className='col-span-10'/>
        <div className='col-span-5 p-2 ml-80'>
            <Navbar/>
            <Outlet/>
        </div>
    </div>
)
}
export default Home;