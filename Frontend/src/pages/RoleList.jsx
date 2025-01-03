import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { base_url } from '../utils/baseUrl';
import { useNavigate } from 'react-router-dom';
import { MdFolderOff } from 'react-icons/md';

function RoleList() {

    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate=useNavigate()
    const pageSize = 10;
    useEffect(() => {
      fetchRoles(currentPage);
    }, [currentPage]);
  
    const fetchRoles = (page) => {
      axios
        .get(`${base_url}role/getAllRoles/${page}/${pageSize}`)
        .then(response => {
          console.log(response)
          if (response.status === 200) {
            setRoles(response.data.rows || []);
            setTotalPages(response.data.totalPages || 1);
          }
        })
        .catch(err => {
          console.error('Error fetching Roles:', err);
          setError('Failed to fetch Roles');
        });
    };
  
    const handleEdit = (id) => {
      console.log(`Editing Role with ID: ${id}`);
      navigate("/:id")
  
      
    };
  
    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this Role?')) {
        axios
          .delete(`${base_url}role/delete_role/${id}`)
          .then(response => {
            if (response.status === 200) {
              alert('Role deleted successfully!');
              fetchDepartments(currentPage); 
            }
          })
          .catch(err => {
            console.error('Error deleting Role:', err);
            alert('Failed to delete Role');
          });
      }
    };
  
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    const columns = [
      { key: 'role_id', label: 'ID' },
      { key: 'role_nam', label: 'Role Name' },
      { key: 'role_description', label: 'Role Description' },
      { key: 'created_at', label: 'Created Date' },
      { key: 'actions', label: 'Actions' }
    ];
  
return (
    <div className="p-4  mx-auto">
      <h2 className="text-3xl font-bold mb-4">Role List</h2>
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
  {roles.length > 0 ? (
    roles.map((role, index) => (
      <tr key={index} className="hover:bg-gray-50">
        {columns.map((col) => (
          <td key={col.key} className="p-2 border border-gray-300">
            {col.key === 'actions' ? (
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(role.role_id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role.role_id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ) : col.key === 'created_at'? ( 
              <span>
                {new Date(dept[col.key]).toLocaleString('en-US', {
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric', 
                  hour: 'numeric', 
                  minute: 'numeric',
                  second: 'numeric', 
                  hour12: true 
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
          <p className="mt-2 text-gray-500">No Role available</p>
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


export default RoleList