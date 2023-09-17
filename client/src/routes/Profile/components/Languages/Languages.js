import React from "react";
import LangForm from "./LangForm";
import Sidenav from "../Sidenav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Languages = () => {
    const navigate = useNavigate();

    // Function to handle user authentication
    const handleAuth = () =>{
        const type = localStorage.getItem("userType");
        if (type !== "user") {
            navigate("/login");
        }
    }

    // Use effect hook to check user authentication on component mount
    useEffect(() => {
        handleAuth();
    }, []);

    return (
        <>
            <Sidenav />
            <div className="profile-component-container-multi">
                <LangForm />
            </div>
        </>
    );
}

export default Languages;
