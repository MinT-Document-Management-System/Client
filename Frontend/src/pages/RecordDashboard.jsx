import React, { useState } from 'react';
import {  } from 'react-icons/fa'

const RecordDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedItems, setCheckedItems] = useState({});

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="p-4 h-screen">
      
      <div className="mb-6 flex flex-row justify-between">
        <button className="bg-[#FFB27D] text-white px-8 py-2 rounded-full" onClick={() => console.log('Button 1 Clicked')}>
          Add document
        </button>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded-full"
            placeholder="Search..."
          />
        </div>
        <button className="bg-[#FFB27D] text-white px-8 py-2 rounded-full" onClick={() => console.log('Button 3 Clicked')}>
          Filter
        </button>
      </div>

      <div className="mb-4 flex justify-center overflow-y-auto h-[60%]">
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-2 py-1 shadow-md">Select</th>
              {[...Array(8)].map((_, index) => (
                <th key={index} className="px-2 py-1 shadow-md">Header {index + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(20)].map((_, index) => (
              <tr key={index} className="h-12">
                <td className="px-2 py-1 shadow-md">
                  <input
                    type="checkbox"
                    name={`item-${index}`}
                    checked={!!checkedItems[`item-${index}`]}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                </td>
                {[...Array(8)].map((_, colIndex) => (
                  <td key={colIndex} className="px-2 py-1 shadow-md">Data {colIndex + 1}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row justify-around">
        <button className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">Download</button>
        <button className="bg-[rgb(228,44,53)] text-white px-6 py-2 rounded-full">Delete</button>
        <button className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">Edit</button>
        <button className="bg-[#FFB27D] text-white px-6 py-2 rounded-full">Reset Filter</button>
      </div>
    </div>
  );
};

export default RecordDashboard;