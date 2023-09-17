import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Experiences/ExpForm.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const EduForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
    description: "",
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
      school: formData.school,
      degree: formData.degree,
      fieldOfStudy: formData.fieldOfStudy,
      startYear: formData.startYear,
      startMonth: formData.startMonth,
      endYear: formData.endYear,
      endMonth: formData.endMonth,
      description: formData.description,
    };

    const token = localStorage.getItem("token");
    const apiUrl = "/user/education/postData";

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
          navigate("/education/submit-edu");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending data to the backend.");
      });
  };

  return (
    <div className="form-container-edu">
      <div className="shadow-exp">
        <form onSubmit={handleSubmit}>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="school">
              School
            </label>
            <input
              type="text"
              id="school"
              className="input-field-exp"
              placeholder="Ex: Boston University"
              value={formData.school}
              onChange={handleChange}
            />
          </div>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="degree">
              Degree
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="degree"
              className="input-field-exp"
              placeholder="Ex: Bachelor's"
              required
              value={formData.degree}
              onChange={handleChange}
            />
          </div>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="fieldOfStudy">
              Field Of Study
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="fieldOfStudy"
              className="input-field-exp"
              placeholder="Ex: Bachelor's"
              required
              value={formData.fieldOfStudy}
              onChange={handleChange}
            />
          </div>

          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="startMonth">
                Start Month
              </label>
              <input
                type="text"
                id="startMonth"
                className="input-field-exp"
                placeholder="Month"
                value={formData.startMonth}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="startYear">
                Year
              </label>
              <input
                type="text"
                id="startYear"
                className="input-field-exp"
                placeholder="Year"
                value={formData.startYear}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="endMonth">
                End Month
              </label>
              <input
                type="text"
                id="endMonth"
                className="input-field-exp"
                placeholder="Month"
                value={formData.endMonth}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="endYear">
                Year
              </label>
              <input
                type="text"
                id="endYear"
                className="input-field-exp"
                placeholder="Year"
                value={formData.endYear}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="grades">
              Grades
            </label>
            <input
              type="text"
              id="grades"
              className="input-field-exp"
              placeholder=""
            />
          </div>

          <div className="description-container-exp">
            <label className="label-exp" htmlFor="act-societies">
              Activities And Societies
            </label>
            <input
              type="description"
              id="act-societies"
              className="input-field-exp-1"
              placeholder=""
            />
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

export default EduForm;
