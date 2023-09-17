import React from "react";
import EduForm from "./EduForm"; // Import the Education Form component
import Sidenav from "../Sidenav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Education = () => {
    // Initialize navigation using the useNavigate hook
    const navigate = useNavigate();

    // Function to handle authentication
    const handleAuth = () =>{
        const type = localStorage.getItem("userType");
        if (type !== "user")
        {
            navigate("/login"); // Redirect to the login page if the user is not authenticated
        }
    }

    // Use the useEffect hook to call the handleAuth function when the component mounts
    useEffect(() => {
        handleAuth();
    }, []);

    return(
        <>
        <Sidenav />
        <div className="profile-component-container-multi">
        <EduForm /> {/* Render the Education Form component */}
        </div>
        
        </>
    );
}

export default Education;
