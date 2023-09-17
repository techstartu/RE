import React, { useContext, useState } from "react";
import "./CoverLetterForm.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../Home/components/header";
import { useLetterContext } from "../CoverLetterContext";

// Pre-defined cover letter template
const data = `I am writing to express my strong interest in the [Job Title] position at [Company.Name]. With my [relevant skills/experience/education] and a passion for 
 [industry/field], I am confident in my ability to contribute to your team and help [Company.Name] achieve its goals. Over the course of my career, I have honed valuable skills in [mention a few key skills relevant to the job]. 
 This experience has equipped me with a solid foundation in [specific skills/areas] and a proven track record of [achievement/relevant results]. Additionally, my academic background in 
 [your degree and university] has provided me with a strong theoretical understanding of[relevant subject matter]. What particularly excites me about 
 [Company Name] is [mention something specific about the company, such as its mission, innovative projects, or culture].I believe that my skills and 
 enthusiasm align perfectly with [Company Name]'s values and objectives, making me a valuable asset to your team. I am impressed by [Company Name]'s commitment to [mention something specific about the company's values or goals], and I am eager to contribute to 
 these efforts. As a [Job Title], I am confident in my ability to [mention a few responsibilities or contributions you would make] and help drive 
 [Company Name]'s success. Enclosed is my resume, which provides additional details about my professional background and accomplishments. I welcome the
  opportunity to discuss how my skills and experiences align with the needs of [Company Name] in greater detail. Please feel free to reach out to me at 
  [Your Phone Number] or [Your Email Address] to schedule an interview.Thank you for considering my application. I look forward to the opportunity to further 
  discuss how my qualifications make me an ideal candidate for the [Job Title] position at [Company Name].`; // (Your cover letter content here)

export const CoverLetterForm = () => {
  // Define and initialize form state using useState
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    email: "",
    address: "",
    companyName: "",
    hiringManager: "",
    letterDetails: "",
  });

  // Access the navigation function from React Router
  const navigate = useNavigate();

  // Access the setLetter function from the context
  const { setLetter } = useLetterContext();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data: ", formData);

    try {
      // Send a POST request to the server with form data
      const response = await fetch("http://localhost:5000/cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the response is successful, parse and set the letter data
        const data = await response.json();
        console.log("Response:", data);
        setLetter(data[0]);

        // Navigate to the cover letter view page
        navigate("/coverletterview");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle input changes and update form state
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <>
      <Header active="cover" />
      <div className="cover-letter-main-container">
        <div className="cover-letter-heading-container23">
          <h1 className="cover-letter-heading">Build Your Cover Letter</h1>
        </div>
        <div className="cover-letter-contact-container">
          <h2 className="cover-letter-contact-question1">
            What's the best way for employers to contact you?
          </h2>
          <div className="cover-letter-contact-question2">
            We suggest including an Email and Phone Number
          </div>
        </div>

        <div className="cover-letter-info-container1">
          <form action="" className="cover-letter-form" onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <div className="cover-letter-form-div">
              <div className="heading-size1">Personal Details</div>
              <div>
                <label htmlFor="">Fullname</label>
                <input
                  id="name"
                  type="text"
                  value={formData?.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="">Job Title</label>
                <input
                  id="jobTitle"
                  type="text"
                  value={formData?.jobTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  id="email"
                  type="text"
                  value={formData?.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="">Address</label>
                <input
                  id="address"
                  type="text"
                  value={formData?.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Employer Details Section */}
            <div className="cover-letter-form-div">
              <div className="cover-letter-form-section-heading1">
                <div className="heading-size1">Employer Details</div>
              </div>
              <div>
                <label htmlFor="">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  value={formData?.companyName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="">Hiring Manager Name</label>
                <input
                  id="hiringManager"
                  type="text"
                  value={formData?.hiringManager}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {/* Letter Details Section */}
            <div className="cover-letter-form-div">
              <div className="cover-letter-form-section-heading12">
                <div className="heading-size1">Letter Details</div>
              </div>
              <div className="label-for-life">
                <label htmlFor="" className="lalle">
                  3–4 paragraphs explaining why you're the perfect candidate for
                  a specific job.
                </label>
                <textarea
                  id="letterDetails"
                  cols="30"
                  rows="8"
                  placeholder="Text here..."
                  value={formData?.letterDetails}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            {/* Buttons for navigation */}
            <div
              className="cover-letter-button-container"
              style={{ marginTop: "60px" }}
            >
              <Link to="" onClick={handleSubmit}>
                <button className="button123">Next</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
