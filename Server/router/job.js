// Import necessary modules and controllers
import express from "express";

import { verifyJWT, verifyCompanyToken } from "../middlewares/middleware.js";
import {
    applyForJob,
    getJobs,
    postJob,
    getApplicantssOfAJob,
    getAllApplicants,
    changeStage,
    deleteApplication,
    getAllJobs,
    deleteJob,
    getJob,
    editJob,
} from "../controllers/job.js";

// Create an Express router
const router = express.Router();

// Define routes for various job-related actions

// Route to get a list of all jobs
router.get("/getAllJobs", getAllJobs);

// Route to post a new job with company token verification
router.post("/postJob", verifyCompanyToken, postJob);

// Route to edit a job with company token verification
router.post("/editJob/:jobID", verifyCompanyToken, editJob);

// Route to apply for a job with JWT verification
router.post("/apply/:jobID", verifyJWT, applyForJob);

// Route to get details of a specific job
router.get("/getJob/:jobID", getJob);

// Route to delete a job with company token verification
router.get("/deleteJob/:jobID", verifyCompanyToken, deleteJob);

// Route to get jobs of a specific company with company token verification
router.get("/getJobs", verifyCompanyToken, getJobs);

// Route to get applicants of a specific job with company token verification
router.get(
    "/getApplicantssOfAJob/:jobID",
    verifyCompanyToken,
    getApplicantssOfAJob
);

// Route to get a list of all applicants with company token verification
router.get("/getAllApplicants", verifyCompanyToken, getAllApplicants);

// Route to change the stage of an applicant with company token verification
router.put("/changeStage/:jobID/:appID", verifyCompanyToken, changeStage);

// Route to delete an application with company token verification
router.delete(
    "/deleteApplication/:jobID/:appID",
    verifyCompanyToken,
    deleteApplication
);

export default router;
