import React, { useState, useEffect } from 'react';
import '../Experiences/DataDisplay.css'; // Import the CSS file for styling
import axios from 'axios'; // Import Axios for making HTTP requests
import Modal from 'react-modal'; // Import Modal for displaying image popups

const DisplayAwards = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [data, setData] = useState(null); // State to store award data
  const [showImagePopup, setShowImagePopup] = useState(false); // State to manage image popup visibility
  const [selectedImageData, setSelectedImageData] = useState(''); // State to store the selected image data

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  // Function to open the image popup
  const openImagePopup = (imageData) => {
    setSelectedImageData(imageData);
    setShowImagePopup(true);
  };

  // Function to close the image popup
  const closeImagePopup = () => {
    setShowImagePopup(false);
    setSelectedImageData('');
  };

  // UseEffect to fetch award data from the server when the component mounts
  useEffect(() => {
    const apiUrl = '/user/award/getData'; // Define the API endpoint
    const token = localStorage.getItem('token'); // Get the user's token from local storage

    // Set up headers with the authorization token
    const headers = {
      Authorization: token,
    };

    // Make a GET request to the server to fetch award data
    axios.get(apiUrl, { headers })
      .then((response) => {
        setData(response.data.awards[0]); // Store the first award data in the state
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="data-container">
      {data && (
        <div className="data-box">
          <div className="dots-button" onClick={toggleDropdown}>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-profile">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )}
          <div className="data-heading">{data.awardTitle}</div>
          <div className="data-dates">
            {/* Format the issue date in a desired format */}
            {new Date(data.issueDate).toLocaleDateString(
              'en-GB',
              { day: 'numeric', month: 'short', year: 'numeric' }
            )}
          </div>
          <div className="data-company">Institute: {data.institute}</div>
          <div className="data-description">
            {/* Render the award image with a click event to open the image popup */}
            <img
              src={data.awardImage}
              alt="Image"
              style={{ cursor: 'pointer', maxWidth: '200px', maxHeight: '200px' }}
              onClick={() => openImagePopup(data.awardImage)}
            />
          </div>
        </div>
      )}
      {/* Render the image popup when showImagePopup is true */}
      <Modal
        isOpen={showImagePopup}
        onRequestClose={closeImagePopup}
        contentLabel="Image Popup"
      >
        <button className="close-button" onClick={closeImagePopup}>X</button>
        {selectedImageData && (
          <img
            src={selectedImageData}
            alt="Image"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        )}
      </Modal>
    </div>
  );
};

export default DisplayAwards;
