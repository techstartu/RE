import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SalaryForm.css";
import Header from "../../Home/components/header";

const SalaryForm = () => {
  // Define state variables for form data and loading state
  const [formData, setFormData] = useState({
    currentRole: "",
    experience: "",
    education: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);

  // Access the 'navigate' function from the router
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Set loading state to true while sending the request
    setLoading(true);

    // Log the form data
    console.log("Form data: ", formData);

    try {
      // Send a POST request to the server
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the response is successful, parse the JSON data
        const data = await response.json();
        console.log("Response:", data);

        // Navigate to the 'salarydisplay' route with the prediction result
        navigate(`/salarydisplay/${data[0]}`);
      } else {
        // Handle errors in the response
        console.error("Error:", response.statusText);

        // Set loading state to false in case of an error
        setLoading(false);
      }
    } catch (error) {
      // Handle network errors or exceptions
      console.error("Error:", error);

      // Set loading state to false in case of an error
      setLoading(false);
    }
  };

  // Handle input changes and update the form data
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <>
      {/* Render the Header component with 'salary' as the active tab */}
      <Header active="salary" />

      {/* Main container for the salary form */}
      <div className="salary-container">
        {/* Container for the top rectangle with the heading */}
        <div className="rectangle-salary">
          {/* Heading for the Salary Module */}
          <div className="heading-salary">Salary Module</div>
        </div>

        {/* Container for the new heading */}
        <div className="new-heading-salary-container">
          <div className="new-heading-salary1">Calculate your salary</div>
          <p className="new-heading-salary2">
            Get paid what you&apos;re worth in today&apos;s job market
          </p>
        </div>

        {/* Container for the salary form */}
        <div className="form-salary-container ">
          {/* Form element for user input */}
          <form action="" className="salary-form " onSubmit={handleSubmit}>
            {/* Container for form input fields */}
            <div className="cover-letter-form-div">
              <div>
                <label htmlFor="currentRole" className="salary-form-label">
                  Current Role
                </label>
                <input
                  id="currentRole"
                  className="salary-form-input"
                  type="text"
                  placeholder="Enter your current role"
                  required
                  value={formData?.currentRole}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="experience" className="salary-form-label">
                  Experience
                </label>
                <input
                  className="salary-form-input"
                  id="experience"
                  type="text"
                  placeholder="Enter your experience"
                  value={formData?.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="education" className="salary-form-label">
                  Education
                </label>
                <input
                  className="salary-form-input"
                  id="education"
                  type="text"
                  placeholder="Enter your education"
                  value={formData?.education}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="salary-form-label">
                  Country
                </label>
                <input
                  className="salary-form-input"
                  id="country"
                  type="text"
                  placeholder="Enter your country"
                  value={formData?.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Container for the submit button */}
            <div
              className="button-field-salary"
              
            >
              {/* Submit button */}
              <button
                type="submit"
                className="next-button-Salrry112"
                onClick={handleSubmit}
              >
                {loading ? "loading..." : "Find Salary"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SalaryForm;
