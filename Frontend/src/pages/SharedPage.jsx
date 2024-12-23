import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function Home() {
return (
    <div className='grid grid-cols-4'>
        <Sidebar className='col-span-1'/>
        <div className='col-span-3 p-2 ml-80'>
            <Navbar />
            <Outlet/>
        </div>
    </div>
)
}
export default Home;