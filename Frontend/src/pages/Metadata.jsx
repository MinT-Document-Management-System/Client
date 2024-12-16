import { useState } from 'react';

const Metadata = ({ isOpen }) => {

  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [documentAuthor, setDocumentAuthor] = useState('');

  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative justify-center items-center bg-white
     ml-[5%] mt-6 w-[880px] h-[530px] border border-gray-500 rounded-[25px]">

      <div className="m-5">
        <h1 className="text-center font-semibold text-4xl">Add Metadata</h1>
      </div>

      <form action="/submit" method="post">
        <div className="relative flex flex-col ml-[20%]">
          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Document name</h3>
            <input type="text" value={documentName} onChange={(e) => setDocumentName(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter" />
          </div>

          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Document type</h3>
            <input type="text" value={documentType} onChange={(e) => setDocumentType(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter" />
          </div>

          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Company name</h3>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter" />
          </div>

          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Department name</h3>
            <input type="text" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter" />
          </div>

          <div className="flex flex-row gap-6 m-3">
            <h3 className="text-center w-[20%] pt-2">Document author</h3>
            <input type="text" value={documentAuthor} onChange={(e) => setDocumentAuthor(e.target.value)}
              className="bg-[#FFB27D] text-black w-[45%] h-10" placeholder="Enter" />
          </div>

        </div>

        <div className="flex items-center justify-center mt-8">
          <button className="bg-[#FFB27D] w-[200px] h-[56px] rounded-full text-white">Done</button>
        </div>

      </form>

    </div>
  )
}

export default Metadata
