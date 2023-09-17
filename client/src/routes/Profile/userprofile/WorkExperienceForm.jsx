import { useState } from "react";

import editProfileStyle from "./EditProfileCV.module.css";
import profileStyles from "./UpdateProfilePage.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import DataDisplay from "../components/Experiences/DataDisplay";

const data = {
  jobTitle: "",
  employmentType: "",
  industry: "",
  startDate: "",
  currentlyWorking: false,
  endDate: "",
  company: "",
  companyWebsite: "",
  country: "",
  state: "",
  city: "",
  description: "",
};

function WorkExperienceForm() {
  const [showDisplay, setDisplay] = useState(false);
  const [update, setUpdate] = useState(true);

  const updateFun = () => {
    setUpdate(!update);
  };

  return (
    <>
      <div
        className={profileStyles["personal-information-container-dotted"]}
        style={{ position: "relative" }}
      >
        <div className={profileStyles["heading-container-dotted"]}>
          <h3 className="p-0 m-2" style={{ fontSize: "20px" }}>
            Work Experience
          </h3>
        </div>
        <DataDisplay update={update} />
        <div className={profileStyles["details-container"]} style={{}}>
          <div className={profileStyles["lower-container"]}>
            <p className={profileStyles["additional-details"]}>
              Adding work experience improves your chances of being discovered.
            </p>
          </div>
          <a
            href="#"
            className={`${profileStyles["absolute-buttons"]}`}
            onClick={(e) => {
              e.preventDefault();
              setDisplay(true);
            }}
          >
            Add Work Experience +
          </a>
        </div>
      </div>
      <ExperienceModel
        showDisplay={showDisplay}
        setDisplay={setDisplay}
        updateFun={updateFun}
      />
    </>
  );
}

export const ExperienceModel = ({ showDisplay, setDisplay, updateFun }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    const token = localStorage.getItem("token");
    const apiUrl = "/user/jobExperience/postData";

    const headers = {
      Authorization: token,
    };
    axios
      .post(apiUrl, formData, { headers })
      .then((response) => {
        const updateprogress = localStorage.getItem("progress");
        const newprogress = parseInt(updateprogress, 10);
        const addprogress = newprogress + response.data.progress;
        const finalprogress = addprogress.toString();
        localStorage.setItem("progress", finalprogress);
        toast.success(response.data.message);
        updateFun();
        setFormData(data);
        setDisplay(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending data to the backend.");
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "currentlyWorking") {
      setFormData({ ...formData, [e.target.name]: !formData.currentlyWorking });
      return;
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
  };

  return (
    <div
      className={`${profileStyles["edit-form-container"]}  ${
        showDisplay === true ? profileStyles["show"] : profileStyles["hidden"]
      }`}
    >
      <div className={profileStyles["edit-form"]}>
        <h3 style={{ color: "black", fontSize: "18px" }} className="p-0">
          Add Work Experience
        </h3>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>
                <p>Job Title*</p>
                <input
                  required
                  name="jobTitle"
                  type="text"
                  value={formData.jobTitle}
                  onChange={handleChange}
                />
              </label>
            </li>
            <li className={profileStyles["special-item"]}>
              <label>
                <p>Employement Type*</p>
                <input
                  required
                  name="employmentType"
                  value={formData.employmentType}
                  type="text"
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>Industry*</p>
                <select
                  required
                  name="industry"
                  value={formData.industry}
                  type="text"
                  onChange={handleChange}
                >
                  <option value=""></option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="AI and ML">AI and ML</option>
                  <option value="IT">IT</option>
                  <option value="Finance">Finance</option>
                  <option value="Business Management">
                    Business Management
                  </option>
                </select>
              </label>
            </li>
            <li
              className={`${profileStyles["special-item"]} ${profileStyles["special-item2"]}`}
            >
              <label>
                <p>Start Date*</p>
                <input
                  required
                  name="startDate"
                  value={formData.startDate}
                  type="date"
                  onChange={handleChange}
                />
              </label>
              <label className={profileStyles["slider-label"]}>
                <p>Working?</p>
                <input
                  name="currentlyWorking"
                  value={formData.currentlyWorking}
                  type="checkbox"
                  className={editProfileStyle.sliderinput}
                  onChange={handleChange}
                />
                <span
                  className={`${profileStyles.slider} ${editProfileStyle.round}`}
                ></span>
              </label>
            </li>
            <li>
              <label>
                <p>End Date*</p>
                <input
                  required={!formData.currentlyWorking}
                  disabled={formData.currentlyWorking}
                  name="endDate"
                  value={formData.endDate}
                  type="date"
                  style={{ width: "49%" }}
                  onChange={handleChange}
                />
              </label>
            </li>
            <li className={profileStyles["special-item"]}>
              <label>
                <p>Company*</p>
                <input
                  required
                  name="company"
                  value={formData.company}
                  type="text"
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>Company Website*</p>
                <input
                  required
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  type="text"
                  onChange={handleChange}
                />
              </label>
            </li>
            <li className={profileStyles["special-item"]}>
              <label>
                <p>Country*</p>
                <input
                  required
                  name="country"
                  value={formData.country}
                  type="text"
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>State*</p>
                <input
                  required
                  name="state"
                  value={formData.state}
                  type="text"
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>City*</p>
                <input
                  required
                  name="city"
                  value={formData.city}
                  type="text"
                  onChange={handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                <p>Description*</p>
                <input
                  required
                  name="description"
                  value={formData.description}
                  type="text"
                  onChange={handleChange}
                />
              </label>
            </li>
          </ul>
          <div className={profileStyles["edit-form-buttons"]}>
            <button
              className={profileStyles["form-button-cancel"]}
              onClick={(e) => {
                e.preventDefault();
                setFormData(data);
                setDisplay(false);
              }}
            >
              Cancel
            </button>
            <button className={profileStyles["form-button-save"]}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
