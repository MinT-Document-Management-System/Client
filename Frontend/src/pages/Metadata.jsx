import { useState } from 'react';
import axios from "axios";

const Metadata = ({ isOpen,  file}) => {

  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [documentAuthor, setDocumentAuthor] = useState('');

  if (!isOpen) {
    return null;
  }
  
  const formData = new FormData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metadata = {
      documentName,
      documentType,
      companyName,
      departmentName,
      documentAuthor,
    };
    
    formData.append("file", file);
    console.log(file)
    formData.append("metadata", metadata);
  
    try {
      const response = await axios.post("https://server-mint.onrender.com/api/letter/upload_letter", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed!");
    }
  };

  const handleSave = () => {
    window.location.href = 'http://localhost:5173/recorddashboard';
  }

  return (
    <div className="relative justify-center items-center bg-white
     ml-[5%] mt-6 w-[880px] h-[530px] border border-gray-500 rounded-[25px]">

      <div className="m-5">
        <h1 className="text-center font-semibold text-4xl">Add Metadata</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative flex flex-col ml-[20%]">
          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Document name</h3>
            <input type="text" value={documentName} onChange={(e) => setDocumentName(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter document name" />
          </div>

          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Document type</h3>
            <input type="text" value={documentType} onChange={(e) => setDocumentType(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter document type" />
          </div>

          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Company name</h3>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter company name" />
          </div>

          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Department name</h3>
            <input type="text" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter department name" />
          </div>

          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Document author</h3>
            <input type="text" value={documentAuthor} onChange={(e) => setDocumentAuthor(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter document author" />
          </div>

        </div>

        <div className="flex items-center justify-center mt-8 gap-4">
        <button type="submit" className="bg-[#FFB27D] w-32 h-10 rounded-full text-white">Save</button>
        <button onClick={handleSave} className="bg-[#FFB27D] w-32 h-10 rounded-full text-white">Go Back</button>
        </div>

      </form>

    </div>
  );
}

export default Metadata
