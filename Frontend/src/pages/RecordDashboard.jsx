import React, { useState, useEffect } from 'react';
import Upload from './Upload';
import { GrDocumentUpload } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { TbFilterUp } from "react-icons/tb";
import axios from "axios";

const RecordDashboard = () => {

  const [documents, setDocuments] = useState([]);
  const [filePath, setFilePath] = useState([]);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://server-mint.onrender.com/api/letter/get_all_letters?page=1&page_size=10");
        setDocuments(response.data.rows);
      } catch (error) {
        console.error("Error Recieving file:", error);
        alert("File Recieve failed!");
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
            return response.data
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

  const [isAddDocumentClicked, setIsaddDocumentClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedItems, setCheckedItems] = useState({});

  const handleAddDocument = () => {
    setIsaddDocumentClicked(true);
  }

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle deletion
  const handleDelete = () => {
    if (selectedIds.length === 0) {
      alert('No cells selected for deletion.');
      return;
    }

    // Confirm deletion
    if (window.confirm('Are you sure you want to delete the selected cells?')) {
      const updatedData = data.filter((item) => !selectedIds.includes(item.id));
      setData(updatedData); // Update the state with remaining data
      setSelectedIds([]); // Clear selection
    }
  };

  return (
    <>
      {!isAddDocumentClicked ? (
        <div className="p-4 h-screen w-full">

          <div className="mb-6 flex flex-row justify-between">
            <button
              onClick={handleAddDocument}
              className="bg-[#FFB27D] text-white px-8 py-2 rounded-full flex items-center space-x-2"
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 pl-10 pr-4 py-2 rounded-full"
                  placeholder="Search..."
                />
              </div>
            </div>
            <button
              className="bg-[#FFB27D] text-white px-6 py-2
              flex items-center space-x-2 rounded-full"
              onClick={() => console.log('Button 3 Clicked')}
            >
              <TbFilterUp />
              <span>Filter</span>
            </button>
          </div>

          <div className="mb-4 overflow-y-auto w-[988px] h-[60%]">

            <table className="table-auto border-collapse">
              <thead>
                <tr>
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
                {documents.map((item, id) => {
                  return (
                    <tr key={id} className="h-12">
                      <td className="px-2 py-1 shadow-lg">{item.title}</td>
                      <td className="px-2 py-1 shadow-lg"><button onClick={() => window.open(filePath[id], '_blank')}>{item.file_name}</button></td>
                      <td className="px-2 py-1 shadow-lg">{item.created_at
                      }</td>
                      <td className="px-2 py-1 shadow-lg">{item.document_type
                      }</td>
                      <td className="px-2 py-1 shadow-lg">{item.description
                      }</td>
                      <td className="px-2 py-1 shadow-lg">{item.direction
                      }</td>
                      <td className="px-2 py-1 shadow-lg">{item.approval_status
                      }</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="9" className="px-2 py-1 shadow-lg text-center">
                    No more records to display
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex flex-row justify-between mt-8">
            <button className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">
              Download
            </button>
            <button onClick={handleDelete} className="bg-[rgb(228,44,53)] text-white px-6 py-2 rounded-full">
              Delete
            </button>
            <button className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">
              Edit
            </button>
            <button className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">
              Reset Filter
            </button>
          </div>
        </div>
      ) : (
        <Upload isUploaded={isAddDocumentClicked} />
      )}
    </>
  );
};

export default RecordDashboard;