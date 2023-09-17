import React, { useRef, useState } from "react";
import Styles from "./components/JobStep.modules.css"; // Importing CSS styles (assuming it's for styling this component).
import DetailPage from "./DetailPage"; // Importing a DetailPage component (currently commented out).

function JobStep() {
  const fileInputRef = useRef(null); // Create a reference to the file input element.
  const [selectedFileName, setSelectedFileName] = useState(""); // State to track the selected file name.

  // Function to handle file input change event.
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedFileName(selectedFile.name);
  };

  // Function to trigger a click on the file input element when a button is clicked.
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mdiv">
      {/* Step 1 */}
      <div className="p-0 w-100 stp">
        <h2 className="stp1">Step 1</h2>
      </div>

      {/* File Upload Card */}
      <div className={`container ncard m-0 Card col-lg-3 pt-2`}>
        <div className="text-center bcard mt-1 m-auto">
          {selectedFileName ? (
            <p className="mt-4">{selectedFileName}</p>
          ) : (
            <h3 className="mt-4">
              Drop your file here to upload File {selectedFileName}
            </h3>
          )}

          {/* Hidden file input element */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {/* File upload icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="31"
            viewBox="0 0 30 31"
            fill="none"
          >
            <path
              d="M16.3946 0.705511C15.6026 -0.0644675 14.3364 -0.0466424 13.5664 0.745324L1.01892 13.6511C0.248941 14.4431 0.266766 15.7093 1.05873 16.4793C1.8507 17.2493 3.1169 17.2314 3.88688 16.4395L15.0402 4.96764L26.5121 16.121C27.304 16.8909 28.5702 16.8731 29.3402 16.0812C30.1102 15.2892 30.0924 14.023 29.3004 13.253L16.3946 0.705511ZM17.3943 30.1086L17.0002 2.11134L13.0006 2.16764L13.3947 30.1649L17.3943 30.1086Z"
              fill="black"
            />
          </svg>

          <div className="mt-2">
            <p>File types: .docx, .doc, .pdf, .txt, .odt or .rtf.</p>
            <p>Up to 2.5 MB</p>
          </div>

          {/* Button to trigger file input */}
          <button onClick={handleButtonClick} className="jbtn mbtn">
            choose your file
          </button>
        </div>
      </div>

      {/* Build CV Card */}
      <div className={`container ncards m-0 mt-3 Card col-lg-3 pt-2`}>
        <div className="text-center">
          <h3>Build your CV</h3>
          <p>We can help you create a CV in minutes.</p>
          <button className="jbtn mt-4">build your cv</button>
        </div>
      </div>

      {/* Step 2 */}
      <h2 className="stp2 w-100 stp mt-3">Step 2</h2>

      {/* Complete Registration Card */}
      <div className={`container ncardss m-0 Card col-lg-3 pt-2`}>
        <div className="text-center">
          <button className="jbtns">Complete your registration</button>
        </div>
        <button className="jbtn text-center mt-5 cbtn">create account</button>
      </div>
    </div>
  );
}

export default JobStep;
