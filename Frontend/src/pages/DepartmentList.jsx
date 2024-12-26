import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { base_url } from '../utils/baseUrl';
import { useNavigate } from 'react-router-dom';
import { MdFolderOff } from 'react-icons/md';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate=useNavigate()
  const pageSize = 10;
  useEffect(() => {
    fetchDepartments(currentPage);
  }, [currentPage]);

  const fetchDepartments = (page) => {
    axios
      .get(`${base_url}department/get_all_departments?page=${page}&pageSize=${pageSize}`)
      .then(response => {
        if (response.status === 200) {
          setDepartments(response.data.departments || []);
          setTotalPages(response.data.totalPages || 1);
        }
      })
      .catch(err => {
        console.error('Error fetching departments:', err);
        setError('Failed to fetch departments');
      });
  };

  const handleEdit = (id) => {
    console.log(`Editing department with ID: ${id}`);
    navigate("/:id")

    
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      axios
        .delete(`${base_url}department/delete_department/${id}`)
        .then(response => {
          if (response.status === 200) {
            alert('Department deleted successfully!');
            fetchDepartments(currentPage); 
          }
        })
        .catch(err => {
          console.error('Error deleting department:', err);
          alert('Failed to delete department');
        });
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const columns = [
    { key: 'department_id', label: 'ID' },
    { key: 'department_name', label: 'Department Name' },
    { key: 'department_head_id', label: 'Department Head Name' },
    { key: 'department_description', label: 'Department Description' },
    { key: 'created_at', label: 'Created Date' },
    { key: 'updated_at', label: 'Updated Date' },
    { key: 'actions', label: 'Actions' }
  ];

  return (
    <div className="p-4  mx-auto">
      <h2 className="text-3xl font-bold mb-4">Department List</h2>
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
    {departments.length > 0 ? (
      departments.map((dept, index) => (
        <tr key={index} className="hover:bg-gray-50">
          {columns.map((col) => (
            <td key={col.key} className="p-2 border border-gray-300">
              {col.key === 'actions' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(dept.department_id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dept.department_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
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
            <p className="mt-2 text-gray-500">No departments available</p>
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

export default DepartmentList;
