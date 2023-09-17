import React from "react";
import AddCertifications from "./AddCertifications";
import DisplayCertifications from "./DisplayCertifications";
import Sidenav from "../Sidenav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SubmitCert = () => {
    const navigate = useNavigate();

    // Function to check user authentication
    const handleAuth = () =>{
        const type = localStorage.getItem("userType");
        if (type !== "user") {
            navigate("/login");
        }
    }

    useEffect(() => {
        // Check user authentication on component mount
        handleAuth();
    }, []);

    return (
        <>
        <Sidenav />
        <DisplayCertifications />
        <div className="profile-component-container-all">
            <AddCertifications />
        </div>
        </>
    );
}

export default SubmitCert;
