import React from "react";
import ListingsTable from "./ListingsTable";
import Sidebar from "../../Sidebar";
import Footer from "../../../Home/components/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AllApplicants/AppTable.css";

const Listings = () => {
    const navigate = useNavigate();

    // Function to handle authentication and redirect to the company login page if not authenticated
    const handleAuth = () => {
        const userType = localStorage.getItem("userType");
        if (userType !== "company") {
            navigate("/loginAsCompany");
        }
    };

    useEffect(() => {
        // Check authentication status when the component mounts
        handleAuth();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="dashboard-component-container32">
                {/* Render the ListingsTable component */}
                <ListingsTable />
            </div>
            <div className="test9002">
                {/* Render the Footer component */}
                <Footer className="footer-9000" />
            </div>
        </>
    );
};

export default Listings;
