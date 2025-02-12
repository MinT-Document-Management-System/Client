import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';

const UserActivityLogs = () => {
    const [loading, setLoading] = useState(true);
    const [recentlyUser, setRecentlyUser] = useState([]);

    useEffect(() => {
        const fetchRecentlyAddedUsers = async () => {
          try {
            const response = await axios.get(`${base_url}user/get_recently_created_users`);
            if (response.status === 200) {
              setRecentlyUser(response.data.recent_users);
              toast.success('Recently Added Users Fetched Successfully');
            } else {
              toast.error('Failed to Fetch Recently Added Users');
            }
          } catch (err) {
            console.error('Error fetching recently added users:', err);
            toast.error('Error fetching recently added users');
          }
        };
    
        fetchRecentlyAddedUsers();

      }, []);

    return (
        // <div className="p-8 bg-white rounded-lg shadow-md">
        //     <h1 className="text-2xl font-semibold mb-6">User Activity Logs</h1>

        //     {loading ? (
        //         <p>Loading logs...</p>
        //     ) : (
        //         <table className="min-w-full border-collapse border border-gray-300">
        //             <thead>
        //                 <tr>
        //                     <th className="border px-4 py-2">Timestamp</th>
        //                     <th className="border px-4 py-2">Username</th>
        //                     <th className="border px-4 py-2">Action</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {renderLogs()}
        //             </tbody>
        //         </table>
        //     )}
        // </div>

        <section className="bg-white shadow-lg rounded-lg p-6 ">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">🆕 Recently Added Users</h2>
          {recentlyUser.length > 0 ? (
            <div className="overflow-y-auto max-h-96">
              <table className="w-full border-collapse bg-gray-50 rounded-md shadow-sm">
                <thead className="bg-blue-100 text-gray-700 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left">#</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Added On</th>
                  </tr>
                </thead>
                <tbody>
                  {recentlyUser.map((user, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                      } hover:bg-blue-50`}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2 font-medium">{user.full_name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.created_at || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-500 py-6">No recently added users found.</p>
          )}
        </section>
    );
};

export default UserActivityLogs;