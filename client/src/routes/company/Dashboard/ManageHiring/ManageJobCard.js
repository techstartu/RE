import React from "react";

const ManageJobCard = ({ job, changeJob, selectedJob }) => {
  console.log(selectedJob, job._id);
  return (
    <>
      <div
        className="manage-hiring-job-card"
        style={selectedJob === job._id ? { background: "#F5F7FA" } : {}}
      >
        <div className="manage-hiring-job-card-top-div">
          {/* Display job title */}
          <p className="manage-hiring-job-card-top-div-para">{job.jobTitle}</p>
          {/* Clickable element to see job details */}
          <div
            className="manage-hiring-stats-with-icon"
            onClick={() => changeJob(job._id)}
          >
            <p>See Details</p>
          </div>
        </div>
        <div className="manage-hiring-job-card-middle-div">
          {/* Placeholder for displaying candidate-related information */}
          <p>Candidates</p>
        </div>
        <div className="manage-hiring-job-card-bottom-div">
          <div className="manage-hiring-job-card-count-div">
            <div>
              <p>Total</p>
              {/* Display the total number of applications */}
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.3rem",
                }}
              >
                {job.applications}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageJobCard;
