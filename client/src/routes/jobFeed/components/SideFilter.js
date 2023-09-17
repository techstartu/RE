import React, { useState, useEffect } from "react";

import Style from "./SideFilter.module.css";
import { Row } from "react-bootstrap";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const optionsOfSpecialism = [
  "IT & Telecom",
  "Admin, Secreterial & PA",
  "Accountance",
  "Customer Service",
  "Sale",
  "Art",
  "Management",
];
const optionsOfJobtyp = [
  "Permanent",
  "Temporary",
  "Contract",
  "Full Time",
  "Part Time",
];
const optionsOfPostedby = ["Agency", "Employee", "Reed"];

const SideFilter = ({ Search }) => {
  const [location, setLocation] = useState("Islamabad");
  const [salaryFrom, setSalaryFrom] = useState("$ Any");
  const [salaryTo, setSalaryTo] = useState("$ Any");
  const [datePosted, setDatePosted] = useState("All");

  // CHECKBOXES --- START
  const [remote, setRemote] = useState(false);
  const [selectedJobtype, setSelectedJobtype] = useState([]);
  const [selectedPostedby, setSelectedPostedby] = useState([]);
  const [selectedSpecialism, setSelectedSpecialism] = useState([]);
  // CHECKBOXES --- END

  // SEE MORE AND SEE LESS --- START
  const [specialismeSeeMore, setSpecialSeeMore] = useState(false);
  var sizeOfSpecialism = specialismeSeeMore ? optionsOfSpecialism.length : 5;
  const [jobTypeSeeMore, setJobTypeSeeMore] = useState(false);
  var sizeOfJobType = jobTypeSeeMore ? optionsOfJobtyp.length : 5;
  // SEE MORE AND SEE LESS --- END

  useEffect(() => {
    Search(
      location,
      salaryFrom,
      salaryTo,
      selectedJobtype,
      selectedSpecialism,
      datePosted
    );
  }, [
    location,
    salaryFrom,
    salaryTo,
    selectedJobtype,
    selectedSpecialism,
    datePosted,
  ]);
  const handleJobtype = (option) => {
    if (selectedJobtype.includes(option)) {
      setSelectedJobtype(selectedJobtype.filter((item) => item !== option));
    } else {
      setSelectedJobtype([...selectedJobtype, option]);
    }
  };
  // const handlePostedby = (option) => {
  //   if (selectedPostedby.includes(option)) {
  //     setSelectedPostedby(selectedPostedby.filter((item) => item !== option));
  //   } else {
  //     setSelectedPostedby([...selectedPostedby, option]);
  //   }
  //   console.log(selectedPostedby);
  // };
  const handleSpecialism = (option) => {
    if (selectedSpecialism.includes(option)) {
      setSelectedSpecialism(
        selectedSpecialism.filter((item) => item !== option)
      );
    } else {
      setSelectedSpecialism([...selectedSpecialism, option]);
    }
  };

  return (
    <>
      <Row
        className={`pt-4 pb-1 SideFilter ${Style.SideFilter}`}
        style={{ minWidth: "220px" }}
      >
        <div className="sliders">
          <h5 className={Style.h3}>Filter by</h5>
          {/* ---------- LOCATI0N ---------- */}
          {/* <div className="pt-4 pb-4">
            <h5 className={Style.h5}>Location</h5>
            <select
              className={Style.select}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="Islamabad">Islamabad</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Karachi">Karachi</option>
              <option value="Lahore">Lahore</option>
              <option value="Peshawar">Peshawar</option>
              <option value="Quetta">Quetta</option>
            </select>
          </div>
          <hr style={{ borderTop: "1px solid #CF1350", margin: 0 }} /> */}
          {/* ---------- SALARY RANGE ---------- */}
          <div className="pt-4 pb-2">
            <h5 className={Style.h5}>Salary Range</h5>
            <p className={`${Style.p} mt-2 mb-1`}>From</p>
            <select
              className={Style.select}
              value={salaryFrom}
              onChange={(e) => setSalaryFrom(e.target.value)}
            >
              <option value="$ Any">$ Any</option>
              <option value="$300">$300</option>
              <option value="$500">$500</option>
              <option value="$800">$800</option>
              <option value="$1000">$1000</option>
              <option value="$1200">$1200</option>
              <option value="$1400">$1400</option>
            </select>
            <p className={`${Style.p} mt-2 mb-1`}>To</p>
            <select
              className={Style.select}
              value={salaryTo}
              onChange={(e) => setSalaryTo(e.target.value)}
            >
              <option value="$ Any">$ Any</option>
              <option value="$300">$300</option>
              <option value="$500">$500</option>
              <option value="$800">$800</option>
              <option value="$1000">$1000</option>
              <option value="$1200">$1200</option>
              <option value="$1400">$1400</option>
            </select>
          </div>
          <hr style={{ borderTop: "1px solid #CF1350", margin: 0 }} />
          {/* ---------- JOB TYPE ---------- */}
          <div className={`${Style.JobType} pt-4 pb-4`}>
            <h5 className={`${Style.h5}`}>Job Type</h5>
            {optionsOfJobtyp.slice(0, sizeOfJobType).map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={selectedJobtype.includes(option)}
                  onChange={() => handleJobtype(option)}
                />{" "}
                {option}
              </label>
            ))}
          </div>
          <div
            className={`${Style.moreORless} pb-2`}
            style={!jobTypeSeeMore ? { display: "flex" } : { display: "none" }}
            onClick={() => setJobTypeSeeMore(true)}
          >
            See More
            <FaAngleDown />
          </div>
          <div
            className={`${Style.moreORless} pb-2`}
            style={jobTypeSeeMore ? { display: "flex" } : { display: "none" }}
            onClick={() => setJobTypeSeeMore(false)}
          >
            See Less
            <FaAngleUp />
          </div>
          <hr style={{ borderTop: "1px solid #CF1350", margin: 0 }} />
          {/* ---------- WORK FROM HOME ---------- */}
          {/* <div className="pt-4 pb-4">
            <label>
              <input
                type="checkbox"
                checked={remote}
                onChange={() => setRemote(!remote)}
              />{" "}
              Work From Home
            </label>
          </div>
          <hr style={{ borderTop: "1px solid #CF1350", margin: 0 }} /> */}
          {/* ---------- DATE POSTED ---------- */}
          <div className="pt-4 pb-4">
            <h5 className={Style.h5}>Date Posted</h5>
            <select
              className={Style.select}
              value={datePosted}
              onChange={(e) => setDatePosted(e.target.value)}
            >
              <option value="">All</option>
              <option value={1}>Today</option>
              <option value={7}>Last Week</option>
              <option value={30}>Last Month</option>
            </select>
          </div>
          <hr style={{ borderTop: "1px solid #CF1350", margin: 0 }} />
          {/* ---------- Specialism ---------- */}
          <div className={`${Style.JobType} pt-4 pb-2`}>
            <h5 className={`${Style.h5}`}>Specialism</h5>
            {optionsOfSpecialism.slice(0, sizeOfSpecialism).map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={selectedSpecialism.includes(option)}
                  onChange={() => handleSpecialism(option)}
                />{" "}
                {option}
              </label>
            ))}
          </div>
          <div
            className={`${Style.moreORless} pb-2`}
            style={
              !specialismeSeeMore ? { display: "flex" } : { display: "none" }
            }
            onClick={() => setSpecialSeeMore(true)}
          >
            See More
            <FaAngleDown />
          </div>
          <div
            className={`${Style.moreORless} pb-2`}
            style={
              specialismeSeeMore ? { display: "flex" } : { display: "none" }
            }
            onClick={() => setSpecialSeeMore(false)}
          >
            See Less
            <FaAngleUp />
          </div>
          <hr style={{ borderTop: "1px solid #CF1350", margin: 0 }} />
        </div>
      </Row>
    </>
  );
};

export default SideFilter;

{
  /* ---------- POSTED BY ---------- */
}
{
  /* <hr style={{ borderTop: "1px solid #CF1350", margin: 0 }} />
          <div className={`${Style.JobType} pt-4 pb-4`}>
            <h5 className={`${Style.h5}`}>Posted By</h5>
            {optionsOfPostedby.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={selectedPostedby.includes(option)}
                  onChange={() => handlePostedby(option)}
                />{" "}
                {option}
              </label>
            ))}
          </div> */
}
