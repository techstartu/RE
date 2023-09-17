import { useEffect, useState } from "react";

import editProfileStyle from "./EditProfileCV.module.css";
import profileStyles from "./UpdateProfilePage.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import DisplayLang from "../components/Languages/DisplayLanguages";

const data = {
  language: "",
  speakingLevel: "",
  listeningLevel: "",
  writingLevel: "",
  readingLevel: "",
};

function LanguagesForm() {
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
            Languages
          </h3>
        </div>
        <DisplayLang update={update} />
        <div className={profileStyles["details-container"]} style={{}}>
          <div className={profileStyles["lower-container"]}>
            <p className={profileStyles["additional-details"]}></p>
          </div>
          <a
            href="#"
            className={`${profileStyles["absolute-buttons"]}`}
            onClick={(e) => {
              e.preventDefault();
              setDisplay(true);
            }}
          >
            Add Language +
          </a>
        </div>
      </div>

      <LanguageModel
        showDisplay={showDisplay}
        setDisplay={setDisplay}
        updateFun={updateFun}
      />
    </>
  );
}

export const LanguageModel = ({ showDisplay, setDisplay, updateFun }) => {
  const [formData, setFormData] = useState(data);
  // if (language) {
  // }
  // useEffect(() => {
  //   if (language) setFormData(language);
  // }, [language]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const apiUrl = "/user/language/postData";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div
      className={`${profileStyles["edit-form-container"]}  ${
        showDisplay === true ? profileStyles["show"] : profileStyles["hidden"]
      }`}
    >
      <div className={profileStyles["edit-form"]}>
        <h3 style={{ color: "black", fontSize: "18px" }} className="p-0">
          Add Language
        </h3>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label>
                <p>Language*</p>
                <input
                  name="language"
                  type="text"
                  value={formData.language}
                  required
                  onChange={handleChange}
                />
              </label>
            </li>
            <li className={profileStyles["special-item"]}>
              <label>
                <p>Speaking Level*</p>
                <select
                  name="speakingLevel"
                  required
                  value={formData.speakingLevel}
                  onChange={handleChange}
                >
                  <option value="">Select One</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
              <label>
                <p>Listening Level</p>
                <select
                  name="listeningLevel"
                  value={formData.listeningLevel}
                  required
                  onChange={handleChange}
                >
                  <option value="">Select One</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
            </li>
            <li className={profileStyles["special-item"]}>
              <label>
                <p>Writing Level</p>
                <select
                  name="writingLevel"
                  value={formData.writingLevel}
                  required
                  onChange={handleChange}
                >
                  <option value="">Select One</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
              <label>
                <p>Reading Level</p>
                <select
                  name="readingLevel"
                  value={formData.readingLevel}
                  required
                  onChange={handleChange}
                >
                  <option value="">Select One</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
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

export default LanguagesForm;
