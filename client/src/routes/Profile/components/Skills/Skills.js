import React from "react";
import SkillInput from "./SkillsInput";
import Sidenav from "../Sidenav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Skills = () => {
    const navigate = useNavigate();

    // Function to handle user authentication
    const handleAuth = () => {
        const type = localStorage.getItem("userType");
        if (type !== "user") {
            navigate("/login");
        }
    }

    // Ensure user authentication on component mount
    useEffect(() => {
        handleAuth();
    }, []);

    return (
        <>
            <Sidenav />
            <div className="profile-component-container-multi">
                <SkillInput />
            </div>
        </>
    );
}

export default Skills;
