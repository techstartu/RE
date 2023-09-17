import React from "react";
import { BsBarChartLine } from "react-icons/bs";
import "./CompanyDashboard.css";

// ManageJobCard component displays job-related statistics in a card format
const ManageJobCard = (props) => {
  return (
    <>
      <div className="company-dashboard-job-card">
        <div className="company-dashbaord-job-card-top-div">
          {/* Display the type of job-related statistic, e.g., "Job Post" */}
          <p className="company-dashbaord-job-card-top-div-para">
            Job {props.for}
          </p>
          {/* Display a statistic with an icon (e.g., a bar chart icon) */}
          <div className="company-dashboard-stats-with-icon">
            <p>
              <BsBarChartLine />
            </p>
            {/* Display the statistic value, e.g., "0.0" */}
            <p>0.0</p>
          </div>
        </div>
        <div className="company-dashboard-job-card-middle-div">
          {/* Display the count of the statistic, defaulting to 0 if not provided */}
          <p>{props.count ? props.count : 0}</p>
        </div>
        <div className="company-dashboard-job-card-bottom-div">
          <p>
            {/* Display a label based on the type of statistic, e.g., "Jobs" */}
            {props.for === "Post"
              ? "Jobs"
              : props.for === "Applied"
              ? "Applicants"
              : "Viewers"}
          </p>
        </div>
      </div>
    </>
  );
};

export default ManageJobCard;
