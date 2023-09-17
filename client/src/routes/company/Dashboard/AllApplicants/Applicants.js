// Import necessary components and dependencies
import AppSearch from "./AppSearch";
import AppTable from "./AppTable";
import Sidebar from "../../Sidebar";
import Footer from "../../../Home/components/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define the Applicants component
const Applicants = () => {
    // Initialize the navigate function from react-router-dom
    const navigate = useNavigate();

    // Function to handle authentication and redirect if the user is not a company
    const handleAuth = () => {
        // Retrieve the user type from local storage
        const type = localStorage.getItem("userType");
        
        // Check if the user type is not "company"
        if (type !== "company") {
            navigate("/loginAsCompany"); // Redirect to the login page for companies
        }
    };

    // Use useEffect to check authentication on component mount
    useEffect(() => {
        handleAuth(); // Call the authentication handling function
    }, []);

    return (
        <div className="main-container-for-applicants">
            <div className="sub-container-for-applicants">
                <Sidebar />
                <div className="test900">
                    <div className="dashboard-component-container3">
                        <AppTable />
                    </div>
                </div>
            </div>
            <div className="test9001">
                <Footer className="footer-applicants" style={{ width: 100 }} />
            </div>
        </div>
    );
};

export default Applicants;
