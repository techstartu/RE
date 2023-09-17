import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Experiences/ExpForm.css"; // Import the CSS file for styling
import axios from "axios"; // Import Axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast for displaying notifications

const AwardsForm = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook from React Router
  const fileInputRef = useRef(null); // Create a ref for the file input element

  // Function to handle the "Choose File" button click
  const handleChooseFile = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input click event
  };

  // State to manage form data
  const [formData, setFormData] = useState({
    awardTitle: "",
    institute: "",
    issueDate: "",
    awardImage: null,
    description: "",
  });

  // Function to handle input field changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // Function to handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          awardImage: reader.result, // Set the image data as a base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the data to be sent to the server
    const formattedData = {
      awardTitle: formData.awardTitle,
      institute: formData.institute,
      issueDate: formData.issueDate,
      awardImage: formData.awardImage,
      description: formData.description,
    };

    // Get the user's token from local storage
    const token = localStorage.getItem("token");
    const apiUrl = "/user/award/postData"; // Define the API endpoint

    // Set up headers with the authorization token
    const headers = {
      Authorization: token,
    };

    // Make a POST request to the server
    axios
      .post(apiUrl, formattedData, { headers })
      .then((response) => {
        // Update the user's progress based on the server response
        const updateprogress = localStorage.getItem("progress");
        const newprogress = parseInt(updateprogress, 10);
        const addprogress = newprogress + response.data.progress;
        const finalprogress = addprogress.toString();
        toast.success(response.data.message); // Display a success toast notification
        localStorage.setItem("progress", finalprogress); // Update the progress in local storage
        setTimeout(() => {
          navigate("/awards/submit-awards"); // Redirect to the "submit-awards" page after a delay
        }, 1500); // Delay in milliseconds
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending data to the backend."); // Display an error toast notification
      });
  };

  return (
    <div className="form-container-cour">
      <div className="shadow-exp">
        <form onSubmit={handleSubmit}>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="awardTitle">
              Award Title
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="awardTitle"
              className="input-field-exp"
              placeholder=""
              required
              value={formData.awardTitle}
              onChange={handleChange}
            />
          </div>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="institute">
              Issued by (Company / Institute)
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="institute"
              className="input-field-exp"
              placeholder=""
              required
              value={formData.institute}
              onChange={handleChange}
            />
          </div>

          <div className="input-group-exp-1">
            <label className="label-exp" htmlFor="issueDate">
              Issue Date
              <span className="required-exp">*</span>
            </label>
            <input
              type="date"
              id="issueDate"
              className="input-field-exp"
              placeholder="DD-MM-YYYY"
              required
              value={formData.issueDate}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-exp-1">
            <label htmlFor="awardImage" className="label-exp">
              Award Image
              {/* <span className="required-exp">*</span> */}
            </label>
            <div className="file-input-wrapper">
              <button className="custom-file-button" onClick={handleChooseFile}>
                Choose Image
              </button>
              <input
                type="file"
                id="awardImage"
                className="input-field-awards"
                required
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="description-container-exp">
            <label className="label-exp" htmlFor="description">
              Description
              <span className="required-exp">*</span>
            </label>
            <input
              type="description"
              id="description"
              className="input-field-exp-1"
              placeholder=""
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="button-container-exp">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer /> {/* Render the ToastContainer for displaying toast notifications */}
    </div>
  );
};

export default AwardsForm;
