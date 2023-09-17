import React, { useState, useEffect } from "react";
import "./keyQualities.css";
import Line from "../PostJobReview/line";
import Trash from "../../../../../assests/svg/trashSvg";
import Unchecked from "../../../../../assests/svg/uncheckedBoxsvg";
import CheckedBox from "../../../../../assests/svg/checkedBoxsvg";
import MiniCheckedBox from "../../../../../assests/svg/miniChecksvg";
import MiniUnchecked from "../../../../../assests/svg/miniUnchecksvg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../companyContext";
import { useContext } from "react";
import Cross from "../../../../../assests/svg/cross-svg";
import Plus from "../../../../../assests/svg/plusIconsvg";
import Header from "../../../../Home/components/header";

// Component for rendering a checkbox
function Checkbox({ id }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    console.log(`Checkbox ${id} is checked: ${!isChecked}`);
  };

  return (
    <div className="checkbox-container" onClick={toggleCheckbox}>
      {isChecked ? <CheckedBox /> : <Unchecked />}
    </div>
  );
}

// Component for the popup to add a new skill
const PopUpKey = ({ closePopUpKey, addStringToArray, state, value }) => {
  let inputSave = "";
  const handleInputChangeKey = (event) => {
    console.log(event.target.value);
    inputSave = event.target.value;
  };

  const handleAdd = (e) => {
    console.log(inputSave);
    addStringToArray(inputSave);
    closePopUpKey();
  };

  return (
    <div className="Parent-Container-PopUpKey">
      <div className="PopUp-Container">
        <div className="cross-svg-container" onClick={closePopUpKey}>
          <Cross />
        </div>
        <div className="Edit-JobPost-Heading">Add New Skill</div>
        <input
          className="input-field-pop-up-box"
          placeholder="New Skill"
          id="AddSkillTitle"
          onChange={handleInputChangeKey}
        />
        <div className="popUpBox-Button-Container">
          <button className="Done-button" onClick={handleAdd}>
            Add
          </button>
          <button className="Close-button" onClick={closePopUpKey}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function KeyQualities() {
  const { keyQualities, setKeyQualities } = useContext(UserContext);

  const [showPopUpKey, setShowPopUpKey] = useState(false);

  const [input, setInput] = useState([]);

  const navigate = useNavigate();

  // Function to navigate to the next page
  function NextPage(e) {
    e.preventDefault();

    // Transform input into the expected format
    const transformedSkills = input.map((skill) => ({
      skill: skill,
      isNiceToHave: false, // You can set these values as needed
      isMustHave: true, // You can set these values as needed
    }));

    const updatedKeyQualities = {
      ...keyQualities,
      skills: transformedSkills,
    };
    setKeyQualities(updatedKeyQualities);

    // Now you can send the updatedKeyQualities to your back-end
    // ...

    console.log("this should be updated keyQualities: ", updatedKeyQualities);
    console.log("Running");
    navigate("/company/finishPostfinal");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (localStorage.getItem("userType") !== "company")
      navigate("/loginAsCompany");
    if (token === null && !token) {
      console.log("token not found");
      navigate("/company/createaccount");
    } else {
      console.log("Token found!");
    }
  }, []);

  // Function to navigate to the previous page
  function PreviousPage(e) {
    e.preventDefault();
    console.log("Running");
    navigate("/company/postJobReview");
  }

  const openPopUpKey = () => {
    setShowPopUpKey(true);
    console.log(showPopUpKey);
  };
  const closePopUpKey = () => {
    setShowPopUpKey(false);
  };
  const addStringToArray = (newString) => {
    setInput([...input, newString]);
  };
  const removeSkill = (index) => {
    const updatedSkills = [...input];
    updatedSkills.splice(index, 1);
    setInput(updatedSkills);
  };

  return (
    <div>
      {showPopUpKey && (
        <PopUpKey
          closePopUpKey={closePopUpKey}
          addStringToArray={addStringToArray}
          state={input}
        />
      )}

      <Header active="company" />
      <div className="keyQualityParent-Container" id="skills">
        <div className="keyQuality-Title">Key Qualifications for your role</div>
        <div className="keyQuality-subtitle1">
          Find the best candidates by telling us which qualifications are a
          must-have.
        </div>
        <div className="keyQuality-subtitle2">
          Let us know how important they are so that we can reach the right job
          seekers.
        </div>
        <div className="keyQuality-mini-container-1">
          <div className="keyQuality-Skill-Heading">Skill</div>
          <div className="keyQuality-mini-sub-container-1">
            <div className="keyQuality-MustHave-Heading">Must Have</div>
            <div className="keyQuality-NiceToHave-Heading">Nice To Have</div>
          </div>
        </div>
        <div className="Line-Container">
          <Line />
        </div>
        {input.map((skill, index) => (
          <div key={index}>
            <div className="keyQuality-mini-container-2">
              <div className="keyQuality-Skill-1" id={`Skill${index}Title`}>
                Skill: {skill}
              </div>
              <div className="keyQuality-mini-sub-container-2">
                <div className="keyQuality-MustHave-1">
                  <Checkbox id={`Skill${index}MustHave`} />
                </div>
                <div className="keyQuality-NiceToHave-1">
                  <Checkbox id={`Skill${index}NiceToHave`} />
                </div>

                <div onClick={() => removeSkill(index)} className="custom-div">
                  <div className="keyQuality-TrashContainer">
                    <Trash />
                  </div>
                </div>
              </div>
            </div>
            <div className="Line-Container">
              <Line />
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-center" onClick={openPopUpKey}>
          {/* {" "}
                    <p className="skill-ptag">Add Skills</p>
                    <Plus /> */}
          <button
            className="px-3 py-2"
            style={{
              color: "white",
              background: "#cf1350",
              border: "none",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <bold style={{ fontSize: "20px" }}>+</bold> Add Skills
          </button>
        </div>
      </div>

      <div className="button-container-key">
        <button className="previous-button-key" onClick={PreviousPage}>
          Previous
        </button>
        <button className="next-button-key" onClick={NextPage}>
          Save and Continue
        </button>
      </div>
    </div>
  );
}

export default KeyQualities;
