import React from "react";
import { useState } from "react";
import "../Experiences/ExpForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ExpForm = () => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false); // State to manage the toggle button

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle); // Toggle the state when the button is clicked
  };

  const [formData, setFormData] = useState({
    jobtitle: "",
    employmenttype: "",
    industry: "",
    startdate: "",
    company: "",
    companywebsite: "",
    country: "",
    state: "",
    city: "",
    description: "",
    enddate: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      jobTitle: formData.jobtitle,
      employmentType: formData.employmenttype,
      industry: formData.industry,
      startDate: formData.startdate,
      currentlyWorking: toggle,
      company: formData.company,
      companyWebsite: formData.companywebsite,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      description: formData.description,
      endDate: formData.enddate,
    };

    const token = localStorage.getItem("token");
    const apiUrl = "/user/jobExperience/postData";

    const headers = {
      Authorization: token,
    };
    axios
      .post(apiUrl, formattedData, { headers })
      .then((response) => {
        const updateprogress = localStorage.getItem("progress");
        const newprogress = parseInt(updateprogress, 10);
        const addprogress = newprogress + response.data.progress;
        const finalprogress = addprogress.toString();
        localStorage.setItem("progress", finalprogress);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/experiences/submit-exp");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending data to the backend.");
      });
  };

  return (
    <div className="form-container-exp">
      <div className="shadow-exp">
        <form onSubmit={handleSubmit}>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="jobtitle">
              Job Title
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="jobtitle"
              className="input-field-exp"
              placeholder=""
              required
              value={formData.jobtitle}
              onChange={handleChange}
            />
          </div>
          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="employmenttype">
                Employment Type
                <span className="required-exp">*</span>
              </label>
              <input
                type="text"
                id="employmenttype"
                className="input-field-exp"
                placeholder="Select Employment Type"
                required
                value={formData.employmenttype}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="industry">
                Industry
                <span className="required-exp">*</span>
              </label>
              <select
                id="industry"
                className="input-field-exp"
                required
                value={formData.industry}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="Software">Software</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Freelancer">Freelancer</option>
                <option value="Business Analytics">Business Analytics</option>
                <option value="System Analyst">System Analyst</option>
                <option value="Jr Quality Assurance Engineer">
                  Jr Quality Assurance Engineer
                </option>
                <option value="Application Support Analyst">
                  Application Support Analyst
                </option>
                <option value="Senior Backend Developer">
                  Senior Backend Developer
                </option>
                <option value=".net Developer">.net Developer</option>
                <option value="Programmer">Programmer</option>
                <option value="CEO">CEO</option>
                <option value="Team Lead">Team Lead</option>
                <option value="IT">IT</option>
                <option value="Intern">Intern</option>
                <option value="Graphic Designer And 2D Artist">
                  Graphic Designer And 2D Artist
                </option>
                <option value="Support Engineer">Support Engineer</option>
                <option value="Jr. Android Developer">
                  Jr. Android Developer
                </option>
                <option value="Data Warehousing">Data Warehousing</option>
                <option value="Data Analysis And mining engineer">
                  Data Analysis And mining engineer
                </option>
                <option value="QA Analyst">QA Analyst</option>
                <option value="Senior Software Engineer">
                  Senior Software Engineer
                </option>
                <option value="Oracle Developer">Oracle Developer</option>
                <option value="Full Stack Developer">
                  Full Stack Developer
                </option>
                <option value="Game Developer">Game Developer</option>
                <option value="Design">Design</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Ecommerce">Ecommerce</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Telecommunications">Telecommunications</option>
              </select>
            </div>
          </div>
          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="startdate">
                Start Date
                <span className="required-exp">*</span>
              </label>
              <input
                type="date"
                id="startdate"
                className="input-field-exp"
                placeholder="DD-MM-YYYY"
                required
                value={formData.startdate}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="curr-work" htmlFor="industry">
                Currently Working?
                <span className="required-exp">*</span>
              </label>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={toggle}
                  onChange={handleToggle}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>

          <div className="input-group-exp-1">
            <label className="label-exp" htmlFor="enddate">
              End Date
              <span className="required-exp">*</span>
            </label>
            <input
              type="date"
              id="enddate"
              className="input-field-exp"
              placeholder="DD-MM-YYYY"
              disabled={toggle}
              value={formData.enddate}
              onChange={handleChange}
            />
          </div>

          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="company">
                Company
                <span className="required-exp">*</span>
              </label>
              <input
                type="text"
                id="company"
                className="input-field-exp"
                placeholder=""
                required
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="companywebsite">
                Company Website
                <span className="required-exp">*</span>
              </label>
              <input
                type="url"
                id="companywebsite"
                className="input-field-exp"
                placeholder=""
                required
                value={formData.companywebsite}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="new-name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="country">
                Country
                <span className="required-exp">*</span>
              </label>
              <select
                id="country"
                className="input-field-exp"
                required
                value={formData.country}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="EU">UK</option>
              </select>
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="state">
                State
                <span className="required-exp">*</span>
              </label>
              <input
                type="text"
                id="state"
                className="input-field-exp"
                placeholder=""
                required
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="city">
                City
                <span className="required-exp">*</span>
              </label>
              <input
                type="text"
                id="city"
                className="input-field-exp"
                placeholder=""
                required
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="description-container-exp">
            <label className="label-exp" htmlFor="description">
              Description
              <span className="required-exp">*</span>
            </label>
            <input
              type="description"
              id="description"
              className="input-field-exp-1"
              placeholder=""
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="button-container-exp">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ExpForm;
