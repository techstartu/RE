import React, { createContext, useState } from "react";

// Create a context for user-related data
export const UserContext = createContext();

// Create a provider component to wrap around the application
export const UserContextProvider = ({ children }) => {
    // Define state variables for different types of user data
    const [companyInfo, setcompanyInfo] = useState({});
    const [jobBasics, setjobBasics] = useState({});
    const [techDetails, setTechDetails] = useState({});
    const [payBenefits, setPayBenefits] = useState({});
    const [preferences, setPreferences] = useState({});
    const [postJobReview, setPostJobReview] = useState({});
    const [keyQualities, setKeyQualities] = useState([]);

    /*const updateUser = (newUserInfo) => {
        setUserInfo((prevState) => ({
            ...prevState,
            ...newUserInfo,
        }));
    };*/

    return (
        // Provide the defined state variables and setter functions to the context
        <UserContext.Provider
            value={{
                companyInfo,
                setcompanyInfo,
                jobBasics,
                setjobBasics,
                techDetails,
                setTechDetails,
                payBenefits,
                setPayBenefits,
                preferences,
                setPreferences,
                postJobReview,
                setPostJobReview,
                keyQualities,
                setKeyQualities,
            }}
        >
            {children} {/* Render the wrapped components */}
        </UserContext.Provider>
    );
};
