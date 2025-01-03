import {Bar} from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';

function Dashboard() {
  
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Documents Reviewed',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Tasks Completed',
        data: [5, 12, 15, 8, 7, 10],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen min-w-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>
        {/* Search Tools */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Search Documents</h2>
          <input type="text" placeholder="Search..." className="mt-2 p-2 border border-gray-300 rounded w-full" />
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Document Access */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Personal Document Access</h2>
          <ul className="mt-2">
            <li className="border-b py-2">Document 1</li>
            <li className="border-b py-2">Document 2</li>
            <li className="border-b py-2">Document 3</li>
          </ul>
        </div>

        {/* Task Management */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Task Management</h2>
          <ul className="mt-2">
            <li className="border-b py-2">Task 1: Review Document</li>
            <li className="border-b py-2">Task 2: Submit Report</li>
          </ul>
        </div>


        {/* Collaboration Features */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Collaboration Features</h2>
          <p className="mt-2">Recent Activity:</p>
          <ul className="mt-1">
            <li className="border-b py-2">Team Member A updated Document 2</li>
            <li className="border-b py-2">Team Member B commented on Document 1</li>
          </ul>
        </div>

        {/* Training and Resources */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Training and Resources</h2>
          <ul className="mt-2">
            <li className="border-b py-2">
              <a href="#" className="text-blue-500 hover:underline">User Guide</a>
            </li>
            <li className="border-b py-2">
              <a href="#" className="text-blue-500 hover:underline">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Charts */}
        <div className="col-span-1 md:col-span-2 bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold">Performance Overview</h2>
          {/* <Bar data={data} options={options}/> */}
        </div>
      </div>
    </div>
  )
}
export default Dashboard;