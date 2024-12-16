import { RxDashboard } from "react-icons/rx";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaCheckCircle,FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";

function Sidebar() {
  return (
    <div className="flex flex-row h-full w-80">
      <div className="bg-primary w-16 h-full">
      </div> 
      <div className="flex flex-col gap-10 bg-[#DDDDDD] h-full">
        <img src={Logo} alt="Logo" className="w-32 h-32 rounded-full"/>
        <div className="flex flex-col gap-5 pl-3">
          <Link className='flex items-center gap-1' to={'/'}><RxDashboard/> Dashboard</Link>
          <Link className='flex items-center gap-1' to={'/notification'}><IoMdNotificationsOutline/> Notifications</Link>
          <Link className='flex items-center gap-1' to={'/approvals'}><FaCheckCircle/> Approvals</Link>
          <Link className='flex items-center gap-1' to={'/FAQs'}><FaQuestionCircle/> FAQs</Link>
          <Link className='flex items-center gap-1' to={'/about'}>About</Link>
          {/* <Link to={'login'}>Login</Link> */}
        </div>
      </div>
    </div>
  )
}
export default Sidebar