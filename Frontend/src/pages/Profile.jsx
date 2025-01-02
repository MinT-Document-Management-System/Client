import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';
import photo from '../assets/Logo.jpg';
const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loginId = localStorage.getItem('user_id'); 
    console.log(loginId);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${base_url}user/get_user_data/${loginId}`);
                setUser(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        console.log(user);
        if (loginId) {
            fetchUserData();
        } else {
            setError('User ID not found');
            setLoading(false);
        }
    }, [loginId]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;

    return (
        <div className="mx-auto p-6 bg-gray-100 min-h-screen pt-5 mt-10">
            <h1 className="text-4xl mb-6 text-center text-gray-800 font-bold">Profile Page</h1>
            {user && (
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto flex items-center">
                    <div className="flex-1">
                        <div className="mb-4">
                            <p className="text-lg">Account Status: <span className='text-green-600'>{user.account_status}</span></p>
                        </div>
                        <div className="mb-4">
                            <p className="text-lg">User ID Number: {user.user_id}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-lg">Username: {user.username}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-lg">Name: {user.full_name}</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-lg">Email: {user.email}</p>
                        </div>
                    </div>
                    <div className="ml-6">
                        <img src={photo} alt="Account Holder" className="account-photo w-24 h-24 border border-primary rounded-full"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
