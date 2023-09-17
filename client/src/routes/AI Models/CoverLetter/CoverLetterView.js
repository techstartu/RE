import React, { useEffect, useState } from "react";
import "./CoverLetterView.css";
import { Form, Link } from "react-router-dom";
import { useContext } from "react";
import { useLetterContext } from "../CoverLetterContext";
import Header from "../../Home/components/header";

export const  CoverLetterView = () => {
  // Retrieve the cover letter content using the context API
  const { letter } = useLetterContext();

  return (
    <>
      {/* Render the Header component with 'cover' as the active tab */}
      <Header active="cover" />

      {/* Main container for the cover letter view */}
      <div className="cover-letter-main-container11">
        {/* Container for the heading section */}
        <div className="cover-letter-heading-container">
          {/* Heading for the cover letter view */}
          <h1 className="cover-letter-heading">Build Your Cover Letter</h1>
        </div>

        {/* Container for the contact information */}
        <div className="cover-letter-contact-container">
          {/* Question about the best way for employers to contact */}
          <h3 className="cover-letter-contact-question">
            What&apos;s the best way for employers to contact you?
          </h3>
          {/* Paragraph suggesting including an Email and Phone Number */}
          <p className="cover-letter-contact-para">
            We suggest including an Email and Phone Number.
          </p>
        </div>

        {/* Container for the cover letter content */}
        <div className="cover-letter-info-container">
          {/* Heading for the cover letter sample */}
          <h1 className="cover-sample-heading111">Cover Letter Sample</h1>

          {/* Container for the cover letter content */}
          <div className="headings-2">
            {/* Render the cover letter content */}
            <p className="para-cover-letter">
              <p>{letter}</p>
            </p>
          </div>
        </div>

        {/* Container for the buttons */}
        <div className="buttons-containerss111">
          {/* Buttons for changing the template (currently commented out) */}
          {/* <div className="cover-letter-view-template-button111">
            <Link to="/coverbuilder">
              <button className="cover-letter-back-button11">
                Change template
              </button>
            </Link>
          </div> */}
        </div>

        {/* Container for the navigation buttons */}
        <div className="buttons-containerss1">
          <div className="custom-cover-letter-button-container">
            {/* Button to navigate back to the cover letter form */}
            <Link to="/coverletterform">
              <button className="cover-letter-back-button">BACK</button>
            </Link>
            {/* Button to navigate to the career coach page */}
            <Link to="/careercoach">
              <button className="cover-letter-next-button132">SUBMIT</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
                    