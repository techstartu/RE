import React from 'react';
import Sidenav from '../components/Sidenav';
import Images from '../components/Images';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
    const navigate = useNavigate();

    // Function to check user authentication
    const handleAuth = () => {
        const type = localStorage.getItem("userType");
        if (type !== "user") {
            navigate("/login");
        }
    }

    useEffect(() => {
        // Call the authentication function on component mount
        handleAuth();
    }, []);

    return (
        <>
            <Sidenav />
            <Images />
        </>
    );
}

export default PersonalInformation;
