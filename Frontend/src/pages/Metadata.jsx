import { useState } from 'react';
import axios from "axios";

const Metadata = ({ isOpen,  file}) => {

  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [departmentList, setDepartmentList] = useState([]);
  const [documentDirection, setdocumentDirection] = useState('');

  if (!isOpen) {
    return null;
  }
  
  const formData = new FormData();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const metadata = {
  //     title: documentName,
  //     department_list: departmentList,
  //     // document_type: documentType,
  //     // direction: documentDirection,
  //   };
    
  //   formData.append("file", file);
  //   formData.append("metadata", metadata);
  
  //   try {
  //     const response = await axios.post("https://server-mint.onrender.com/api/letter/upload_letter", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     alert("File uploaded successfully!");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     alert("File upload failed!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!documentName || !file || departmentList.length === 0 || !documentType) {
        alert("Please fill in all fields and select a file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", documentName);
    formData.append("department_list", departmentList);

    try {
        const response = await axios.post("https://server-mint.onrender.com/api/letter/upload_letter", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("File uploaded successfully!");
        console.log(response.data);
    } catch (error) {
        console.error("Error uploading file:", error.response ? error.response.data : error.message);
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
            <h3 className="text-center w-[20%] pt-2">Department List</h3>
            <input type="text" value={departmentList.join(', ')} onChange={(e) => setDepartmentList(e.target.value.split(',').map(item => item.trim()))}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter department list (comma separated)"/>
          </div>

           {/* <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[22%] pt-2">Document Direction</h3>
            <div className="flex items-center">
              <label className="mr-2">
                <input type="radio" value="In" checked={documentDirection === 'In'} onChange={(e) => setdocumentDirection(e.target.value)} />
                In
              </label>
              <label>
                <input type="radio" value="Out" checked={documentDirection === 'Out'} onChange={(e) => setdocumentDirection(e.target.value)} />
                Out
              </label>
            </div>
          </div> */}
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
