import { MdAccountBox } from "react-icons/md";
import { IoIosLogOut, IoMdSettings, IoMdNotifications } from "react-icons/io";
import { useState } from 'react';
import Notification from '../pages/Notification';
import photo from '../assets/Logo.jpg';
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const full_name = Cookies.get("full_name"); // Use Cookies.get instead of getItem
    const user_id = Cookies.get("user_id"); // Use Cookies.get instead of getItem
    const navigate = useNavigate(); // Hook to redirect after logout

    const handleLogout = () => {
        // Clear cookies
        Cookies.remove('token');
        Cookies.remove('full_name');
        Cookies.remove('user_id');

        // Redirect to login page
        navigate('/login');
    };

    return (
        <>
            <div className="flex flex-row justify-between h-20 min-w-[1000px] items-center border shadow-lg rounded-2xl p-5 px-10">
                <h1>Document Management</h1>
                <div id='Notification' className="relative left-60" onClick={() => { setIsNotificationOpen(!isNotificationOpen) }}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-3xl text-white cursor-pointer"><IoMdNotifications /></div>
                    <div className="absolute top-0 right-0 bg-red-600 text-xs text-white rounded-full p-2 w-6 h-6 flex items-center justify-center">2</div>
                </div>
                {/* Notification Dropdown */}
                {isNotificationOpen && <div className="absolute top-20 right-0 z-20 flex items-end justify-end">
                    <Notification />
                </div>}
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <img src={photo} alt="Account Holder" className="account-photo w-12 h-12 border border-primary rounded-full" />
                    <span className="account-name">{full_name}</span>
                </div>
                {/* Account dropdown menu */}
                {isOpen && 
                    <div className="absolute top-20 right-4 items-center justify-center w-[220px] bg-white group-hover:block border-none shadow-lg">
                        <div className='flex flex-col justify-center pl-10'>
                            <NavLink to='/profile' className="flex p-2 gap-2 hover:text-primary"><MdAccountBox className="text-2xl" />Profile</NavLink>
                            <NavLink to="/settings" className="flex p-2 gap-2 hover:text-primary"><IoMdSettings />Settings</NavLink>
                            <hr className="h-2" />
                            <a onClick={handleLogout} className="flex p-2 gap-2 hover:text-primary cursor-pointer"><IoIosLogOut />Logout</a>
                        </div>
                    </div>  
                }
            </div>
        </>
    );
}

export default Navbar;