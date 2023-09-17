import React from "react";
import AddAwards from "./AddAwards"; // Import the component for adding awards
import DisplayAwards from "./DisplayAwards"; // Import the component for displaying awards
import Sidenav from "../Sidenav"; // Import the side navigation component
import { useEffect } from "react"; // Import the useEffect hook for side effects
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for programmatic navigation

const SubmitAwards = () => {
    const navigate = useNavigate(); // Initialize the navigate function for redirection

    // Function to handle user authentication
    const handleAuth = () =>{
        const type = localStorage.getItem("userType"); // Get the user's type from local storage

        // Check if the user type is not "user," and if so, redirect to the login page
        if (type !== "user") {
            navigate("/login");
        }
    }

    // UseEffect to check user authentication when the component mounts
    useEffect(() => {
        handleAuth();
    }, []);

    return (
        <>
        <Sidenav /> {/* Render the side navigation component */}
        <DisplayAwards /> {/* Render the component for displaying awards */}
        <div className="profile-component-container-all">
            <AddAwards /> {/* Render the component for adding awards */}
        </div>
        </>
    );
}

export default SubmitAwards;
