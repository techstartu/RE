// Import necessary dependencies and components
import React, { useState } from "react";
import "./CareerForm.css"; // Import CSS styles for this component
import { Link } from "react-router-dom";
import Header from "../../Home/components/header"; // Assuming a header component is being used

// Define the CareerForm functional component
const CareerForm = () => {
  // Define the state variables using the useState hook
  const [formData, setFormData] = useState({
    currentRole: "",
    skills: "",
    careerGoal: "",
    priority: "",
    interests: "",
    jobPreferences: "",
  });
  const [result, setResult] = useState("");

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Form data: ", formData);
    try {
      // Send a POST request to a local server endpoint (http://localhost:5000/career-advice)
      const response = await fetch("http://localhost:5000/career-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convert formData to JSON and send it in the request body
      });

      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        console.log("Response:", data);
        setResult(data[0]); // Set the result state with the received data
      } else {
        console.error("Error:", response.statusText); // Log an error if the response is not OK
      }
    } catch (error) {
      console.error("Error:", error); // Log any other errors that may occur during the request
    }
  };

  // Define a function to handle input changes in the form
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    // Update the formData state with the new value for the corresponding input field
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Render the JSX for the CareerForm component
  return (
    <>
      <Header active="career" /> {/* Render the header component with an "active" prop */}
      <div className="career-container11">
        <div className="rectangle-career11">
          <div className="heading-career11">Career Advice</div>
        </div>
        <div className="new-heading-career-container11">
          <div className="new-heading-career11">
            Answer a few simple questions, and receive personalized advice to
            elevate your career to new heights.
          </div>
        </div>
        <div className="form-career-container11">
          {/* Render the career form */}
          <form className="career-form11" onSubmit={handleSubmit}>
            {/* Input field for Current Role */}
            <div className="career-form-field11">
              <label htmlFor="currentRole" className="career-form-label11">
                Current Role
              </label>
              <input
                type="text"
                id="currentRole"
                className="career-form-input1"
                placeholder="Enter your current role"
                required
                value={formData?.currentRole}
                onChange={handleInputChange}
              />
            </div>
            {/* Input field for Skills */}
            <div className="career-form-field11">
              <label htmlFor="skills" className="career-form-label11">
                Skill
              </label>
              <input
                type="text"
                id="skills"
                className="career-form-input1"
                placeholder="Enter Your Skill"
                required
                value={formData?.skills}
                onChange={handleInputChange}
              />
            </div>
            {/* Textarea field for Career Goal */}
            <div className="career-form-field11">
              <label htmlFor="careerGoal" className="career-form-label11">
                Career Goal
              </label>
              <input
                type="text"
                id="careerGoal"
                className="career-form-input1"
                placeholder="What is Your Career Goal?"
    
                required
                value={formData?.careerGoal}
                onChange={handleInputChange}
              />
            </div>
            {/* Textarea field for Seeking Priority */}
            <div className="career-form-field11">
              <label htmlFor="priority" className="career-form-label11">
                Seeking Priority
              </label>
              <input
                type="text"
                id="priority"
                className="career-form-input1"
                placeholder="What is The Most Important Thing You Are Looking For In A Job?"
                
                required
                value={formData?.priority}
                onChange={handleInputChange}
              />
            </div>
            {/* Textarea field for Interests */}
            <div className="career-form-field11">
              <label htmlFor="interests" className="career-form-label11">
                Interests
              </label>
              <input
                type="text"
                id="interests"
                className="career-form-input1"
                placeholder="What Are Your Interests?"
               
                required
                value={formData?.interests}
                onChange={handleInputChange}
              />
            </div>
            {/* Textarea field for Job Preferences */}
            <div className="career-form-field11">
              <label htmlFor="jobPrefrences" className="career-form-label11">
                Job Preferences
              </label>
              <input
                type="text"
                id="jobPrefrences"
                className="career-form-input1"
                placeholder="What Are Your Job Preferences?"
                
                required
                value={formData?.jobPrefrences}
                onChange={handleInputChange}
              />
            </div>
            {/* Submit button */}
            <div className="button-field123">
              <button
                type="submit"
                className="submit-button123"
                onClick={handleSubmit} // Trigger form submission when the button is clicked
              >
                Submit
              </button>
            </div>
          <div className="career-form-field13233345">
            <textarea
              type="text"
              className="career-form-input123"
              placeholder="Your Result will show here"
              contentEditable={false}
              value={result}
            />
          </div>
          </form>
          {/* Display the result */}
        </div>
      </div>
    </>
  );
};

export default CareerForm; // Export the CareerForm component for use in other parts of the application
