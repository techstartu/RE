import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Experiences/ExpForm.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CertForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseTitle: "",
    organization: "",
    issueDate: "",
    expiryDate: "",
    credentialID: "",
    credentialURL: "",
    description: "",
  });

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      courseTitle: formData.courseTitle,
      organization: formData.organization,
      issueDate: formData.issueDate,
      expiryDate: formData.expiryDate,
      credentialID: formData.credentialID,
      credentialURL: formData.credentialURL,
      desrciption: formData.description, // Typo here, should be 'description'
    };

    const token = localStorage.getItem("token");
    const apiUrl = "/user/certificate/postData";

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
          navigate("/certifications/submit-cert");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending data to the backend.");
      });
  };

  return (
    <div className="form-container-cour">
      <div className="shadow-exp">
        <form onSubmit={handleSubmit}>
          {/* Course Title */}
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="courseTitle">
              Course Title
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="courseTitle"
              className="input-field-exp"
              placeholder=""
              required
              value={formData.courseTitle}
              onChange={handleChange}
            />
          </div>

          {/* Organization */}
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="organization">
              Organization
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="organization"
              className="input-field-exp"
              placeholder=""
              required
              value={formData.organization}
              onChange={handleChange}
            />
          </div>

          {/* Issue Date and Expiry Date */}
          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="issueDate">
                Issue Date
                <span className="required-exp">*</span>
              </label>
              <input
                type="date"
                id="issueDate"
                className="input-field-exp"
                placeholder=""
                required
                value={formData.issueDate}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="expiryDate">
                Expiry Date
                <span className="required-exp">*</span>
              </label>
              <input
                type="date"
                id="expiryDate"
                className="input-field-exp"
                placeholder=""
                required
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Credential ID and Credential URL */}
          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="credentialID">
                Credential ID
              </label>
              <input
                type="text"
                id="credentialID"
                className="input-field-exp"
                placeholder=""
                value={formData.credentialID}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="credentialURL">
                Credential URL
              </label>
              <input
                type="url"
                id="credentialURL"
                className="input-field-exp"
                placeholder=""
                value={formData.credentialURL}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
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

          {/* Submit Button */}
          <div className="button-container-exp">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CertForm;
