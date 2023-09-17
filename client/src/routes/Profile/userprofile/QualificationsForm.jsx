import { useState } from "react";

import editProfileStyle from "./EditProfileCV.module.css";
import profileStyles from "./UpdateProfilePage.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import DisplayEdu from "../components/Education/DisplayEducation";

const data = {
  school: "",
  degree: "",
  fieldOfStudy: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  grades: "",
  activities_societies: "",
  description: "",
};

function QualificationsForm() {
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
            Qualifications
          </h3>
        </div>
        <DisplayEdu update={update} />
        <div className={profileStyles["details-container"]} style={{}}>
          <div className={profileStyles["lower-container"]}>
            <p className={profileStyles["additional-details"]}>
              Adding Qulatifications improves your chances of being discovered
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
            Add Qualification +
          </a>
        </div>
      </div>
      <QualificationModel
        showDisplay={showDisplay}
        setDisplay={setDisplay}
        updateFun={updateFun}
      />
    </>
  );
}

export const QualificationModel = ({ showDisplay, setDisplay, updateFun }) => {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const apiUrl = "/user/education/postData";

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
    const name = e.target.name;
    var value = e.target.value;
    if (name === "startYear" || name === "endYear") value = parseInt(value);
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div
      className={`${profileStyles["edit-form-container"]}  ${
        showDisplay === true ? profileStyles["show"] : profileStyles["hidden"]
      }`}
    >
      <div className={profileStyles["edit-form"]}>
        <h3 style={{ color: "black", fontSize: "18px" }} className="p-0">
          Add Qualification
        </h3>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>
                <p>School*</p>
                <input
                  name="school"
                  type="text"
                  required
                  value={formData.school}
                  onChange={handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                <p>Degree*</p>
                <input
                  name="degree"
                  value={formData.degree}
                  type="text"
                  required
                  onChange={handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                <p>Field Of Study*</p>
                <input
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  type="text"
                  required
                  onChange={handleChange}
                />
              </label>
            </li>
            <li className={profileStyles["special-item"]}>
              <label>
                <p>Start Month</p>
                <input
                  name="startMonth"
                  type="text"
                  value={formData.startMonth}
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>Year</p>
                <input
                  name="startYear"
                  value={FormData.startYear}
                  type="number"
                  required
                  onChange={handleChange}
                />
              </label>
            </li>
            <li className={profileStyles["special-item"]}>
              <label>
                <p>End Month</p>
                <input
                  name="endMonth"
                  value={formData.endMonth}
                  type="text"
                  required
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>Year</p>
                <input
                  name="endYear"
                  value={formData.endYear}
                  type="number"
                  required
                  onChange={handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                <p>Grades*</p>
                <input
                  name="grades"
                  value={formData.grades}
                  type="text"
                  required
                  onChange={handleChange}
                />
              </label>
            </li>
            <li>
              <label>
                <p>Activities And Scocieties</p>
                <input
                  name="activities_societies"
                  value={formData.activities_societies}
                  type="text"
                  required
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

export default QualificationsForm;
