import React from "react";
import CourForm from "./CourForm"; // Import the CourForm component
import Sidenav from "../Sidenav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Courses = () => {
    const navigate = useNavigate();
    
    // Function to check user authentication
    const handleAuth = () => {
        const type = localStorage.getItem("userType");
        if (type !== "user") {
            navigate("/login"); // Redirect to the login page if not authenticated as a user
        }
    }
    
    useEffect(() => {
        handleAuth(); // Call the authentication check when the component mounts
    }, []);
    
    return (
        <>
            <Sidenav /> {/* Render the Sidenav component */}
            <div className="profile-component-container-multi">
                <CourForm /> {/* Render the CourForm component */}
            </div>
        </>
    );
}

export default Courses;
