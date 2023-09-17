import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../Sidebar";
import Footer from "../../../Home/components/footer";

const EditJob = () => {
    // Extract jobID from the route parameters
    const paramData = useParams();
    const jobID = paramData && paramData.jobID;

    // Initialize navigation
    const navigate = useNavigate();

    // Initialize form data using useState
    const [formData, setFormData] = useState({
        jobTitle: "",
        jobType: "",
        jobLevel: "",
        maxSR: null,
        minSR: null,
        location: "",
        Experience: "",
        applicationDeadline: "",
        jobDescription: "",
        qualification: "",
    });

    // Function to handle authentication and redirect if user is not a company
    const handleAuth = () => {
        const type = localStorage.getItem("userType");
        if (type !== "company") {
            navigate("/loginAsCompany");
        }
    };

    // Use useEffect to perform actions after component mount
    useEffect(() => {
        handleAuth(); // Check user authentication
        getJobDetail(); // Fetch job details
    }, []);

    // Function to fetch job details
    const getJobDetail = () => {
        const token = localStorage.getItem("token");
        const headers = {
            Authorization: token,
        };
        axios
            .get(`/job/getJob/${jobID}`, { headers })
            .then((response) => {
                console.log(response.data.job);
                const job = response.data.job;

                if (job && job.qualification) {
                    if (Array.isArray(job.qualification)) {
                        // Handle qualification as an array
                        setDegree(job.qualification.slice(0, 2));
                        setFormData({
                            ...job,
                            qualification: job.qualification.slice(3, -1),
                        });
                    } else if (typeof job.qualification === "string") {
                        // Handle qualification as a string
                        setDegree(job.qualification.slice(0, 2));
                        setFormData({
                            ...job,
                            qualification: job.qualification.slice(3, -1),
                        });
                    }
                } else {
                    // Handle the case where qualification is missing or not defined
                    // You may want to set default values or handle it differently
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error getting jobDetail from the backend.");
            });
    };

    // Initialize degree using useState
    const [degree, setDegree] = useState("");

    // Function to handle form input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Format the data before sending it to the backend
        const formattedData = {
            jobTitle: formData.jobTitle,
            jobType: formData.jobType,
            jobLevel: formData.jobLevel,
            maxSR: formData.maxSR,
            minSR: formData.minSR,
            location: formData.location,
            Experience: formData.Experience,
            applicationDeadline: formData.applicationDeadline,
            jobDescription: formData.jobDescription,
            qualification: degree + " " + formData.qualification,
        };

        const token = localStorage.getItem("token");

        const headers = {
            Authorization: token,
        };

        // Send a POST request to edit the job
        axios
            .post(`/job/editJob/${jobID}`, formattedData, { headers })
            .then((response) => {
                toast.success(response.data.message);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error sending data to the backend.");
            });
    };

    return (
        <>
            <Sidebar />
            <div className="dashboard-component-container">
                <div className="form-container-postjobs">
                    <div className="shadow2">
                        <form onSubmit={handleSubmit}>
                            <div className="postjobs-heading">
                                Edit Job Detail
                            </div>
                            {/* Job Title and Job Type */}
                            <div className="name-container">
                                <div className="input-group-profile">
                                    <label className="label" htmlFor="jobTitle">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        id="jobTitle"
                                        className="input-field"
                                        placeholder="Designer"
                                        required
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-group-profile">
                                    <label className="label" htmlFor="jobType">
                                        Job Type
                                    </label>
                                    <select
                                        id="jobType"
                                        className="input-field-exp"
                                        required
                                        value={formData.jobType}
                                        onChange={handleChange}
                                    >
                                        <option value=""></option>
                                        <option value="Part Time">
                                            Part Time
                                        </option>
                                        <option value="Full Time">
                                            Full Time
                                        </option>
                                        <option value="Contract">
                                            Contract
                                        </option>
                                    </select>
                                </div>
                            </div>
                            
                            {/* Job Level */}
                            <div className="email-container">
                                <label className="label" htmlFor="jobLevel">
                                    Job Level
                                </label>
                                <select
                                    id="jobLevel"
                                    className="input-field-exp"
                                    required
                                    value={formData.jobLevel}
                                    onChange={handleChange}
                                >
                                    <option value=""></option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">
                                        Intermediate
                                    </option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>

                            {/* Salary Range */}
                            <div className="name-container-exp">
                                <div className="input-group-exp">
                                    <label
                                        className="label-exp"
                                        htmlFor="minSR"
                                    >
                                        Salary Range
                                    </label>
                                    <input
                                        type="text"
                                        id="minSR"
                                        className="input-field-exp"
                                        placeholder="Min-0000"
                                        required
                                        value={formData.minSR}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="input-group-exp">
                                    <label
                                        className="label-exp"
                                        htmlFor="maxSR"
                                    >
                                        &nbsp;
                                    </label>
                                    <input
                                        type="text"
                                        id="maxSR"
                                        className="input-field-exp"
                                        placeholder="Max-000"
                                        required
                                        value={formData.maxSR}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="address-container">
                                <label className="label" htmlFor="location">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    className="input-field"
                                    placeholder="house # 00 street # 00 Phase 0 Dummy Town"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Experience */}
                            <div className="address-container">
                                <label className="label" htmlFor="Experience">
                                    Experience
                                </label>
                                <select
                                    id="Experience"
                                    className="input-field"
                                    required
                                    value={formData.Experience}
                                    onChange={handleChange}
                                >
                                    <option value=""></option>
                                    <option value="Fresh">Fresh</option>
                                    <option value="Less than 1 Year">
                                        Less than 1 Year
                                    </option>
                                    <option value="1-2 Years">1-2 Years</option>
                                    <option value="3-5 Years">3-5 Years</option>
                                    <option value="6-10 Years">
                                        6-10 Years
                                    </option>
                                    <option value="More than 10 Years">
                                        More than 10 Years
                                    </option>
                                </select>
                            </div>

                            {/* Education */}
                            <div className="name-container-exp">
                                <div className="input-group-exp">
                                    <label
                                        className="label-exp"
                                        htmlFor="degree"
                                    >
                                        Education
                                    </label>
                                    <select
                                        id="degree"
                                        className="input-field"
                                        required
                                        value={degree}
                                        onChange={(e) =>
                                            setDegree(e.target.value)
                                        }
                                    >
                                        <option value=""></option>
                                        <option value="BS">BS</option>
                                        <option value="BA">BA</option>
                                        <option value="MS">MS</option>
                                        <option value="MA">MA</option>
                                        <option value="PhD">PhD</option>
                                    </select>
                                </div>
                                <div className="input-group-exp">
                                    <label
                                        className="label"
                                        htmlFor="qualification"
                                    >
                                        &nbsp;
                                    </label>
                                    <input
                                        type="text"
                                        id="qualification"
                                        className="input-field"
                                        placeholder="Qualification"
                                        required
                                        value={formData.qualification}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Application Deadline */}
                            <div className="linkedin-container">
                                <label
                                    className="label"
                                    htmlFor="applicationDeadline"
                                >
                                    Application Deadline
                                </label>
                                <input
                                    type="date"
                                    id="applicationDeadline"
                                    className={
                                        formData.applicationDeadline
                                            ? "input-field"
                                            : ""
                                    }
                                    required
                                    value={formData.applicationDeadline}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Job Description */}
                            <div className="description-container-exp">
                                <label
                                    className="label-exp"
                                    htmlFor="jobDescription"
                                >
                                    Description
                                </label>
                                <textarea
                                    type="description"
                                    id="jobDescription"
                                    className="input-field-exp-1"
                                    placeholder=""
                                    rows="4"
                                    required
                                    value={formData.jobDescription}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Submission Button */}
                            <div className="button-container">
                                <button type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default EditJob;
