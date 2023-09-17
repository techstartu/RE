import React, { useState } from "react";
import "../Experiences/DataDisplay.css";
import axios from "axios";
import { useEffect } from "react";

import { LanguageModel } from "../../userprofile/LanguagesForm";

const DisplayLang = ({ update }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState(null);
  const [showDisplay, setDisplay] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const apiUrl = "/user/language/getData";
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        if (response.data.languages.length)
          localStorage.setItem("language", "1");
        else localStorage.removeItem("language");
        setData(response.data.languages);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [update]);

  var index = 0;
  const openEditor = (ind) => {
    // index = ind;
    // setDisplay(true);
  };

  return (
    <div style={{ padding: "18px 16px 0 16px" }}>
      {data &&
        data.map((experience, ind) => (
          <div
            className="otherDataAboutUser"
            style={{
              marginBottom: "15px",
            }}
            key={experience._id}
          >
            <div
              className="d-flex align-items-center"
              style={{ justifyContent: "space-between" }}
            >
              <h4
                className="p-0 m-0"
                style={{
                  fontSize: "16px",
                  marginBottom: "8px",
                  fontWeight: "600",
                }}
              >
                {experience.language}
              </h4>
              {/* <span
                style={{
                  color: "#1e1ef0",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
                onClick={() => openEditor(ind)}
              >
                Edit
              </span> */}
            </div>
            <p
              className="p-0 m-0"
              style={{ fontSize: "16px", fontWeight: "300" }}
            >
              Listening Level : {experience.listeningLevel}
            </p>
            <p
              className="p-0 m-0"
              style={{ fontSize: "16px", fontWeight: "300" }}
            >
              Speaking Level : {experience.speakingLevel}
            </p>
            <hr />
          </div>
        ))}
      {/* <LanguageModel
        showDisplay={showDisplay}
        setDisplay={setDisplay}
        language={data ? data[index] : 0}
      /> */}
    </div>
  );
};

export default DisplayLang;
