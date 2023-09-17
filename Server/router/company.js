// Import necessary modules and controllers
import express from "express";
import { verifyCompanyToken } from "../middlewares/middleware.js";

import {
    registerCompany,
    loginCompany,
    ForgetPassword,
    SetPassword,
    setProfile,
    getProfile,
    getDashboardInfo,
    getPieInfo,
    manageHiringGetJobs,
} from "../controllers/company.js";

// Create an Express router
const router = express.Router();

// Define routes for company-related actions

// Route to register a new company
router.post("/register", registerCompany);

// Route to allow a company to log in
router.post("/login", loginCompany);

// Route to initiate the password reset process
router.post("/forgetPassword", ForgetPassword);

// Route to set a new password after reset
router.post("/setPassword", SetPassword);

// Route to set the company's profile with token verification
router.post("/setProfile", verifyCompanyToken, setProfile);

// Route to get the company's profile with token verification
router.get("/getProfile", verifyCompanyToken, getProfile);

// Route to get dashboard information with token verification
router.get("/getDashboard", verifyCompanyToken, getDashboardInfo);

// Route to get pie chart information with token verification
router.get("/getPieInfo", verifyCompanyToken, getPieInfo);

// Route to manage hiring by getting jobs with token verification
router.get("/manageHiringGetJobs", verifyCompanyToken, manageHiringGetJobs);

export default router;
