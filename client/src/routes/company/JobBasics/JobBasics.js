import React, { useContext, useEffect } from "react";
import { UserContext } from "../companyContext";
import { useNavigate } from "react-router-dom";
import "./JobBasicst.css";
import Header from "../../Home/components/header";

export const JobBasics = () => {
  // Accessing state and context
  const { jobBasics, setjobBasics } = useContext(UserContext);

  // Handle input change
  const handleInputChange = (e) => {
    setjobBasics({ ...jobBasics, [e.target.id]: e.target.value });
    console.log(jobBasics);
  };

  const navigate = useNavigate();

  // Handle navigation to the next page
  const NextPage = (e) => {
    e.preventDefault();
    console.log("Running");
    navigate("/company/techdetail");
  };

  useEffect(() => {
    // Check for authentication and user type
    const token = localStorage.getItem("token");
    if (localStorage.getItem("userType") !== "company")
      navigate("/loginAsCompany");
    if (token === null && !token) {
      console.log("token not found");
      navigate("/company/createaccount");
    } else {
      console.log("Token found!");
    }
  }, []);

  return (
    <>
      <Header active="company" />
      <div className="create-account-main-container">
        <div className="Horizontal-Line-below-header-parent-jobBasics">
          {/* Progress indicators */}
          <div className="round-horizontal-1-jobBasics">1</div>
          <div className="line-horizontal-jobBasics"></div>
          <div className="round-horizontal-2-jobBasics">2</div>
          <div className="line-horizontal-2-jobBasics"></div>
          <div className="round-horizontal-1-jobBasics">3</div>
          <div className="line-horizontal-jobBasics"></div>
          <div className="round-horizontal-1-jobBasics">4</div>
          <div className="line-horizontal-jobBasics"></div>
          <div className="round-horizontal-1-jobBasics">5</div>
        </div>
        <div className="create-account-heading-container">
          <h1 className="create-account-heading">Add job Basics</h1>
        </div>
        <div className="create-account-form-container">
          <form action="" onSubmit={NextPage}>
            {/* Industry selection */}
            <div>
              <label htmlFor="industry" className="companyIndustry-jobBasics">
                Company's Industry
              </label>
              <select
                name=""
                id="industry"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Industry</option>
                <option value="IT&Telecom">IT & Telecom</option>
                <option value="Admin,Secreterial&PA">
                  Admin, Secreterial & PA
                </option>
                <option value="Accountance">Accountance</option>
                <option value="CustomerService">Customer Service</option>
                <option value="Art">Art</option>
                <option value="Management">Management</option>
              </select>
            </div>
            {/* Job Title input */}
            <div>
              <label htmlFor="jobTitle" className="companyIndustry-jobBasics">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                placeholder="Designer"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Job Type selection */}
            <div>
              <label htmlFor="jobType" className="companyIndustry-jobBasics">
                Job Type
              </label>
              <select
                name=""
                id="jobType"
                onChange={handleInputChange}
                required
              >
                <option value="">Select Job Type</option>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
                <option value="Part Time">Part Time</option>
                <option value="Full Time">Full Time</option>
              </select>
            </div>
            {/* Location input */}
            <div>
              <label htmlFor="location" className="companyIndustry-jobBasics">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="address"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Job Description textarea */}
            <div>
              <label
                htmlFor="jobDescription"
                className="companyIndustry-jobBasics"
              >
                Company Description
              </label>
              <textarea
                rows={7}
                type="text"
                name="jobDescription"
                id="jobDescription"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Submit button */}
            <button type="submit" className="job-basics-submit-button">
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
