// Import necessary dependencies and components
import React, { useState } from "react";
import "./CareerForm.css"; // Import CSS styles for this component
import { Link } from "react-router-dom";
import Header from "../../Home/components/header"; // Assuming a header component is being used

// Define the CareerPath functional component
const CareerPath = () => {
  // Define the state variables using the useState hook
  const [formData, setFormData] = useState({
    priority: "",
    interests: "",
    jobPrefrences: "",
  });
  const [result, setResult] = useState("");

  // Define a function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Form data: ", formData);
    try {
      // Send a POST request to a local server endpoint (http://localhost:5000/career-path)
      const response = await fetch("http://localhost:5000/career-path", {
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
    //this function is running, but I'm unable to edit my inputs
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Render the JSX for the CareerPath component
  return (
    <>
      <Header active="path" /> {/* Render the header component with an "active" prop */}
      <div className="career-container1">
        <div className="rectangle-career11">
          <h1 className="heading-career1">Career Path</h1>
        </div>
        <div className="new-heading-career-container1">
          <h2 className="new-heading-career1">
            Answer a few simple questions, and the right path to the Career you like
          </h2>
        </div>
        <div className="form-career-container1">
          {/* Render the career form */}
          <form className="career-form1" onSubmit={handleSubmit}>
            {/* Textarea field for Seeking Priority */}
            <div className="career-form-field1">
              <label htmlFor="priority" className="career-form-label11111">
                Seeking Priority
              </label>
              <input
                type="text"
                id="priority"
                className="career-form-input1"
                placeholder="What is The Most Important Thing You Are Looking For In A Job?"
                rows="5"
                cols="33"
                required
                value={formData?.priority}
                onChange={handleInputChange}
              />
            </div>
            {/* Textarea field for Interests */}
            <div className="career-form-field1">
              <label htmlFor="interests" className="career-form-label11111">
                Interests
              </label>
              <input
                type="text"
                id="interests"
                className="career-form-input1"
                placeholder="What Are Your Interests?"
                rows="5"
                cols="33"
                required
                value={formData?.interests}
                onChange={handleInputChange}
              />
            </div>
            {/* Textarea field for Job Preferences */}
            <div className="career-form-field12">
              <label htmlFor="jobPrefrences" className="career-form-label11111">
                Job Preferences
              </label>
              <input
                type="text"
                id="jobPrefrences"
                className="career-form-input1"
                placeholder="What Are Your Job Preferences?"
                rows="5"
                cols="33"
                required
                value={formData?.jobPrefrences}
                onChange={handleInputChange}
              />
            </div>
            {/* Submit button */}
            <div className="button-field12">
             
                <button
                  type="submit"
                  className="submit-button12"
                  onClick={handleSubmit} // Trigger form submission when the button is clicked
                >
                  Submit
                </button>
              
            </div>
          </form>
          {/* Display the result */}
          <div className="career-form-field1233345">
            <textarea
              type="text"
              className="career-form-input23"
              placeholder="Your Result will show here"
              contentEditable={false}
              value={result}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerPath; // Export the CareerPath component for use in other parts of the application
