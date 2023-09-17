import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Experiences/ExpForm.css"; // Import the CSS file for styling
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CourForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: "",
    instituteName: "",
    startDate: "",
    endDate: "",
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
      courseName: formData.courseName,
      instituteName: formData.instituteName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
    };

    const token = localStorage.getItem("token");
    const apiUrl = "/user/course/postData";

    const headers = {
      Authorization: token,
    };
    axios
      .post(apiUrl, formattedData, { headers })
      .then((response) => {
        // Update progress in local storage
        const updateprogress = localStorage.getItem("progress");
        const newprogress = parseInt(updateprogress, 10);
        const addprogress = newprogress + response.data.progress;
        const finalprogress = addprogress.toString();
        localStorage.setItem("progress", finalprogress);
        
        // Show a success toast message
        toast.success(response.data.message);

        // Redirect to the specified page after a delay
        setTimeout(() => {
          navigate("/courses/submit-cour");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        // Show an error toast message if there's an issue with the request
        toast.error("Error sending data to the backend.");
      });
  };

  return (
    <div className="form-container-cour">
      <div className="shadow-exp">
        <form onSubmit={handleSubmit}>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="courseName">
              Course Name
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="courseName"
              className="input-field-exp"
              placeholder=""
              required
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="instituteName">
              Institute Name
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="instituteName"
              className="input-field-exp"
              placeholder=""
              required
              value={formData.instituteName}
              onChange={handleChange}
            />
          </div>

          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="startDate">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                className="input-field-exp"
                placeholder=""
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="endDate">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="input-field-exp"
                placeholder=""
                value={formData.endDate}
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

export default CourForm;
