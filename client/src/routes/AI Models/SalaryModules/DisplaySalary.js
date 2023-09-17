import React from "react";
import "./SalaryForm.css";
import { Link, useParams } from "react-router-dom";
import Header from "../../Home/components/header";

const DisplaySalary = () => {
  // Retrieve the 'salary' parameter from the URL using 'useParams'
  const params = useParams();
  const { salary } = params;
  console.log(salary);

  return (
    <>
      {/* Render the Header component with 'salary' as the active tab */}
      <Header active="salary" />

      {/* Main container for the salary display */}
      <div className="salary-container">
        {/* Container for the top rectangle with the heading */}
        <div className="rectangle-salary">
          {/* Heading for the Salary Module */}
          <h1 className="heading-salary">Salary Module</h1>
        </div>

        {/* Container for the new heading */}
        <div className="new-heading-salary-container">
          <h2 className="new-heading-salary3">
            User Interface / User Experience (UI / UX) Designer
            <br /> salary estimate in Pakistan.
          </h2>
        </div>

        {/* Container for the salary information */}
        <div className="form-salary-container">
          {/* Container for the main salary image */}
          <div className="main-salary-image">
            {/* Main circular image */}
            <img src={"/Circle.png"} alt="circle" className="main-image" />

            {/* Container for the small image and salary text */}
            <div className="small-image-container">
              {/* Small wallet image */}
              <img src={"/wallet.png"} alt="wallet" className="small-image" />

              {/* Container for displaying the salary */}
              <div className="rs-container">
                <div className="rs-text">{salary}</div>
              </div>
            </div>
          </div>

          {/* AI-generated text */}
          <p className="ai-generated-text">
            This is an AI-generated estimate that can vary.
          </p>
        </div>

        {/* Commented out button */}
        {/* <div className="button-salary-container">
          <Link to="/candidate-infoform">
            <button
              type="submit"
              className="next-button-Salrry"
              style={{
                alignSelf: "flex-end",
                marginBottom: "40px",
              }}
            >
              Enter Candidate Information
            </button>
          </Link>
        </div> */}
      </div>
    </>
  );
};

export default DisplaySalary;
