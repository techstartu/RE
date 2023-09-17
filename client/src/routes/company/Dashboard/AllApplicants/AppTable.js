import React, { useState } from "react";
import "./AppTable.css";
import axios from "axios";
import { toast } from "react-toastify";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getStatusIcon = (status) => {
  switch (status) {
    case "On Going":
      return (
        <div className="status-rectangle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
          >
            <circle cx="3" cy="3" r="3" fill="#007F00" />
          </svg>
          Ongoing
        </div>
      );
    case "Cancel":
      return (
        <div className="status-rectangle-cancel">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
          >
            <circle cx="3" cy="3" r="3" fill="#F90000" />
          </svg>
          Cancel
        </div>
      );
    case "Hold":
      return (
        <div className="status-rectangle-hold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="6"
            height="6"
            viewBox="0 0 6 6"
            fill="none"
          >
            <circle cx="3" cy="3" r="3" fill="#F99500" />
          </svg>
          Hold
        </div>
      );
    default:
      return null;
  }
};

const AppTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSortOption, setSelectedSortOption] = useState("Name");
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hiringStage, setHiringStage] = useState([]);
  const [update, setUpdate] = useState(true);
  const itemsPerPage = 10;
  const token = localStorage.getItem("token");

  const handleFilterClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSortOptionChange = (option) => {
    setSelectedSortOption(option);
    setShowDropdown(false);
  };

  useEffect(() => {
    const apiUrl = "/job/getallapplicants";
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setData(response.data.applicants);
        const res = response.data.applicants;
        // console.log(response);
        const initialSelectedExperiences = [];
        console.log("data ki length", res.length);
        for (let i = 0; i < res.length; i++) {
          console.log(i, res[i]);
          initialSelectedExperiences.push(res[i].hiringStage);
        }
        console.log("data experince", initialSelectedExperiences);
        setHiringStage(initialSelectedExperiences);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [update]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePost = () => {
    navigate("/postjobs");
  };

  const ChangeHiringStage = (index, value) => {
    var newArr = hiringStage;
    newArr[index] = value;
    // console.log([...newArr]);
    setHiringStage([...newArr]);
    fetch(`/job/changeStage/${data[index].jobID}/${data[index]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ stage: value }),
    });
  };

  const deleteApplication = async (application) => {
    const deleteIt = window.confirm("Do you want to delete it?");
    if (!deleteIt) return;

    try {
      const res = await fetch(
        `/job/deleteApplication/${application.jobID}/${application._id}`,
        {
          method: "delete",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw Error("Backend Error Occured");
      }
    } catch (err) {
      console.log("error Toast");
      toast.error("Backend Error Occured");
      return;
    }
    console.log("succeess");
    toast.success("Application Deleted Successfully");

    setUpdate(!update);
  };

  return (
    <>
      <div className="container-app-search">
        <div className="rectangle-app-search">
          <div className="dropdown-appsearch">
            <button
              className="filter-button-app-search"
              onClick={handleFilterClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M12 12L20 4V0H0V4L8 12V20L12 16V12Z"
                    fill="#CF1350"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              &nbsp;&nbsp;Filter
            </button>
            {showDropdown && (
              <div className="dropdown-content-appsearch">
                <h3>Sort By</h3>
                <div className="dropdown-options">
                <label className="label-dropdown-appsearch">
                  Name 
                </label>
                  <input
                    type="radio"
                    value="Name"
                    checked={selectedSortOption === "Name"}
                    onChange={() => handleSortOptionChange("Name")}
                  />
                  </div>
                  <div className="dropdown-options">
                <label>
                  Job Title
                  </label>
                  <input
                    type="radio"
                    value="Job Title"
                    checked={selectedSortOption === "Job Title"}
                    onChange={() => handleSortOptionChange("Job Title")}
                  />
                </div>
                {/* <label>
                Applied Date&nbsp;&nbsp;
                <input
                  type="radio"
                  value="Applied Date"
                  checked={selectedSortOption === 'Applied Date'}
                  onChange={() => handleSortOptionChange('Applied Date')}
                />
                
              </label> */}
              </div>
            )}
          </div>
          <div className="space" />
          <div className="search-bar-app-search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M13.4097 14.8822C11.7399 16.1799 9.63851 16.7922 7.53338 16.5942C5.42824 16.3963 3.47766 15.403 2.07881 13.8166C0.679961 12.2303 -0.0619809 10.1701 0.00405863 8.05565C0.0700982 5.94118 0.939153 3.9314 2.43427 2.43552C3.92939 0.939633 5.93814 0.0701341 8.05152 0.00406071C10.1649 -0.0620127 12.224 0.680308 13.8096 2.07987C15.3951 3.47944 16.3879 5.43102 16.5857 7.53723C16.7836 9.64345 16.1717 11.7459 14.8745 13.4166L19.6936 18.2201C20.1016 18.6267 20.1022 19.2872 19.695 19.6946C19.2878 20.1021 18.6273 20.1017 18.2204 19.6939L13.4201 14.8822H13.4097ZM8.31916 14.5495C9.13773 14.5495 9.94829 14.3882 10.7045 14.0748C11.4608 13.7614 12.148 13.302 12.7268 12.7229C13.3056 12.1438 13.7647 11.4563 14.078 10.6996C14.3913 9.94298 14.5525 9.13201 14.5525 8.31302C14.5525 7.49403 14.3913 6.68306 14.078 5.92641C13.7647 5.16976 13.3056 4.48225 12.7268 3.90314C12.148 3.32402 11.4608 2.86465 10.7045 2.55123C9.94829 2.23782 9.13773 2.07651 8.31916 2.07651C6.66598 2.07651 5.08051 2.73356 3.91153 3.90314C2.74256 5.07271 2.08583 6.659 2.08583 8.31302C2.08583 9.96705 2.74256 11.5533 3.91153 12.7229C5.08051 13.8925 6.66598 14.5495 8.31916 14.5495Z"
                fill="#8B83BA"
              />
            </svg>
            <input
              type="text"
              placeholder="Search Users by Name, Email or Date"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <div className="space" />
          <button className="post-button-app-search" onClick={handlePost}>
            Post job
          </button>
        </div>
      </div>
      <div className="table-container">
        <div className="allapplicants-heading"> Applicants List</div>
        <div
          style={{ overflowX: "auto", marginBottom: "20px", padding: "0 20px" }}
        >
          <table className="custom-table">
            <thead>
              <tr>
                {/* <th>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M17.7778 0H2.22222C0.994923 0 0 0.994923 0 2.22222V17.7778C0 19.0051 0.994923 20 2.22222 20H17.7778C19.0051 20 20 19.0051 20 17.7778V2.22222C20 0.994923 19.0051 0 17.7778 0Z"
                    fill="#6D0E9D"
                  />
                  <path
                    d="M4 12L6.76923 15L16 5"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </th> */}
                <th>Name</th>
                <th>Applied Date</th>
                <th>Job Role</th>
                <th>Hiring Stage</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentItems
                .filter((applicant) => {
                  const propertyToSearch =
                    selectedSortOption === "Name"
                      ? applicant.firstName?.toLowerCase() || ""
                      : selectedSortOption === "Job Title"
                      ? applicant.jobRole?.toLowerCase() || ""
                      : "";
                  return (
                    searchValue.toLowerCase() === "" ||
                    propertyToSearch.includes(searchValue)
                  );
                })
                .map((applicant, index) => {
                  // console.log(hiringStage);
                  return (
                    <tr key={index}>
                      {/* <td>
                    <input
                      type="checkbox"
                      className="checkbox-container"
                    ></input>
                  </td> */}
                      <td>{applicant.firstName}</td>
                      <td>
                        {new Date(applicant.appliedDate).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" }
                        )}
                      </td>
                      <td>{applicant.jobRole}</td>
                      <td>
                        <select
                          id="jobType"
                          className="stage-rectangle"
                          value={hiringStage[index]}
                          onChange={(e) =>
                            ChangeHiringStage(index, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Interviewed">Interviewed</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Hired">Hired</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <circle cx="18" cy="18" r="18" fill="white" />
                        <path
                          d="M17.1566 11.6868H11.5904C11.1686 11.6868 10.7641 11.8544 10.4658 12.1526C10.1676 12.4509 10 12.8554 10 13.2772V24.4096C10 24.8314 10.1676 25.2359 10.4658 25.5342C10.7641 25.8324 11.1686 26 11.5904 26H22.7228C23.1446 26 23.5491 25.8324 23.8474 25.5342C24.1456 25.2359 24.3132 24.8314 24.3132 24.4096V18.8434M23.1204 10.4941C23.4368 10.1777 23.8658 10 24.3132 10C24.7605 10 25.1896 10.1777 25.5059 10.4941C25.8223 10.8104 26 11.2395 26 11.6868C26 12.1342 25.8223 12.5632 25.5059 12.8796L17.9518 20.4338L14.7711 21.2289L15.5662 18.0482L23.1204 10.4941Z"
                          stroke="#524E4E"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg> */}
                          <svg
                            onClick={() => deleteApplication(applicant)}
                            style={{ cursor: "pointer" }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            viewBox="0 0 36 36"
                            fill="none"
                          >
                            <circle cx="18" cy="18" r="18" fill="white" />
                            <path
                              d="M11 13.2H12.6M12.6 13.2H25.4M12.6 13.2V24.4C12.6 24.8243 12.7686 25.2313 13.0686 25.5314C13.3687 25.8314 13.7757 26 14.2 26H22.2C22.6243 26 23.0313 25.8314 23.3314 25.5314C23.6314 25.2313 23.8 24.8243 23.8 24.4V13.2M15 13.2V11.6C15 11.1757 15.1686 10.7687 15.4686 10.4686C15.7687 10.1686 16.1757 10 16.6 10H19.8C20.2243 10 20.6313 10.1686 20.9314 10.4686C21.2314 10.7687 21.4 11.1757 21.4 11.6V13.2M16.6 17.2V22M19.8 17.2V22"
                              stroke="#524E4E"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div style={{ width: "100%" }}>
          {/* Pagination controls */}
          <div className="pagination-apptable">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-apptable-button"
            >
              Previous
            </button>
            <span className="pagination-apptable-page">
              {currentPage}
              {"/"}
              {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastItem >= data.length}
              className="pagination-apptable-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppTable;
