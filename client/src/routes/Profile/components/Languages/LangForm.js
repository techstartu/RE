import React from "react";
import { useState } from "react";
import "../Experiences/ExpForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LangForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    language: "",
    speakingLevel: "",
    listeningLevel: "",
    writingLevel: "",
    readingLevel: "",
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
      language: formData.language,
      speakingLevel: formData.speakingLevel,
      listeningLevel: formData.listeningLevel,
      writingLevel: formData.writingLevel,
      readingLevel: formData.readingLevel,
    };

    const token = localStorage.getItem("token");
    const apiUrl = "/user/language/postData";

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
          navigate("/languages/submit-lang");
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
          <div className="email-container-exp">
            <label className="label-exp" htmlFor="language">
              Language
              <span className="required-exp">*</span>
            </label>
            <input
              type="text"
              id="language"
              className="input-field-exp"
              placeholder=""
              required
              value={formData.language}
              onChange={handleChange}
            />
          </div>
          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="speakingLevel">
                Speaking Level
                <span className="required-exp">*</span>
              </label>
              <select
                id="speakingLevel"
                className="input-field-exp"
                required
                value={formData.speakingLevel}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="listeningLevel">
                Listening Level
                <span className="required-exp">*</span>
              </label>
              <select
                id="listeningLevel"
                className="input-field-exp"
                required
                value={formData.listeningLevel}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="name-container-exp">
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="writingLevel">
                Writing Level
                <span className="required-exp">*</span>
              </label>
              <select
                id="writingLevel"
                className="input-field-exp"
                required
                value={formData.writingLevel}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="input-group-exp">
              <label className="label-exp" htmlFor="readingLevel">
                Reading Level
                <span className="required-exp">*</span>
              </label>
              <select
                id="readingLevel"
                className="input-field-exp"
                required
                value={formData.readingLevel}
                onChange={handleChange}
              >
                <option value="">Select One</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
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

export default LangForm;
