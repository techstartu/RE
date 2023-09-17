import { useState, useEffect } from "react";
import { FaEllipsisH, FaEye } from "react-icons/fa";

import { toast } from "react-toastify";

import { Badge } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const RecentJobPosts = ({ jobID }) => {
  const [activeTableButton, setActiveTableButton] = useState();
  const [allApplicants, setAllApplicants] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [displayResume, setDisplayResume] = useState("");

  //for displaying the number of rows per page
  const [rowsToShow, setRowsToShow] = useState(4);

  //for actual pagination
  const [currentPage, setCurrentPage] = useState(1);

  // const startIndex = (currentPage - 1) * rowsToShow;
  // const endIndex = startIndex + rowsToShow;
  // const currentData = exampleData.slice(startIndex, endIndex);

  const totalPages = allApplicants
    ? Math.ceil(allApplicants.length / rowsToShow)
    : 0;

  const getAllApplicants = async () => {
    try {
      const res = await fetch(`/job/getApplicantssOfAJob/${jobID}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();

      // CHANGE THIS TO ACUTAL DATA RETURNED BY DATABASE LATER
      // setApplicants(exampleData);
      setApplicants(data);
      setAllApplicants(data);

      console.log("Data is: ", data);
    } catch (error) {
      toast.error("error in the backend");
    }
  };

  //for pagination
  //also use actual data here
  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsToShow;
    const endIndex = startIndex + rowsToShow;
    const paginatedData = allApplicants.slice(startIndex, endIndex);
    // const paginatedData = data.slice(startIndex, endIndex);
    setApplicants(paginatedData);
  }, [currentPage, rowsToShow]);

  useEffect(() => {
    getAllApplicants();
  }, [jobID]);

  const ResumeStyle = {
    width: "500px",
    height: "100%",
    position: "absolute",
    top: "30px",
    left: "50px",
  };

  const handleShowPDF = (resume) => {
    setDisplayResume(resume);
  };

  return (
    <div className="mange-hiring-recent-job-table-component">
      <div
        className="ResumeDisplay"
        style={displayResume ? { display: "flex" } : { display: "none" }}
        onClick={() => setDisplayResume("")}
      >
        <embed src={`${displayResume}`} />
      </div>
      <div className="manage-hiring-recent-job-top-row">
        <div className="recent-job-top-row-heading">
          <h1>Candidates</h1>
        </div>
        {/* <div className="manage-hiring-recent-job-top-row-buttons">
          <ButtonGroup>
            <Button>Rejected</Button>
            <Button>Selected</Button>
            <Button>All</Button>
          </ButtonGroup>
        </div> */}
      </div>
      <div className="recent-job-post-table-container">
        <table className="manage-hiring-recent-job-table">
          <thead className="manage-hiring-table-head">
            <tr>
              <th>Name</th>
              <th>Education</th>
              <th>Applied Date</th>
              <th>Hiring Stage</th>
              <th>Resume</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {applicants.length ? (
              applicants.slice(0, rowsToShow).map((applicant, i) => {
                return (
                  <tr key={i} className="manage-hiring-table-row-body">
                    <td>{applicant.user.firstName}</td>
                    <td>
                      {applicant.education ? applicant.education.degree : ""}
                    </td>
                    <td>{applicant.appliedDate.substring(0, 10)}</td>
                    <td>
                      <Badge className="rounded-pill manage-hiring-badge">
                        {applicant.hiringStage}
                      </Badge>
                    </td>
                    <td>
                      <FaEye
                        onClick={() => handleShowPDF(applicant.resume)}
                        style={{ cursor: "pointer" }}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>
                  <button
                    style={{
                      borderRadius: 25,
                      padding: "3px 5px",
                      fontSize: 14,
                    }}
                  >
                    No Post
                  </button>
                </td>
                <td>--</td>
                {/* <td>
                  <FaEllipsisH />
                </td> */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="hiring-manager-table-pagination-footer">
        <div>
          <div>
            <button
              className="pagination-button"
              disabled={currentPage <= 1}
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              &lt;
            </button>
          </div>
          <div>{currentPage}</div>
          <div>/</div>
          <div>{totalPages}</div>
          <div>
            <button
              className="pagination-button"
              disabled={currentPage >= totalPages}
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              &gt;
            </button>
          </div>
        </div>
        <div className="hiring-manager-pagination-modal">
          <span>Rows per page: </span>
          <select
            name=""
            id=""
            value={rowsToShow}
            onChange={(e) => {
              setRowsToShow(e.target.value);
            }}
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RecentJobPosts;

//just here for the example
// const exampleData = [
//   {
//     user: {
//       firstName: "John",
//       lastName: "Doe",
//     },
//     education: {
//       degree: "Bachelor's",
//     },
//     appliedDate: "2023-08-15T12:30:00Z",
//   },
//   {
//     user: {
//       firstName: "Jane",
//       lastName: "Smith",
//     },
//     education: {
//       degree: "Master's",
//     },
//     appliedDate: "2023-08-16T09:15:00Z",
//   },
//   {
//     user: {
//       firstName: "Michael",
//       lastName: "Johnson",
//     },
//     education: {
//       degree: "PhD",
//     },
//     appliedDate: "2023-08-17T14:45:00Z",
//   },
//   {
//     user: {
//       firstName: "Emily",
//       lastName: "Brown",
//     },
//     education: {
//       degree: "Bachelor's",
//     },
//     appliedDate: "2023-08-18T11:30:00Z",
//   },
//   {
//     user: {
//       firstName: "William",
//       lastName: "Williams",
//     },
//     education: {
//       degree: "Master's",
//     },
//     appliedDate: "2023-08-19T08:00:00Z",
//   },
//   {
//     user: {
//       firstName: "Alice",
//       lastName: "Johnson",
//     },
//     education: {
//       degree: "PhD",
//     },
//     appliedDate: "2023-08-20T14:45:00Z",
//   },
//   {
//     user: {
//       firstName: "Ella",
//       lastName: "Davis",
//     },
//     education: {
//       degree: "Bachelor's",
//     },
//     appliedDate: "2023-08-21T11:30:00Z",
//   },
//   {
//     user: {
//       firstName: "James",
//       lastName: "Smith",
//     },
//     education: {
//       degree: "Master's",
//     },
//     appliedDate: "2023-08-22T09:15:00Z",
//   },
//   {
//     user: {
//       firstName: "Olivia",
//       lastName: "Brown",
//     },
//     education: {
//       degree: "Bachelor's",
//     },
//     appliedDate: "2023-08-23T11:30:00Z",
//   },
//   {
//     user: {
//       firstName: "Liam",
//       lastName: "Williams",
//     },
//     education: {
//       degree: "Master's",
//     },
//     appliedDate: "2023-08-24T08:00:00Z",
//   },
// ];
