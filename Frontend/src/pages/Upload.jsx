
import { useState } from "react"
import upload from "../assets/upload-icon.png"
import Metadata from "./Metadata"

const Upload = ({isUploaded}) => {

  const [isSelected, setIsSelected] = useState(false);

  const handleShowMetadata = () => {
    setIsSelected(true);
  }

  const handleClose = () => {
    setIsSelected(false);
  }

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
      border-2 m-20 h-[260px]
       border-dashed border-gray-500 rounded-lg">
              <p className="text-center">Drag and drop your file</p>
              <div className="flex mt-20 justify-center gap-3">
                <img src={upload} alt="" height={24} width={24} />
                <button className="" onClick={handleShowMetadata}>
                  <p>Select file</p>
                </button>
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