import { useState } from "react";
import editProfileStyle from "./EditProfileCV.module.css";
import profileStyles from "./UpdateProfilePage.module.css";
import { FaFilePdf } from "react-icons/fa";
import Header from "../../Home/components/header";
import Footer from "../../Home/components/footer";
import { Link } from "react-router-dom";

import ProfileSideBar from "./ProfileSideBar";
import LanguagesForm from "./LanguagesForm";
import WorkExperienceForm from "./WorkExperienceForm";
import QualificationsForm from "./QualificationsForm";

export default function UpdateProfilePage() {
  // State variables
  const [showDisplay, setDisplay] = useState(false);
  const [formName, setForm] = useState("");

  // Retrieve user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* Header component */}
      <Header />
      <div className={profileStyles.container}>
        <div className={profileStyles["inner-container"]}>
          <div className={profileStyles["left"]}>
            {/* ProfileSideBar component */}
            <ProfileSideBar />
          </div>
          <div className={profileStyles["right"]}>
            <div className={profileStyles["personal-information-container"]}>
              <div className={profileStyles["heading-container"]}>
                <h3 className="p-0 m-2" style={{ fontSize: "20px" }}>
                  Looking For
                </h3>
                <Link to="/set-profile" className={profileStyles["buttons"]}>
                  Edit
                </Link>
              </div>
              <div
                className={profileStyles["details-container"]}
                style={{ position: "relative" }}
              >
                <div className={profileStyles["lower-container"]}>
                  <ul>
                    <li>
                      <h3>Desired job title</h3>
                      <p>{user.desiredJob}</p>
                    </li>
                    <li>
                      <h3>Salary</h3>
                      <p>
                        £{user.minSalary} {user.payment}
                      </p>
                    </li>
                    <li>
                      <h3>Location</h3>
                      <p>{user.desiredLocation}</p>
                    </li>
                    <li>
                      <h3>Job type</h3>
                      <p>Full-time, Part-time</p>
                    </li>
                    {/* <li>
                      <h3 style={{ marginBottom: "20px" }}>Sectors & roles</h3>
                    </li> */}
                  </ul>
                </div>
                {/* <a
                  href="#"
                  className={profileStyles["buttons"]}
                  style={{ position: "absolute", right: "20px", top: "88%" }}
                >
                  Add Sector & Roles +
                </a> */}
              </div>
            </div>
            {/* WorkExperienceForm component */}
            <WorkExperienceForm />
            {/* QualificationsForm component */}
            <QualificationsForm />
            {/* LanguagesForm component */}
            <LanguagesForm />
          </div>
        </div>
      </div>
      {/* Footer component */}
      <Footer />
    </>
  );
}
