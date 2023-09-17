import React from "react";
import CompProfile from "./CompProfile";
import Sidebar from "../../Sidebar";
import Footer from "../../../Home/components/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  // Get the navigation function from React Router.
  const navigate = useNavigate();

  // Function to handle authentication. Redirects to "/loginAsCompany" if the user is not a company.
  const handleAuth = () => {
    const type = localStorage.getItem("userType");
    if (type !== "company") {
      navigate("/loginAsCompany"); // Redirect to the login page for companies.
    }
  };

  // Use the useEffect hook to run the authentication function when the component mounts.
  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <>
      {/* Render the Sidebar component for navigation */}
      <Sidebar />

      {/* Render the main content container */}
      <div className="dashboard-component-container">
        {/* Render the CompProfile component for managing company profiles */}
        <CompProfile />

        {/* Render the Footer component */}
        <Footer />
      </div>
    </>
  );
};

export default Profile;
