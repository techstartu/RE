import React, { useState } from 'react';
import '../Experiences/DataDisplay.css'; // Import the CSS file for styling
import axios from 'axios';
import { useEffect } from 'react';

const DisplayCour = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState(null);
  
  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Fetch course data from the backend API
    const apiUrl = '/user/course/getData';
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: token,
    };

    axios.get(apiUrl, { headers })
      .then((response) => {
        setData(response.data.courses[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        
          <div className="data-heading">{data.courseName}</div>
          <div className="data-dates">
          {new Date(data.startDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" }
          )} - {" "}
          {new Date(data.endDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "short", year: "numeric" }
          )}
            
          </div>
          <div className="data-company">Institute: {data.instituteName}</div>
          {/* Uncomment the lines below to display additional information */}
          {/* <div className="data-description-heading">Description:</div> */}
          {/* <div className="data-description">{data.school}</div> */}
        
      </div>
      )}
    </div>
  );
};

export default DisplayCour;
