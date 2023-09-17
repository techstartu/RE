import React from "react";
import { useState } from "react";
import "./AppTable.css";

const AppSearch = () => {
  // State variables to manage filter dropdown and selected sorting option
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Name");

  // Function to handle filter button click
  const handleFilterClick = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle changing the selected sorting option
  const handleSortOptionChange = (option) => {
    setSelectedSortOption(option);
    setShowDropdown(false);
  };

  return (
    <div className="container-app-search">
      <div className="rectangle-app-search">
        <div className="dropdown-appsearch">
          {/* Filter button */}
          <button
            className="filter-button-app-search"
            onClick={handleFilterClick}
          >
            {/* Filter icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clipPath="url(#clip0)">
                <path d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z" fill="#8B83BA" />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            &nbsp;&nbsp;Filter
          </button>

          {/* Dropdown content */}
          {showDropdown && (
            <div className="dropdown-content-appsearch">
              <h3>Sort By</h3>

              {/* Radio buttons for sorting options */}
              <label>
                <p className="m-0 p-0">Name</p>
                <input
                  type="radio"
                  value="Name"
                  checked={selectedSortOption === "Name"}
                  onChange={() => handleSortOptionChange("Name")}
                />
              </label>
              <label>
                Job Title
                <p className="m-0 p-0">Job Title</p>
                <input
                  type="radio"
                  value="Job Title"
                  checked={selectedSortOption === "Job Title"}
                  onChange={() => handleSortOptionChange("Job Title")}
                />
              </label>
              <label>
                <p className="m-0 p-0">Applied Date</p>
                <input
                  type="radio"
                  value="Applied Date"
                  checked={selectedSortOption === "Applied Date"}
                  onChange={() => handleSortOptionChange("Applied Date")}
                />
              </label>
            </div>
          )}
        </div>

        {/* Empty div for spacing */}
        <div className="space" />

        {/* Search bar */}
        <div className="search-bar-app-search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M13.4097 14.8822C11.7399 16.1799 9.63851 16.7922 7.53338 16.5942C5.42824 16.3963 3.47766 15.4030.0781 13.8166C0.679961 12.2303 -0.0619809 10.1701 0.00405863 8.05565C0.0700982 5.94118 0.939153 3.9314 2.43427 2.43552C3.92939 0.939633 5.93814 0.0701341 8.05152 0.00406071C10.1649 -0.0620127 12.224 0.680308 13.8096 2.07987C15.3951 3.47944 16.3879 5.43102 16.5857 7.53723C16.7836 9.64345 16.1717 11.7459 14.8745 13.4166L19.6936 18.2201C20.1016 18.6267 20.1022 19.2872 19.695 19.6946C19.2878 20.1021 18.6273 20.1017 18.2204 19.6939L13.4201 14.8822H13.4097ZM8.31916 14.5495C9.13773 14.5495 9.94829 14.3882 10.7045 14.0748C11.4608 13.7614 12.148 13.3020 12.7268 12.7229C13.3056 12.1438 13.7647 11.4563 14.078 10.6996C14.3913 9.94298 14.5525 9.13201 14.5525 8.31302C14.5525 7.49403 14.3913 6.68306 14.078 5.92641C13.7647 5.16976 13.3056 4.48225 12.7268 3.90314C12.148 3.32402 11.4608 2.86465 10.7045 2.55123C9.94829 2.23782 9.13773 2.07651 8.31916 2.07651C6.66598 2.07651 5.08051 2.73356 3.91153 3.90314C2.74256 5.07271 2.08583 6.65900 2.08583 8.31302C2.08583 9.96705 2.74256 11.5533 3.91153 12.7229C5.08051 13.8925 6.66598 14.5495 8.31916 14.5495Z"
              fill="#8B83BA"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Users by Name, Email or Date"
          />
        </div>

        {/* Empty div for spacing */}
        <div className="space" />

        {/* Button to post a new job */}
        <button className="post-button-app-search">Post a new job</button>
      </div>
    </div>
  );
};

export default AppSearch;
