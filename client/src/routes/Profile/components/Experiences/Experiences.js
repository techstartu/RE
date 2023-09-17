import React from "react";
import ExpForm from "./ExpForm";
import Sidenav from "../Sidenav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Experiences = () => {
    // Initialize the navigate function from react-router-dom
    const navigate = useNavigate();
    
    // Function to handle authentication
    const handleAuth = () => {
        // Get the user type from local storage
        const type = localStorage.getItem("userType");
        
        // Redirect to the login page if the user is not logged in
        if (type !== "user") {
            navigate("/login");
        }
    }
    
    // Use useEffect to run the authentication check when the component mounts
    useEffect(() => {
        handleAuth();
    }, []);
    
    return (
        <>
            <Sidenav />
            <div className="profile-component-container-multi">
                {/* Render the Experience Form component */}
                <ExpForm />
            </div>
        </>
    );
}

export default Experiences;
