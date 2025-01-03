import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ItDashboard() {
  const [departments, setDepartments] = useState([]);
  const [recentlyUser, setRecentlyUser] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const PAGE_SIZE = 100;
  const PAGE_NUM = 1;

  /**
   * Fetch Recently Added Users
   */
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

  /**
   * Fetch Departments and User Count
   */
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${base_url}department/get_all_departments/${PAGE_NUM}/${PAGE_SIZE}`
        );

        if (response.status === 200 && Array.isArray(response.data)) {
          const departmentData = await Promise.all(
            response.data.map(async (dept) => {
              try {
                const countResponse = await axios.get(
                  `${base_url}department/get_user_count_by_department/${dept.department_name}`
                );

                return {
                  name: dept.department_name,
                  userCount: countResponse.status === 200 ? countResponse.data[0]?.usercount || 0 : 0,
                };
              } catch (err) {
                console.error(`Error fetching count for ${dept.department_name}:`, err);
                return { name: dept.department_name, userCount: 0 };
              }
            })
          );

          setDepartments(departmentData);

          setChartData({
            labels: departmentData.map((dept) => dept.name),
            datasets: [
              {
                label: 'User Count by Department',
                data: departmentData.map((dept) => dept.userCount),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                borderRadius: 3,
              },
            ],
          });
        }
      } catch (err) {
        console.error('Error fetching departments:', err);
        toast.error('Failed to fetch department data');
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br w-full from-blue-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          📊 IT Dashboard Overview
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Get insights into user distribution across departments and recently added users.
        </p>
      </header>

      {/* Dashboard in Row Format */}
      <div className="flex flex-row md:flex-row gap-8">
        {/* User Count by Department (Chart Section) */}
        <section className="bg-white shadow-lg rounded-lg p-6 ">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">User Count by Department</h2>
          {departments.length > 0 ? (
            <div className="h-96">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'User Count by Department',
                      font: {
                        size: 16,
                        weight: 'bold',
                      },
                      padding: 10,
                    },
                  },
                }}
              />
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading data...</p>
          )}
        </section>

        {/* Recently Added Users */}
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
      </div>

      {/* Footer Note */}
      <div className="text-sm text-gray-400 mt-6 text-center">
        Data is updated regularly to ensure accuracy.
      </div>
    </div>
  );
}

export default ItDashboard;
