import React, { useState } from "react";
import "../components/home.css"; // Importing CSS styles
import { toast } from "react-toastify"; // Importing toast notifications

// Newsletter component
function Newsletter() {
  // State variable to store the email input
  const [email, setEmail] = useState("");

  // Function to send the email
  const sendEmail = async () => {
    if (email === "") {
      return; // If the email is empty, do nothing
    }
    console.log(email); // Log the email to the console (for debugging)

    try {
      // Send a POST request to the "/user/sendEmail" endpoint
      const res = await fetch("/user/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Allowing cross-origin requests
          "Access-Control-Allow-Methods": "*", // Allowing all HTTP methods
        },
        body: JSON.stringify(email), // Sending the email as JSON in the request body
      });

      // Parse the response as JSON
      const data = await res.json();
      console.log(data); // Log the response data to the console (for debugging)

      // If the email was successfully sent, clear the email input field
      if (data.success) setEmail("");
    } catch (err) {
      console.log(err); // Log any errors that occur during the request
    }
  };

  return (
    <>
      {/* Newsletter section */}
      <div id="Newsletter" className="newsletterContainer">
        <div className="newsletterRect3"></div>
        <div className="newsletterRect2"></div>
        <div className="newsletterRect1">
          <h1 className="newsletterHeader">NEWSLETTER</h1>
          <h1 className="newsletterText">
            Join Our Newsletter for Exclusive Updates and Insights!
          </h1>
          <div className="newsletterEmailSection">
            {/* Email input field */}
            <input
              className="newsletterEmail ms-5"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update the email state on input change
            />
            {/* Subscribe button */}
            <button className="newsletterButton me-2" onClick={sendEmail}>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newsletter;
