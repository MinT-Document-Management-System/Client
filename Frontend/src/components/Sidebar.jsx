import { RxDashboard } from "react-icons/rx";
import { IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import { IoDocumentAttach } from "react-icons/io5";
import { FaCheckCircle, FaQuestionCircle, FaRocketchat, FaRegObjectGroup, FaUserCog, FaFileSignature  } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useState } from "react";

function Sidebar() {
  const role = localStorage.getItem('Role_Name');
  return (
    <div className="flex fixed flex-row h-screen">
      <div className="bg-primary w-16 h-screen">
      </div> 
      <div className="flex flex-col gap-10 bg-[#DDDDDD] h-screen p-5 py-6">
        <img src={Logo} alt="Logo" className="w-32 h-32 rounded-full"/>
        <div className="flex flex-col gap-5">
          <Link className='flex items-center gap-1 hover:text-primary' to={'/'}><RxDashboard/> Dashboard</Link>
          <Link className='flex items-center gap-1 hover:text-primary' to={'/RecordDashboard'}><IoDocumentAttach/> Document</Link>
          {role ==='admin' &&(<>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/letter'}><FaRocketchat/>Letters</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/approvals'}><FaCheckCircle/> Approvals</Link>
            </>
          )}
          {role ==='staff' &&(<>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/letter'}><FaRocketchat/>Letters</Link>
            </>
          )}
          {role ==='it' &&(<>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/notification'}><FaRegObjectGroup /> Manage Departments</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/about'}><FaRegObjectGroup/>Manage Staff</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/about'}><IoMdSettings/>System Configuration</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/about'}><FaUserCog/>User Activity Logs</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/about'}><FaFileSignature/>Reports</Link>
            </>
          )}
          <Link className='flex items-center gap-1 hover:text-primary' to={'/about'}><RiAccountCircleFill/>About</Link>
          <Link className='flex items-center gap-1 hover:text-primary' to={'/FAQs'}><FaQuestionCircle/> FAQs</Link>
          {/* <Link to={'login'}>Login</Link> */}
        </div>
      </div>
    </div>
  )
}
export default Sidebar