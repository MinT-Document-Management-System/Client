import React, { useState, useEffect } from 'react';
import Upload from './Upload';
import { GrDocumentUpload } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { TbFilterUp } from "react-icons/tb";
import axios from "axios";

const RecordDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [filePath, setFilePath] = useState([]);
  const [isAddDocumentClicked, setIsaddDocumentClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    direction: '',
    fileType: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://server-mint.onrender.com/api/letter/get_all_letters?page=1&page_size=100");
        setDocuments(response.data.rows);
      } catch (error) {
        console.error("Error Receiving file:", error);
        alert("File Receive failed!");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLetter = async () => {
      try {
        const filePaths = await Promise.all(
          documents.map(async (document) => {
            const public_id = document.cloudinary_public_id;
            const encoded_cloudinary_public_id = encodeURIComponent(public_id);
            const response = await axios.get(`https://server-mint.onrender.com/api/letter/get_letter/${encoded_cloudinary_public_id}`);
            return response.data;
          })
        );
        setFilePath(filePaths);
      } catch (error) {
        console.error("File was not found", error);
      }
    };

    if (documents.length > 0) {
      fetchLetter();
    }
  }, [documents]);

  const handleAddDocument = () => {
    setIsaddDocumentClicked(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredDocuments = documents.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filters.status ? item.approval_status === filters.status : true;
    const matchesDirection = filters.direction ? item.direction === filters.direction : true;
    const matchesFileType = filters.fileType ? item.document_type.toLowerCase() === filters.fileType.toLowerCase() : true;

    const createdAt = new Date(item.created_at);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;
    const withinDateRange = (startDate ? createdAt >= startDate : true) && (endDate ? createdAt <= endDate : true);

    return matchesSearch && matchesStatus && matchesDirection && matchesFileType && withinDateRange;
  });

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert('No documents selected for deletion.');
      return;
    }

    if (window.confirm('Are you sure you want to delete the selected documents?')) {
      try {
        await Promise.all(selectedIds.map(async (id) => {
          const document = documents.find(doc => doc.document_id === id);
          const public_id = document.cloudinary_public_id;
          await axios.delete(`https://server-mint.onrender.com/api/letter/delete_letter/${encodeURIComponent(public_id)}`);
        }));

        setDocuments(documents.filter(doc => !selectedIds.includes(doc.document_id)));
        setSelectedIds([]);
      } catch (error) {
        console.error("Error deleting documents:", error);
        alert("Failed to delete documents.");
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setFilterModalOpen(false);
  };

  const removeFilters = () => {
    setFilters({
      status: '',
      direction: '',
      fileType: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleDownload = async () => {
    if (selectedIds.length === 0) {
      alert('No documents selected for download.');
      return;
    }

    selectedIds.forEach(id => {
      const document = documents.find(doc => doc.document_id === id);
      const fileUrl = document.file_path;
      window.open(fileUrl, '_blank'); 
    });
  };

  return (
    <>
      {!isAddDocumentClicked ? (
        <div className="p-4 h-screen w-full">
          <div className="mb-6 flex flex-row justify-between">
            <button
              onClick={handleAddDocument}
              className="bg-[#FFB27D] text-white px-6 py-2 rounded-full flex items-center space-x-2"
            >
              <GrDocumentUpload />
              <span>Add document</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center">
                <CiSearch className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border border-gray-300 pl-10 pr-4 py-2 rounded-full"
                  placeholder="Search..."
                />
              </div>
            </div>
            <button
              className="bg-[#FFB27D] text-white px-6 py-2 flex items-center space-x-2 rounded-full"
              onClick={() => setFilterModalOpen(true)}
            >
              <TbFilterUp />
              <span>Filter</span>
            </button>
          </div>

          <div className="mb-4 overflow-y-auto w-full h-[350px]">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr>
                  <th className="px-2 py-1 shadow-lg">Select</th>
                  <th className="px-2 py-1 shadow-lg">Document Title</th>
                  <th className="px-2 py-1 shadow-lg">File</th>
                  <th className="px-2 py-1 shadow-lg">Date</th>
                  <th className="px-2 py-1 shadow-lg">Document Type</th>
                  <th className="px-2 py-1 shadow-lg">Description</th>
                  <th className="px-2 py-1 shadow-lg">Direction</th>
                  <th className="px-2 py-1 shadow-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((item) => (
                  <tr key={item.document_id} className="h-12">
                    <td className="px-2 py-1 shadow-lg">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.document_id)}
                        onChange={() => handleCheckboxChange(item.document_id)}
                      />
                    </td>
                    <td className="px-2 py-1 shadow-lg">{item.title}</td>
                    <td className="px-2 py-1 shadow-lg">
                      <button onClick={() => window.open(filePath[documents.indexOf(item)], '_blank')}>
                        {item.file_name}
                      </button>
                    </td>
                    <td className="px-2 py-1 shadow-lg">{item.created_at}</td>
                    <td className="px-2 py-1 shadow-lg">{item.document_type}</td>
                    <td className="px-2 py-1 shadow-lg">{item.description}</td>
                    <td className="px-2 py-1 shadow-lg">{item.direction}</td>
                    <td className="px-2 py-1 shadow-lg">{item.approval_status}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="8" className="px-2 py-1 shadow-lg text-center">
                    Loading...
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex flex-row justify-between mt-8">
            <button onClick={handleDownload} className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">
              Download
            </button>
            <button onClick={handleDelete} className="bg-[rgb(228,44,53)] text-white px-6 py-2 rounded-full">
              Delete
            </button>
            <button className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">
              Edit
            </button>
            <button onClick={removeFilters} className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">
              Reset Filter
            </button>
          </div>

          {/* Filter Modal */}
          {filterModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-bold mb-4">Filter Documents</h2>
                <div className="mb-4">
                  <label className="block mb-2">Status:</label>
                  <select name="status" onChange={handleFilterChange} className="border rounded p-2 w-full">
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Direction:</label>
                  <select name="direction" onChange={handleFilterChange} className="border rounded p-2 w-full">
                    <option value="">All</option>
                    <option value="In">In</option>
                    <option value="Out">Out</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">File Type:</label>
                  <select name="fileType" onChange={handleFilterChange} className="border rounded p-2 w-full">
                    <option value="">All</option>
                    <option value="pdf">PDF</option>
                    <option value="jpeg">JPEG</option>
                    <option value="jpg">JPG</option>
                    <option value="png">PNG</option>
                    {/* Add more file types as needed */}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Date Range:</label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      name="startDate"
                      onChange={handleFilterChange}
                      className="border rounded p-2 w-full"
                    />
                    <input
                      type="date"
                      name="endDate"
                      onChange={handleFilterChange}
                      className="border rounded p-2 w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <button onClick={applyFilters} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                      Apply
                    </button>
                    <button onClick={() => setFilterModalOpen(false)} className="bg-gray-300 text-black px-4 py-2 rounded">
                      Cancel
                    </button>
                  </div>
                  <button onClick={removeFilters} className="bg-red-500 text-white px-4 py-2 rounded">
                    Remove Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Upload isUploaded={isAddDocumentClicked} />
      )}
    </>
  );
};

export default RecordDashboard;