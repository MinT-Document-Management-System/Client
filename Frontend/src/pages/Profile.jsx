import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../utils/baseUrl'; // Adjust as necessary
import photo from '../assets/Logo.jpg';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

// Set Axios to send cookies with requests
axios.defaults.withCredentials = true;

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loginId = Cookies.get('user_id'); 
    const token = Cookies.get('jwt_token'); // Retrieve jwt_token from cookies

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                setError('Token not found. Please log in again.');
                setLoading(false);
                return;
            }

            // Decode token to check expiration
            const decoded = jwtDecode(token);
            console.log("Token Expiry:", decoded.exp); // Check token expiry

            try {
                console.log("Token:", token); // Debugging: Check token value
                const response = await axios.get(`${base_url}user/get_user_data/${loginId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Use jwt_token in the header
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true, // Ensure cookies are sent
                });

                setUser(response.data);
            } catch (err) {
                console.error("Error fetching user data:", err.response); // Log full error response
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (loginId) {
            fetchUserData();
        } else {
            setError('User ID not found');
            setLoading(false);
        }
    }, [loginId, token]);

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
                        <div className="mb-4">
                            <p className="text-lg">Phone Number: {user.phone_number}</p>
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