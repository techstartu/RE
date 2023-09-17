import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Footer from "../../../Home/components/footer";

import ManageJobCard from "./ManageJobCard";
import RecentJobPosts from "./RecentJobPosts";

import { toast } from "react-toastify";
import "./ManageHiring.css";

const ManageHiring = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState();

  useEffect(() => {
    // Check user type, if not a company, redirect to login
    if (localStorage.getItem("userType") !== "company") navigate("/loginAsCompany");

    // Fetch and load job data when component mounts
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    try {
      const res = await fetch("/company/manageHiringGetJobs", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await res.json();
      setJobs(data.jobs);
      setSelectedJob(data.jobs[0]._id); // Set the first job as the selected job
    } catch (error) {
      toast.error(error);
    }
  };

  const changeJob = (id) => {
    // Update the selected job ID when a different job is clicked
    if (selectedJob !== id) setSelectedJob(id);
  };

  return (
    <>
      <Sidebar />
      <div className="manage-hiring-main-container">
        <div className="manage-hiring-heading-div">
          <h3 className="manage-hiring-heading">Manage Hiring</h3>
        </div>
        <div className="manage-hiring-job-cards-container">
          <div className="overlay" />
          <h3>Active Jobs</h3>
          <div className="manage-hiring-job-cards-div">
            {jobs.length ? (
              // Map over the list of jobs and render a ManageJobCard for each
              jobs.map((job, i) => {
                return (
                  <ManageJobCard
                    key={i}
                    job={job}
                    changeJob={changeJob}
                    selectedJob={selectedJob}
                  />
                );
              })
            ) : (
              <h4>No Jobs Yet</h4>
            )}
          </div>
        </div>
        <div className="manage-hiring-table-comp">
          {/* Render RecentJobPosts component with the selected job ID */}
          <RecentJobPosts jobID={selectedJob} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageHiring;
