import React, { useState } from "react";
import "./DataDisplay.css";
import axios from "axios";
import { useEffect } from "react";

// Helper function to format dates in a more readable way
function toProperDate(date) {
  const inputDate = new Date(date);
  const month = inputDate.toLocaleString("default", { month: "long" });
  const year = inputDate.getFullYear();

  const result = `${month} ${year}`;
  return result;
}

const DataDisplay = ({ update }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState(null);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    // Fetch user job experience data from the backend
    const apiUrl = "/user/jobExperience/getData";
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: token,
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        // Set the experience flag in localStorage based on the fetched data
        if (response.data.jobs.length) localStorage.setItem("experience", "1");
        else localStorage.removeItem("experience");
        setData(response.data.jobs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [update]);

  const openEditor = () => {};

  return (
    <div style={{ padding: "18px 16px 0 16px" }}>
      {data &&
        data.map((experience) => (
          <div
            className="otherDataAboutUser"
            style={{
              marginBottom: "15px",
            }}
            key={experience._id}
          >
            <div
              className="d-flex align-items-center"
              style={{ justifyContent: "space-between" }}
            >
              <h4
                className="p-0 m-0"
                style={{
                  fontSize: "16px",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                {experience.jobTitle}
              </h4>
              {/* Uncomment the following lines when editing functionality is implemented */}
              {/* <span
                style={{
                  color: "#1e1ef0",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
                onClick={openEditor}
              >
                Edit
              </span> */}
            </div>
            <p
              className="p-0 m-0"
              style={{ fontSize: "16px", fontWeight: "300" }}
            >
              {experience.company}
            </p>
            <p
              className="p-0 m-0"
              style={{ fontSize: "16px", fontWeight: "300" }}
            >
              {/* Display properly formatted start and end dates */}
              {toProperDate(experience.startDate)} -{" "}
              {experience.currentlyWorking
                ? "Present"
                : toProperDate(experience.endDate)}
            </p>
            <hr />
          </div>
        ))}
    </div>
  );
};

export default DataDisplay;
