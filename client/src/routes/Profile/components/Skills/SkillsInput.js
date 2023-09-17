import React, { useState } from "react";
import "../Skills/SkillsInput.css";
import axios from "axios"; // Don't forget to import axios if you haven't already.
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SkillInput = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    skills: [],
    newSkill: "",
  });

  // Update the 'newSkill' state as the user types
  const handleInputChange = (event) => {
    setFormState({
      ...formState,
      newSkill: event.target.value,
    });
  };

  // Add a new skill to the 'skills' state
  const handleAddSkill = () => {
    if (formState.newSkill.trim() !== "") {
      setFormState((prevFormState) => ({
        ...prevFormState,
        skills: [...prevFormState.skills, prevFormState.newSkill.trim()],
        newSkill: "",
      }));
    }
  };

  // Delete a skill from the 'skills' state
  const handleDeleteSkill = (skill) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      skills: prevFormState.skills.filter((s) => s !== skill),
    }));
  };

  // Handle the 'Enter' key press to add a skill
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddSkill();
    }
  };

  // Handle the form submission
  const handleSubmit = () => {
    const apiUrl = "/user/personalInfo/postSkills";

    const token = localStorage.getItem("token");

    const headers = {
      Authorization: token,
    };

    const requestData = {
      skills: formState.skills,
    };

    axios
      .post(apiUrl, requestData, { headers })
      .then((response) => {
        // Update progress and show success message
        const updateprogress = localStorage.getItem("progress");
        const newprogress = parseInt(updateprogress, 10);
        const addprogress = newprogress + response.data.progress;
        const finalprogress = addprogress.toString();
        localStorage.setItem("progress", finalprogress);
        toast.success(response.data.message);

        // Redirect to the next page after a delay
        setTimeout(() => {
          navigate("/skills/submit-skills");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error sending data to the backend.");
      });
  };

  return (
    <div className="container-skills">
      <div className="input-container">
        <input
          type="text"
          value={formState.newSkill}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a skill"
        />
        <button onClick={handleAddSkill}>Add</button>
      </div>
      <div className="skills-container">
        <div className="skills-box">
          {formState.skills.map((skill, index) => (
            <div className="skill" key={index}>
              {skill}
              <button
                className="delete-button"
                onClick={() => handleDeleteSkill(skill)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <button className="submit-button-input" onClick={handleSubmit}>
        Submit
      </button>
      <ToastContainer />
    </div>
  );
};

export default SkillInput;
