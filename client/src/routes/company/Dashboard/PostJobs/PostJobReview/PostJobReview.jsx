import React, { useState, useEffect } from "react";
import "./ReviewJob.css";
import Header from "../../../../Home/components/header";
import Line from "./line";
import Pen from "../../../../../assests/svg/pen-svg";
import Cross from "../../../../../assests/svg/cross-svg";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../companyContext";
import { useContext } from "react";

const PopUp = ({ closePopUpTwo, closePopUp, title, cont, input }) => {
    const handleInputChange = (event) => {
        input = event.target.value;
        console.log(input);
    };

    return (
        <>
            <div className="Parent-Container-PopUp">
                <div className="PopUp-Container">
                    <div
                        className="cross-svg-container"
                        onClick={closePopUpTwo}
                    >
                        <Cross />
                    </div>
                    <div className="Edit-JobPost-Heading">Edit Job Post</div>

                    <input
                        className="input-field-pop-up-box"
                        placeholder="Enter change"
                        id="changeJobTitle"
                        onChange={handleInputChange}
                    />
                    <div className="popUpBox-Button-Container">
                        <button
                            className="Done-button"
                            onClick={() => closePopUp(input)}
                        >
                            Done
                        </button>
                        <button
                            className="Close-button"
                            onClick={closePopUpTwo}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

function ReviewJob() {
    useEffect(() => {
        if (localStorage.getItem("userType") !== "company")
            navigate("/loginAsCompany");
        //check for token
        const token = localStorage.getItem("token");
        if (token === null && !token) {
            console.log("token not found");
            navigate("/company/createaccount");
        } else {
            console.log("Token found!");
        }
    }, []);
    const {
        companyInfo,
        setcompanyInfo,
        jobBasics,
        setjobBasics,
        techDetails,
        setTechDetails,
        payBenefits,
        setPayBenefits,
        preferences,
        setPreferences,
        postJobReview,
        setPostJobReview,
        keyQualities,
        setKeyQualities,
    } = useContext(UserContext);

    console.log("data2: ", preferences.email);

    const handleInputChange = (e) => {
        setPostJobReview({ ...postJobReview, [e.target.id]: e.target.value });
        console.log(postJobReview);
    };

    const navigate = useNavigate();

    function NextPage(e) {
        e.preventDefault();
        console.log("Running");
        navigate("/company/keyQualities");
    }

    function PreviousPage(e) {
        e.preventDefault();
        console.log("Running");
        navigate("/company/setpreferences");
    }

    const [showPopUp, setShowPopUp] = useState(false);

    const openPopUp = () => {
        setShowPopUp(true);
    };
    const closePopUpTwo = () => {
        setShowPopUp(false);
    };
    const closePopUp = (e) => {
        console.log(e);
        if (formField === "jobTitle") {
            setjobBasics({
                ...jobBasics,
                jobTitle: e,
            });
        }
        if (formField === "companyForThisJob") {
            setcompanyInfo({
                ...companyInfo,
                name: e,
            });
        }
        if (formField === "numberOfOpenings") {
            setTechDetails({
                ...techDetails,
                openings: e,
            });
        }
        if (formField === "location") {
            setjobBasics({
                ...jobBasics,
                location: e,
            });
        }
        if (formField === "payment") {
            setPayBenefits({
                ...payBenefits,
                salaryRange: e,
            });
        }
        if (formField === "schedule") {
            setTechDetails({
                ...techDetails,
                jobSchedule: e,
            });
        }
        if (formField === "cv") {
            setPreferences({
                ...preferences,
                cv: e,
            });
        }

        if (formField === "deadline") {
            setPreferences({
                ...preferences,
                applicationDeadline: e,
            });
        }
        if (formField === "phone") {
            setcompanyInfo({
                ...companyInfo,
                phNo: e,
            });
        }
        if (formField === "em") {
            setPreferences({
                ...preferences,
                email: e,
            });
        }
        if (formField === "contactName") {
            setcompanyInfo({
                ...companyInfo,
                firstAndLastName: e,
            });
        }

        if (formField === "Benefits") {
            setPayBenefits({
                ...payBenefits,
                Benefits: e,
            });
        }

        setShowPopUp(false);
    };

    const [formState, setFormState] = useState();
    const [formField, setFormField] = useState();
    const [inputValue, setInputValue] = useState("");

    return (
        <>
            <div>
                <Header active="company" />
                {showPopUp && (
                    <PopUp
                        closePopUpTwo={closePopUpTwo}
                        closePopUp={closePopUp}
                        state={formState}
                        field={formField}
                        input={inputValue}
                    />
                )}
                <div className="Step22-Parent-Container">
                    <div className="Review-Heading">Review</div>
                    <div className="Details-Heading">Details</div>
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Job Title</div>
                        <div className="Option-Heading-2">
                            {jobBasics.jobTitle}
                        </div>
                        <div
                            className="Pen-Container"
                            onClick={() => {
                                setFormState("jobBasics");
                                setFormField("jobTitle");
                                openPopUp("jobTitle", jobBasics);
                            }}
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>

                    {/* Copying and pasting the upper code */}
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">
                            Company For This Job
                        </div>
                        <div className="Option-Heading-2">
                            {companyInfo.name}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("companyInfo");
                                setFormField("companyForThisJob");
                                openPopUp("companyForThisJob", companyInfo);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Number Of Openings</div>
                        <div className="Option-Heading-2">
                            {techDetails.openings}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("techDetails");
                                setFormField("numberOfOpenings");
                                openPopUp("numberOfOpenings", techDetails);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Location</div>
                        <div className="Option-Heading-2">
                            {jobBasics.location}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("jobBasics");
                                setFormField("location");
                                openPopUp("location", jobBasics);
                                console.log(jobBasics.location);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Minium Salary</div>
                        <div className="Option-Heading-2">
                            {payBenefits.minSR}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("jobBasics");
                                setFormField("location");
                                openPopUp("location", jobBasics);
                                console.log(jobBasics.location);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Maximum Salary</div>
                        <div className="Option-Heading-2">
                            {payBenefits.maxSR}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("jobBasics");
                                setFormField("location");
                                openPopUp("location", jobBasics);
                                console.log(jobBasics.location);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                    {/*<div className="Option-Heading-Container">
                    <div className="Option-Heading">
                        Part-time hours per week
                    </div>
                    <div className="Option-Heading-2">No Option</div>
                    <div
                       onClick={() => {
                            setFormState("techDetails");
                            setFormField("numberOfOpenings");
                            openPopUp("numberOfOpenings", techDetails);
                        }}
                        className="Pen-Container"
                    >
                        <Pen className="Pen-Icon" />
                    </div>
                </div>
                    <Line />*/}
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Schedule</div>
                        <div className="Option-Heading-2">
                            {techDetails.jobSchedule}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("techDetails");
                                setFormField("schedule");
                                openPopUp("schedule", techDetails);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Benefits</div>
                        <div className="Option-Heading-2">
                            {payBenefits.Benefits}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("payBenefits");
                                setFormField("Benefits");
                                openPopUp("Benefits", payBenefits);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                    {/*<div className="Option-Heading-Container">
                    <div className="Option-Heading">Job Description </div>
                    <div className="Option-Heading-2">No Option</div>
                    <div onClick={openPopUp} className="Pen-Container">
                        <Pen className="Pen-Icon" />
                    </div>
                </div>
                    <Line />*/}
                </div>

                {/*Using the same code for next container Settings */}

                <div className="Step22-Parent-Container-2">
                    <div className="Settings-Heading">Settings</div>
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Require CV</div>
                        <div className="Option-Heading-2">{preferences.cv}</div>
                        <div
                            onClick={() => {
                                setFormState("preferences");
                                setFormField("cv");
                                openPopUp("cv", preferences);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    {/* Copying and pasting the upper code */}
                    <Line />
                    {/*<div className="Option-Heading-Container">
                    <div className="Option-Heading">Application updates</div>
                    <div className="Option-Heading-2">No Option</div>
                    <div onClick={openPopUp} className="Pen-Container">
                        <Pen className="Pen-Icon" />
                    </div>
                </div>
                    <Line />*/}
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">
                            Application deadline
                        </div>
                        <div className="Option-Heading-2">
                            {preferences.applicationDeadline}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("preferences");
                                setFormField("deadline");
                                openPopUp("deadline", preferences);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">
                            Candidates contact you (Phone)
                        </div>
                        <div className="Option-Heading-2">
                            {companyInfo.phNo}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("companyInfo");
                                setFormField("phone");
                                openPopUp("phone", companyInfo);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                    {/*
                <div className="Option-Heading-Container">
                    <div className="Option-Heading">Reference ID</div>
                    <div className="Option-Heading-2">No Option</div>
                    <div onClick={openPopUp} className="Pen-Container">
                        <Pen className="Pen-Icon" />
                    </div>
                </div>
                <Line />
                <div className="Option-Heading-Container">
                    <div className="Option-Heading">Application method</div>
                    <div className="Option-Heading-2">No Option</div>
                    <div onClick={openPopUp} className="Pen-Container">
                        <Pen className="Pen-Icon" />
                    </div>
                </div>
                <Line />
                    */}
                </div>

                {/*Again Copying for container 3 Account */}

                <div className="Step22-Parent-Container-3">
                    <div className="Settings-Heading">Account</div>
                    <Line />
                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Contact</div>
                        <div className="Option-Heading-2">
                            {preferences.email}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("preferences");
                                setFormField("em");
                                openPopUp("em", preferences);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    {/* Copying and pasting the upper code */}
                    <Line />

                    <div className="Option-Heading-Container">
                        <div className="Option-Heading">Phone Number</div>
                        <div className="Option-Heading-2">
                            {companyInfo.phNo}
                        </div>
                        <div
                            onClick={() => {
                                setFormState("companyInfo");
                                setFormField("phone");
                                openPopUp("phone", companyInfo);
                            }}
                            className="Pen-Container"
                        >
                            <Pen className="Pen-Icon" />
                        </div>
                    </div>
                    <Line />
                </div>
                <div className="Button-Container-review">
                    <button className="Back-Button" onClick={PreviousPage}>
                        Back
                    </button>
                    <button className="Confirm-Button" onClick={NextPage}>
                        Confirm
                    </button>
                </div>
            </div>
        </>
    );
}

export default ReviewJob;
