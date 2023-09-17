import React from "react";
import AddPublications from "./AddPublications";
import DisplayPub from "./DisplayPublications";
import Sidenav from "../Sidenav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubmitPub = () => {
    const navigate = useNavigate();

    // Function to handle user authentication
    const handleAuth = () => {
        const type = localStorage.getItem("userType");
        if (type !== "user") {
            navigate("/login");
        }
    }

    useEffect(() => {
        handleAuth(); // Check authentication when the component mounts
    }, []);

    return (
        <>
            <Sidenav />
            <DisplayPub />
            <div className="profile-component-container-all">
                <AddPublications />
            </div>
        </>
    );
}

export default SubmitPub;
