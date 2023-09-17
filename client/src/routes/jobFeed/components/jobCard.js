import React from "react";
import ApplyJob from "./applyJob";

const JobCard = ({ selectedJob }) => {
  return (
    <div
      className="card"
      style={{
        paddingLeft: "4%",
        borderRadius: "0 23px 0 0",
        maxHeight: "600px",
        overflowY: "auto",
      }}
    >
      {/* Header section with job title, pay, and ApplyJob component */}
      <div
        className="d-flex align-items-center justify-content-center px-2 py-3 mb-3"
        style={{
          borderBottom: "1px solid #6D0E9D",
          position: "sticky",
          top: "0px",
          background: "white",
          gap: "5px",
        }}
      >
        <div className="col-lg">
          <h3 className="selectedJobTitle p-0">{selectedJob.jobTitle}</h3>
        </div>
        <div>
          <p className="displayJobPay m-0">
            {selectedJob.minSR ? selectedJob.minSR : "Unpaid"}
          </p>
        </div>
        <div className="d-flex align-items-center">
          {/* ApplyJob component */}
          <ApplyJob job={selectedJob} />
        </div>
      </div>

      {/* Location section */}
      <div className="selectedJobLocation p-0 mb-3 d-flex gap-3 align-items-center">
        {/* Location icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="19"
          viewBox="0 0 21 19"
          fill="none"
        >
          <path
            d="M0.5 19V4H6.5V0H14.5V4H20.5V19H0.5ZM8.5 4H12.5V2H8.5V4Z"
            fill="black"
          />
        </svg>
        <p className="m-0">{selectedJob.jobType}</p>
      </div>

      {/* Location text */}
      <div className="selectedJobLocation p-0 mb-3 d-flex gap-3 align-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="28"
          viewBox="0 0 23 28"
          fill="none"
        >
          <path
            d="M11.5 16C10.5111 16 9.5444 15.7068 8.72215 15.1574C7.89991 14.6079 7.25904 13.8271 6.8806 12.9134C6.50217 11.9998 6.40315 10.9945 6.59608 10.0246C6.789 9.05465 7.26521 8.16373 7.96447 7.46447C8.66373 6.76521 9.55465 6.289 10.5246 6.09608C11.4945 5.90315 12.4998 6.00217 13.4134 6.3806C14.3271 6.75904 15.1079 7.39991 15.6574 8.22215C16.2068 9.0444 16.5 10.0111 16.5 11C16.4984 12.3256 15.9711 13.5964 15.0338 14.5338C14.0964 15.4711 12.8256 15.9984 11.5 16ZM11.5 8C10.9067 8 10.3266 8.17595 9.83329 8.50559C9.33994 8.83524 8.95543 9.30377 8.72836 9.85195C8.5013 10.4001 8.44189 11.0033 8.55765 11.5853C8.6734 12.1672 8.95912 12.7018 9.37868 13.1213C9.79824 13.5409 10.3328 13.8266 10.9147 13.9424C11.4967 14.0581 12.0999 13.9987 12.6481 13.7716C13.1962 13.5446 13.6648 13.1601 13.9944 12.6667C14.3241 12.1734 14.5 11.5933 14.5 11C14.4992 10.2046 14.1829 9.442 13.6204 8.87956C13.058 8.31712 12.2954 8.0008 11.5 8Z"
            fill="black"
          />
          <path
            d="M11.5 28L3.06401 18.051C2.94679 17.9016 2.83079 17.7513 2.71601 17.6C1.27499 15.7018 0.496519 13.3832 0.500012 11C0.500012 8.08262 1.65894 5.28473 3.72184 3.22183C5.78474 1.15893 8.58263 0 11.5 0C14.4174 0 17.2153 1.15893 19.2782 3.22183C21.3411 5.28473 22.5 8.08262 22.5 11C22.5035 13.3821 21.7254 15.6996 20.285 17.597L20.284 17.6C20.284 17.6 19.984 17.994 19.939 18.047L11.5 28ZM4.31201 16.395C4.31401 16.395 4.54601 16.703 4.59901 16.769L11.5 24.908L18.41 16.758C18.454 16.703 18.688 16.393 18.689 16.392C19.8662 14.8411 20.5023 12.947 20.5 11C20.5 8.61305 19.5518 6.32387 17.864 4.63604C16.1761 2.94821 13.887 2 11.5 2C9.11306 2 6.82388 2.94821 5.13605 4.63604C3.44822 6.32387 2.50001 8.61305 2.50001 11C2.49791 12.9482 3.13379 14.8434 4.31201 16.395Z"
            fill="black"
          />
        </svg>
        <p className="m-0">location: </p>
        <p className="m-0">{selectedJob.location}</p>
      </div>

      {/* Skills section */}
      <div className="selectedJobLocation p-0 mb-3 d-flex gap-3">
        <img src="/skillIcon.png" alt="skill icon" height={30} />
        <p className="m-0">Skills: </p>
        <p className="m-0 fs-0.25 w-60">
          {/* Skill description */}
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore......
        </p>
      </div>

      {/* About the Job section */}
      <div className="aboutTheJob mb-3 mt-2">About The Job</div>

      {/* Job Description */}
      <div className="mb-3">
        <h5 className="selectedJobDescription">Job Description:</h5>
        <p className="insideDescription">{selectedJob.jobDescription}</p>
      </div>

      {/* Responsibilities */}
      <div className="mb-3">
        <h5 className="selectedJobDescription">Responsibilities:</h5>
        <ul className="insideDescription">
          {selectedJob.responsibilities &&
            selectedJob.responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
        </ul>
      </div>

      {/* Qualifications */}
      <div>
        <h5 className="selectedJobDescription">Qualifications:</h5>
        <ul className="insideDescription">
          {selectedJob.jobLevel}
          {selectedJob.qualifications &&
            selectedJob.qualifications.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default JobCard;
