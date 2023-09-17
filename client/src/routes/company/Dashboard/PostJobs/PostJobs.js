import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const PostJobs = () => {
    // State to manage form data
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

    // State to manage the selected degree
    const [degree, setDegree] = useState("");

    // Function to handle changes in form fields
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

        // Get the user's token from local storage
        const token = localStorage.getItem("token");

        // Define the API endpoint
        const apiUrl = "/job/postJob";

        // Set headers for the API request
        const headers = {
            Authorization: token,
        };

        // Send a POST request to the backend
        axios
            .post(apiUrl, formattedData, { headers })
            .then((response) => {
                toast.success(response.data.message);
                // Clear form fields on successful submission
                setFormData({
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
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error sending data to the backend.");
            });
    };

    return (
        <div className="form-container-postjobs">
            <div className="shadow2">
                <form onSubmit={handleSubmit}>
                    <div className="postjobs-heading">Job Detail</div>
                    <div className="name-container">
                        {/* Job Title Input */}
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
                        {/* Job Type Select */}
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
                                <option value="Part Time">Part Time</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Contract">Contract</option>
                            </select>
                        </div>
                    </div>

                    {/* Job Level Select */}
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
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                        </select>
                    </div>

                    {/* Salary Range Inputs */}
                    <div className="name-container-exp">
                        <div className="input-group-exp">
                            <label className="label-exp" htmlFor="minSR">
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
                            <label className="label-exp" htmlFor="maxSR">
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

                    {/* Location Input */}
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

                    {/* Experience Select */}
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
                            <option value="6-10 Years">6-10 Years</option>
                            <option value="More than 10 Years">
                                More than 10 Years
                            </option>
                        </select>
                    </div>

                    {/* Education (Degree) Select */}
                    <div className="name-container-exp">
                        <div className="input-group-exp">
                            <label className="label-exp" htmlFor="minSR">
                                Education
                            </label>
                            <select
                                id="degree"
                                className="input-field"
                                required
                                value={degree}
                                onChange={(e) => setDegree(e.target.value)}
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
                            <label className="label" htmlFor="qualification">
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

                    {/* Application Deadline Input */}
                    <div className="linkedin-container">
                        <label className="label" htmlFor="applicationDeadline">
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

                    {/* Job Description Textarea */}
                    <div className="description-container-exp">
                        <label className="label-exp" htmlFor="jobDescription">
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

                    {/* Submit Button */}
                    <div className="button-container">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
            {/* Toast container for displaying success or error messages */}
            <ToastContainer />
        </div>
    );
};

export default PostJobs;
