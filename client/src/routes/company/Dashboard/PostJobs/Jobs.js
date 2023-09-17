import React from "react";
import PostJobs from "./PostJobs";
import Sidebar from "../../Sidebar";
import Footer from "../../../Home/components/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  // Initialize navigation
  const navigate = useNavigate();

  // Function to handle authentication and redirect if the user is not a company
  const handleAuth = () => {
    const type = localStorage.getItem("userType");
    if (type !== "company") {
      navigate("/loginAsCompany");
    }
  };

  // Use useEffect to perform actions after component mount
  useEffect(() => {
    handleAuth(); // Check user authentication
  }, []);

  return (
    <>
      <Sidebar />
      <div className="dashboard-component-container">
        {/* Render the PostJobs component */}
        <PostJobs />
        <Footer />
      </div>
    </>
  );
};

export default Jobs;
