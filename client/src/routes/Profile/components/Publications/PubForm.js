import React from "react";
import { useState } from "react";
import "../Experiences/ExpForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const PubForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    publicationTitle: "",
    publishedBy: "",
    publicationURL: "",
    publishedDate: "",
    description: "",
    members: "",
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
      publicationTitle: formData.publicationTitle,
      publishedBy: formData.publishedBy,
      publicationURL: formData.publicationURL,
      publishedDate: formData.publishedDate,
      description: formData.description,
      members: formData.members,
    };

    const token = localStorage.getItem("token");
    const apiUrl = "/user/publication/postData";

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
          navigate("/publications/submit-pub");
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
            <label className="label-exp" htmlFor="publicationTitle">
              Publication Title
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="publicationTitle"
              className="input-field-exp"
              placeholder=""
              required
              value={formData.publicationTitle}
              onChange={handleChange}
            />
          </div>
          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="publishedBy">
                Published By
                <span className="required-exp">*</span>
              </label>
              <input
                type="text"
                id="publishedBy"
                className="input-field-exp"
                placeholder=""
                required
                value={formData.publishedBy}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="publicationURL">
                Publication URL
                <span className="required-exp">*</span>
              </label>
              <input
                type="url"
                id="publicationURL"
                className="input-field-exp"
                placeholder=""
                required
                value={formData.publicationURL}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-group-exp-1">
            <label className="label-exp" htmlFor="publishedDate">
              Published Date
              <span className="required-exp">*</span>
            </label>
            <input
              type="date"
              id="publishedDate"
              className="input-field-exp"
              placeholder="DD-MM-YYYY"
              required
              value={formData.publishedDate}
              onChange={handleChange}
            />
          </div>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="research-area">
              Research Area
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="research-area"
              className="input-field-exp"
              placeholder=""
              required
            />
          </div>
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="members">
              Members
            </label>
            <input
              type="text"
              id="members"
              className="input-field-exp"
              placeholder=""
              value={formData.members}
              onChange={handleChange}
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

export default PubForm;
