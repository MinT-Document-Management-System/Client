import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ItDashboard() {
  const [departments, setDepartments] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const PAGE_SIZE = 100;
  const PAGE_NUM = 1;

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
                  userCount: countResponse.status === 200 ? countResponse.data[0].usercount : 0,
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
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800">
          📊 User Count by Department
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          A detailed breakdown of user distribution across departments.
        </p>
      </header>

      {/* Chart Section */}
      <section className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-5xl">
        {departments.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    font: {
                      size: 14,
                    },
                  },
                },
                title: {
                  display: true,
                  text: 'User Count by Department',
                  font: {
                    size: 20,
                    weight: 'bold',
                  },
                  padding: 20,
                },
              },
            }}
          />
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )}
      </section>

    </div>
  );
}

export default ItDashboard;
