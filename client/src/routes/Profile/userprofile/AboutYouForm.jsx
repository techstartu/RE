import { useState } from "react";

import editProfileStyle from "./EditProfileCV.module.css";
import profileStyles from "./UpdateProfilePage.module.css";

function AboutYouForm({ setDisplay, showDisplay }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phNo: "",
    country: "",
    town: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  const handleChange = (e) => {
    console.log("changed");
    console.log(e.target.name, e.target.value);
  };

  return (
    <div
      className={`${profileStyles["edit-form-container"]}  ${
        showDisplay === true ? profileStyles["show"] : profileStyles["hidden"]
      }`}
    >
      <div className={profileStyles["edit-form"]}>
        <h3 style={{ color: "black", fontSize: "28px" }}>About Me</h3>
        <form onSubmit={handleSubmit}>
          <ul>
            <li className={profileStyles["special-item"]}>
              <label>
                <p>First Name*</p>
                <input type="text" required onChange={handleChange} />
              </label>
              <label>
                <p>Last Name*</p>
                <input type="text" required onChange={handleChange} />
              </label>
            </li>
            <li>
              <label>
                <p>Phone number*</p>
                <input type="text" required onChange={handleChange} />
              </label>
            </li>
            <li>
              <label>
                <p>Country</p>
                <input type="text" onChange={handleChange} />
              </label>
            </li>
            <li>
              <label>
                <p>Town</p>
                <input type="text" onChange={handleChange} />
              </label>
            </li>
          </ul>
          <div className={profileStyles["edit-form-buttons"]}>
            <button
              className={profileStyles["form-button-cancel"]}
              onClick={(e) => {
                e.preventDefault();
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
}

export default AboutYouForm;
