import React from "react";
import CertForm from "./CertForm";
import Sidenav from "../Sidenav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Certifications = () => {
    const navigate = useNavigate();

    // Check if the user is authenticated as "user," if not, redirect to the login page
    const handleAuth = () => {
        const type = localStorage.getItem("userType");
        if (type !== "user") {
            navigate("/login");
        }
    }

    useEffect(() => {
        handleAuth();
    }, []);

    return (
        <>
            <Sidenav />
            <div className="profile-component-container-multi">
                <CertForm />
            </div>
        </>
    );
}

export default Certifications;
