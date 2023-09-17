import React, { useState } from 'react';
import '../Experiences/DataDisplay.css';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const DisplayCour = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState(null);
  
  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Fetch certificate data from the server
    const apiUrl = '/user/certificate/getData';
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: token,
    };

    axios.get(apiUrl, { headers })
      .then((response) => {
        setData(response.data.certificate[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="data-container">
      {data && (
      <div className="data-box">
        {/* Dropdown button */}
        <div className="dots-button" onClick={toggleDropdown}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="dropdown-profile">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        )}
        
        <div className="data-heading">{data.courseTitle}</div>
        <div className="data-dates">
          {new Date(data.issueDate).toLocaleDateString(
            "en-GB",
            { day: "numeric", month: "short", year: "numeric" }
          )} - {" "}
          {new Date(data.expiryDate).toLocaleDateString(
            "en-GB",
            { day: "numeric", month: "short", year: "numeric" }
          )}
        </div>
        <div className="data-company">Organization: {data.organization}</div>
        {/* Link to course credentials */}
        <div className="data-description"><Link to={data.credentialURL}>Course Credentials</Link></div>
      </div>
      )}
    </div>
  );
};

export default DisplayCour;
