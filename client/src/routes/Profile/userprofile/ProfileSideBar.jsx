import React, { useState } from "react";

import editProfileStyle from "./EditProfileCV.module.css";
import profileStyles from "./UpdateProfilePage.module.css";
import AboutYouForm from "./AboutYouForm";
import { useNavigate } from "react-router-dom";

const ProfileSideBar = () => {
  const [showDisplay, setDisplay] = useState(false);
  const navigate = useNavigate();

  const userStored = localStorage.getItem("user");
  const user = JSON.parse(userStored);

  console.log(user);

  return (
    <>
      <div className={editProfileStyle["edit-profile-container"]}>
        {/* <div className={editProfileStyle["third-div"]}>
          <h3>Visibility</h3>
          <div>
            <label>
              <input type="checkbox" className={editProfileStyle.sliderinput} />
              <span
                className={`${editProfileStyle.slider} ${editProfileStyle.round}`}
              ></span>
            </label>
          </div>
        </div> */}
        <div className={editProfileStyle["second-div"]}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <h4>About You</h4>
            {/* <a
              href="#"
              className={profileStyles["buttons"]}
              style={{ marginRight: "10px", fontSize: "10px" }}
              onClick={(e) => {
                e.preventDefault();
                setDisplay(true);
              }}
            >
              Edit
            </a> */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <div>
              <h5 style={{ color: "black" }}>{user.lastName}</h5>
              <p>{user.email}</p>
              <p>{user.phNo}</p>
            </div>
            <div className={editProfileStyle["FLimage"]}>
              {user.firstName ? user.firstName[0] : "F"}
              {user.lastName ? user.lastName[0] : "L"}
            </div>
          </div>
          {/* <div style={{ padding: "10px" }}>
            <ul style={{ marginBottom: "20px" }}>
              <li>
                <h3 style={{ color: "black" }}>{user.lastName}</h3>
                <div
                  style={{
                    backgroundColor: "black",
                    padding: "6px",
                    borderRadius: "50%",
                    marginTop: "5px",
                    color: "white",
                  }}
                >
                  <h3>
                    {user.firstName ? user.firstName[0] : "F"}
                    {user.lastName ? user.lastName[0] : "L"}
                  </h3>
                </div>
              </li>
              <li>
                <p>{user.phNo}</p>
              </li>
              <li>
                <p>{user.email}</p>
              </li>
            </ul>
          </div> */}
        </div>
        <div className={editProfileStyle["second-div"]}>
          <div style={{ padding: "10px" }}>
            <h4>Profile</h4>
          </div>
          <div style={{ padding: "10px" }}>
            <ul>
              {/* <li>
                <p>CV Upload</p>
                <input type="checkbox" checked disabled />
              </li> */}
              <li>
                <p>About You</p>
                <input type="checkbox" checked disabled />
              </li>
              <li>
                <p>Looking For</p>
                <input type="checkbox" checked disabled />
              </li>
              {/* <li>
                <p>Status And Availability</p>
                <input type="checkbox" disabled />
              </li> */}
              <li>
                <p>Work Experience</p>
                <input
                  type="checkbox"
                  disabled
                  checked={localStorage.getItem("experience")}
                />
              </li>
              <li>
                <p>Qualifications</p>
                <input
                  type="checkbox"
                  disabled
                  checked={localStorage.getItem("qualification")}
                />
              </li>
              <li>
                <p>Languages</p>
                <input
                  type="checkbox"
                  disabled
                  checked={localStorage.getItem("language")}
                />
              </li>
            </ul>
            <button className={editProfileStyle.button}>
              <h3 onClick={() => navigate("/set-profile")}>
                Update My Profile
              </h3>
            </button>
          </div>
        </div>
        {/* <div className={editProfileStyle["third-div"]}>
          <h3>CV Visibility</h3>
          <div>
            <label>
              <input type="checkbox" className={editProfileStyle.sliderinput} />
              <span
                className={`${editProfileStyle.slider} ${editProfileStyle.round}`}
              ></span>
            </label>
          </div>
        </div> */}
        {/* <div className={editProfileStyle["fourth-div"]}>
          <h4>Temporary Work</h4>
          <p>
            Are you available for temporary work? we'll feature your profile to
            recuiters
          </p>
          <button className={editProfileStyle.button}>
            <h3>Edit Availability</h3>
          </button>
        </div> */}
      </div>
      <AboutYouForm showDisplay={showDisplay} setDisplay={setDisplay} />
    </>
  );
};

export default ProfileSideBar;
