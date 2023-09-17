import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar";
import "./CompanyDashboard.css";
import ManageJobCard from "./ManageJobCard";
import RecentJobPosts from "./RecentJobPosts";
import Footer from "../../../Home/components/footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CandidatePieChart from "./CandidatePiChart";

const CompanyDashboard = () => {
  // State variables for navigation and dashboard information
  const [nav, setNav] = useState(false);
  const [allInfo, setAllInfo] = useState({});
  const navigate = useNavigate();

  // useEffect to check user type and load dashboard data
  useEffect(() => {
    // Check if the user is not a company and redirect to login
    if (localStorage.getItem("userType") !== "company")
      navigate("/loginAsCompany");

    // Fetch and set the dashboard data when the component mounts
    getDashboard();
  }, []);

  // Extract user email and name from local storage
  const { email, name } = JSON.parse(localStorage.getItem("user"));

  // Function to fetch and set the dashboard data
  const getDashboard = async () => {
    try {
      const res = await fetch("/company/getDashboard", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      setAllInfo(data);
      console.log(data);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="company-dashboard-main-container">
        <div className="company-dashboard-welcome-div">
          <div>
            <h1 className="company-dashboard-heading">Welcome to Step200</h1>
            <p className="company-dashboard-para">
              {name ? name : email}
            </p>
          </div>
          <div className="company-dashboard-image">
            <img src="/girlWithBook.png" alt="image" />
          </div>
        </div>
        <div className="company-dashboard-job-cards-container">
          <ManageJobCard for="Post" count={allInfo.jobPosted} />
          <ManageJobCard for="Applied" count={allInfo.applied} />
          <ManageJobCard for="View" count={allInfo.applied} />
        </div>
        <div className="company-dashboard-job-table-comp">
          <RecentJobPosts jobs={allInfo.jobs} setAllInfo={setAllInfo} />
        </div>
        <div className="pie-chart-holder">
          <CandidatePieChart />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompanyDashboard;
