import axios from "axios";
import { useState } from "react"
import { RiFolderUploadLine } from "react-icons/ri";
import Metadata from "./Metadata"

const Upload = ({ isUploaded }) => {

  const [file, setFile] = useState(null);

  const [isSelected, setIsSelected] = useState(false);

  const handleShowMetadata = () => {
    setIsSelected(true);
  }

  const handleClose = () => {
    setIsSelected(false);
  }

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5173/upload", formData, {
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
    handleShowMetadata();
  };

  if (!isUploaded) {
    return null;
  }

  return (
    <div>
      {
        !isSelected ? (
          <section className="relative justify-center items-center bg-white
     ml-[5%] mt-6 w-[880px] h-[530px] border border-gray-500 rounded-[25px]">
            <div className="m-5">
              <h1 className="text-center font-semibold text-4xl">Select Document</h1>
            </div>
            <div className="ml-20">
              <h2>Import your document</h2>
            </div>
            <div className="flex flex-col justify-center items-center
      border-2 m-20 h-[50%]
       border-dashed border-gray-500 rounded-xl">
              <p className="text-center">Select and upload your file</p>
              <div className="flex mt-20 justify-center gap-3">

                <div className="flex flex-row justify-center items-center">
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={handleUpload} className="flex items-center gap-1">
                    <RiFolderUploadLine />
                    Upload
                  </button>
                </div>

              </div>
            </div>
          </section>
        ) : (
          <Metadata isOpen={isSelected} onClose={handleClose} />
        )
      }
    </div>

  )
}

export default Upload