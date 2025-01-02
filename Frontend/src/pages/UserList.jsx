import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { base_url } from '../utils/baseUrl';
import { useNavigate } from 'react-router-dom';
import { MdFolderOff } from 'react-icons/md';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate=useNavigate()
  const pageSize = 10;
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = (page) => {
    axios
      .get(`${base_url}user/get_all_users/${page}/${pageSize}`)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          setUsers(response.data.rows || []);
          setTotalPages(response.data.totalPages || 1);
        }
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
      });
  };

  const handleEdit = (id) => {
    console.log(`Editing user with ID: ${id}`);
    navigate("/:id")

    
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this User?')) {
      axios
        .delete(`${base_url}user/delete_user/${id}`)
        .then(response => {
          if (response.status === 200) {
            alert('User deleted successfully!');
            fetchUsers(currentPage); 
          }
        })
        .catch(err => {
          console.error('Error deleting user:', err);
          alert('Failed to delete user');
        });
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const columns = [
    { key: 'user_id', label: 'ID' },
    { key: 'usernam', label: 'User Name' },
    { key: 'full_name', label: 'Full Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone_number', label: ' Phone Number' },
    { key: 'role_id', label: 'Role Name' },
    { key: 'department_id', label: 'Department Name' },
    { key: "account_status", label:"Account Status"},
    { key: 'created_at', label: 'Created Date' },
    { key: 'updated_at', label: 'Updated Date' },
    { key: 'actions', label: 'Actions' }
  ];


  return (
    <div className="p-4  mx-auto">
      <h2 className="text-3xl font-bold mb-4">User List</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                key={col.key}
                className="p-2 pl-8 bg-gray-100 border border-gray-300 whitespace-nowrap">
                {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
  {users.length > 0 ? (
    users.map((user, index) => (
      <tr key={index} className="hover:bg-gray-50">
        {columns.map((col) => (
          <td key={col.key} className="p-2 border border-gray-300">
            {col.key === 'actions' ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user.user_id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.user_id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ) : col.key === 'created_at' || col.key === 'updated_at' ? ( // Check for created_at or updated_at
              <span>
                {new Date(dept[col.key]).toLocaleString('en-US', {
                  weekday: 'long', // Day of the week
                  year: 'numeric', // Year
                  month: 'long', // Month
                  day: 'numeric', // Day
                  hour: 'numeric', // Hour
                  minute: 'numeric', // Minute
                  second: 'numeric', // Second
                  hour12: true // Use 12-hour time
                })}
              </span>
            ) : (
              dept[col.key] || 'N/A'
            )}
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={columns.length} className="p-10 border border-gray-300">
        <div className="flex flex-col items-center justify-center text-center">
          <MdFolderOff size={50} color="gray" />
          <p className="mt-2 text-gray-500">No User available</p>
        </div>
      </td>
    </tr>
  )}
</tbody>


</table>


          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'
              }`}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserList;
