import { RxDashboard } from "react-icons/rx";
import { IoMdNotificationsOutline, IoMdSettings } from "react-icons/io";
import { IoDocumentAttach } from "react-icons/io5";
import { FaCheckCircle, FaQuestionCircle, FaRocketchat, FaRegObjectGroup, FaUserCog, FaFileSignature  } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { useState } from "react";
import Cookies from 'js-cookie'; 

function Sidebar() {
  const role = Cookies.get('Role_Name');
  const role_id = Cookies.get('Role_id');
  console.log(role_id);
  return (
    <div className="flex fixed flex-row h-screen">
      <div className="bg-primary w-16 h-screen">
      </div> 
      <div className="flex flex-col gap-10 bg-[#DDDDDD] h-screen p-5 py-6">
        <img src={Logo} alt="Logo" className="w-32 h-32 rounded-full"/>
        <div className="flex flex-col gap-5">
          {role_id === '1' && (<>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/'}><RxDashboard/> Dashboard</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/RecordDashboard'}><IoDocumentAttach/> Document</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/letter'}><FaRocketchat/>Letters</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/approvals'}><FaCheckCircle/> Approvals</Link>
            </>
          )}
          {role_id === '4' &&(<>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/'}><RxDashboard/> Dashboard</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/letter'}><FaRocketchat/>Letters</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/RecordDashboard'}><IoDocumentAttach/> Document</Link>
            </>
          )}
          {role_id === '5' &&(<>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/Itdashboard'}><RxDashboard/> Dashboard</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/RecordDashboard'}><IoDocumentAttach/> Document</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/AddNewDepartment'}><FaRegObjectGroup /> Manage Departments</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/Register'}><FaRegObjectGroup/>Manage Staff</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/SystemConfiguration'}><IoMdSettings/>System Configuration</Link>
            <Link className='flex items-center gap-1 hover:text-primary' to={'/UserActivityLogs'}><FaUserCog/>User Activity Logs</Link>
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