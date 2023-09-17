import React from "react";
import AwardsForm from "./AwardsForm"; // Import the AwardsForm component
import Sidenav from "../Sidenav"; // Import the Sidenav component
import { useEffect } from "react"; // Import the useEffect hook
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from React Router

// Define the Awards component
const Awards = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Define a function to handle authentication
    const handleAuth = () => {
        const type = localStorage.getItem("userType"); // Get the user type from local storage
        if (type !== "user") {
            navigate("/login"); // Redirect to the login page if the user type is not "user"
        }
    }

    // Use the useEffect hook to call the handleAuth function when the component mounts
    useEffect(() => {
        handleAuth();
    }, []);

    return (
        <>
            <Sidenav /> {/* Render the Sidenav component */}
            <div className="profile-component-container-multi">
                <AwardsForm /> {/* Render the AwardsForm component */}
            </div>
        </>
    );
}

export default Awards;
