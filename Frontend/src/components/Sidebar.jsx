import { RxDashboard } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCheckCircle,FaQuestionCircle } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";

function Sidebar() {
  return (
    <div className="flex fixed flex-row h-screen w-80">
      <div className="bg-primary w-16 h-screen">
      </div> 
      <div className="flex flex-col gap-10 bg-[#DDDDDD] h-screen p-5 py-6">
        <img src={Logo} alt="Logo" className="w-32 h-32 rounded-full"/>
        <div className="flex flex-col gap-5 pl-3">
          <Link className='flex items-center gap-1 hover:text-primary' to={'/'}><RxDashboard/> Dashboard</Link>
          {/* <Link className='flex items-center gap-1 hover:text-primary' to={'/notification'}><IoMdNotificationsOutline/> Notifications</Link> */}
          <Link className='flex items-center gap-1 hover:text-primary' to={'/approvals'}><FaCheckCircle/> Approvals</Link>
          <Link className='flex items-center gap-1 hover:text-primary' to={'/FAQs'}><FaQuestionCircle/> FAQs</Link>
          <Link className='flex items-center gap-1 hover:text-primary' to={'/about'}><RiAccountCircleFill/>About</Link>
          {/* <Link to={'login'}>Login</Link> */}
        </div>
      </div>
    </div>
  )
}
export default Sidebar