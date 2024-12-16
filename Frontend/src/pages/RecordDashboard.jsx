import React, { useState } from 'react';
import Upload from './Upload';
import { GrDocumentUpload } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { TbFilterUp } from "react-icons/tb";

const RecordDashboard = () => {

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

  return (
    <>
      {!isAddDocumentClicked ? (
        <div className="p-4 h-screen">
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

          <div className="mb-4 overflow-y-auto h-[60%]">
            <table className="table-auto border-collapse">
              <thead>
                <tr>
                  <th className="px-2 py-1 shadow-lg">Select</th>
                  <th className="px-2 py-1 shadow-lg">Title</th>
                  <th className="px-2 py-1 shadow-lg">Date</th>
                  <th className="px-2 py-1 shadow-lg">Email</th>
                  <th className="px-2 py-1 shadow-lg">Address</th>
                  <th className="px-2 py-1 shadow-lg">Phone</th>
                  <th className="px-2 py-1 shadow-lg">Company</th>
                  <th className="px-2 py-1 shadow-lg">Position</th>
                  <th className="px-2 py-1 shadow-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(20)].map((_, index) => (
                  <tr key={index} className="h-12">
                    <td className="px-2 py-1 shadow-lg">
                      <input
                        type="checkbox"
                        name={`item-${index}`}
                        checked={!!checkedItems[`item-${index}`]}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                      />
                    </td>
                    <td className="px-2 py-1 shadow-lg">Name {index + 1}</td>
                    <td className="px-2 py-1 shadow-lg">{20 + index}</td>
                    <td className="px-2 py-1 shadow-lg">
                      email{index + 1}@example.com
                    </td>
                    <td className="px-2 py-1 shadow-lg">Address {index + 1}</td>
                    <td className="px-2 py-1 shadow-lg">123-456-789{index}</td>
                    <td className="px-2 py-1 shadow-lg">Company {index + 1}</td>
                    <td className="px-2 py-1 shadow-lg">Position {index + 1}</td>
                    <td className="px-2 py-1 shadow-lg">
                      {index % 2 === 0 ? 'Active' : 'Inactive'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-row justify-around">
            <button className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">
              Download
            </button>
            <button className="bg-[rgb(228,44,53)] text-white px-6 py-2 rounded-full">
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