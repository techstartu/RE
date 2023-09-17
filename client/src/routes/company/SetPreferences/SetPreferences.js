import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../companyContext";
import "./SetPreferences.css";
import Header from "../../Home/components/header";

export const SetPreferences = () => {
    // Access preferences and setPreferences from context
    const { preferences, setPreferences } = useContext(UserContext);

    // Handle input changes and update preferences
    const handleInputChange = (e) => {
        setPreferences({ ...preferences, [e.target.id]: e.target.value });
        console.log(preferences);
    };

    // State for storing email addresses
    const [emails, setEmails] = useState([]);

    // Handle adding an email to the list
    const handleAddEmail = () => {
        if (preferences.email) {
            setEmails((prevEmails) => [...prevEmails, preferences.email]);
            setPreferences({ ...preferences, email: preferences.email });
        }
    };

    // Initialize navigation
    const navigate = useNavigate();

    // Handle navigation to the next page
    const NextPage = (e) => {
        e.preventDefault();
        console.log("Running");
        navigate("/company/postJobReview");
    };

    // Handle navigation to the previous page
    const PrevPage = (e) => {
        e.preventDefault();
        console.log("Running");
        navigate("/company/paybenefits");
    };

    // Check user authentication and token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (localStorage.getItem("userType") !== "company")
            navigate("/loginAsCompany");
        if (token === null && !token) {
            console.log("token not found");
            navigate("/company/createaccount");
        } else {
            console.log("Token found!");
        }
    }, []);

    return (
        <>
            <Header active="company" />
            <div className="create-account-main-container">
                {/* Horizontal navigation indicators */}
                <div className="Horizontal-Line-below-header-parent-tech">
                    <div className="round-horizontal-1-tech">1</div>
                    <div className="line-horizontal-tech"></div>
                    <div className="round-horizontal-1-tech">2</div>
                    <div className="line-horizontal-tech"></div>
                    <div className="round-horizontal-1-tech">3</div>
                    <div className="line-horizontal-tech"></div>
                    <div className="round-horizontal-1-tech">4</div>
                    <div className="line-horizontal-2-tech"></div>
                    <div className="round-horizontal-2-tech">5</div>
                </div>
                {/* Page heading */}
                <div className="create-account-heading-container">
                    <h1 className="create-account-heading">Set Preferences</h1>
                </div>
                <div className="create-account-form-container">
                    <form action="" onSubmit={NextPage}>
                        <div>
                            {/* Input for adding an email */}
                            <label htmlFor="email" className="sendUpdates-pref">
                                Send daily updates to
                            </label>
                            <input
                                type="text"
                                id="email"
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                        {/* Button for adding an email */}
                        <button
                            type="button"
                            className="Perfrences-AddEmail-Button"
                            onClick={handleAddEmail}
                        >
                            + Add Email
                        </button>
                        <div>
                            {/* Display added email addresses */}
                            {emails.length > 0 && (
                                <ul>
                                    {emails.map((email, index) => (
                                        <li key={index}>{email}</li>
                                    ))}
                                </ul>
                            )}
                            {/* Checkboxes and labels for communication preferences */}
                            <div className="flex">
                                <input
                                    type="checkbox"
                                    id="sendIndividualEmails"
                                    className="input-pref123"
                                />
                                <label htmlFor="sendIndividualEmails">
                                    Plus, send an individual email update each
                                    time someone applies.
                                </label>
                            </div>
                            <div className="flex">
                                <input
                                    type="checkbox"
                                    id="ByEmailToTheAddress"
                                    className="input-pref123"
                                />
                                <label htmlFor="ByEmailToTheAddress">
                                    By email to the address provided
                                </label>
                            </div>
                            <div className="flex">
                                <input
                                    type="checkbox"
                                    id="ByPhone"
                                    className="input-pref123"
                                />
                                <label htmlFor="ByPhone">By Phone</label>
                            </div>
                        </div>
                        <div>
                            <h5 className="form-section-heading">
                                Application Preferences
                            </h5>
                            {/* Select for asking candidates for a CV */}
                            <label htmlFor="cv">
                                Ask potential candidates for a CV?
                            </label>
                            <select
                                id="cv"
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div>
                            {/* Input for setting an application deadline */}
                            <label htmlFor="applicationDeadline">
                                Application deadline
                            </label>
                            <input
                                type="date"
                                id="applicationDeadline"
                                placeholder="dd-mm-yyyy"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-button-div">
                            {/* Button for navigating to the previous page */}
                            <button
                                className="form-back-button"
                                onClick={PrevPage}
                            >
                                Back
                            </button>
                            {/* Button for submitting the form and continuing */}
                            <button
                                type="submit"
                                className="tech-detail-submit-button"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
