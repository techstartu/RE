import Company from "../models/Company.js";
import mongoose from "mongoose";
import Job from "../models/Job.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";
import { generateCompanyToken } from "../middlewares/middleware.js";

export const registerCompany = async (req, res) => {
    const { email, password } = req.body;
    let data;

    try {
        // SEE IF USER ALREADY EXISTS
        let company = await Company.findOne({ email });

        // RETURN ERROR IF ALREADY EXISTS
        if (company) {
            res.status(200).json({
                success: false,
                msg: "User already exists",
            });
            return;
        }

        // MAKING NEW USER
        company = new Company({
            email,
            password,
        });

        // ENCRYPT PASSWORD
        const salt = await bcrypt.genSalt(10);
        company.password = await bcrypt.hash(password, salt); //convert into hashing algorithm

        // SAVING DATA TO MONGO DB
        await company.save();

        // CREATING JWT FOR USER GIVING TO THE CLIENT
        const token = generateCompanyToken(company._id);
        data = { success: true, token: token, user: company };
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const loginCompany = async (req, res) => {
    const { email, password } = req.body;
    let data;

    try {
        // SEE IF USER EXISTS
        let company = await Company.findOne({ email }, "email password name");

        // RETURN ERROR IF USER NOT EXISTS
        if (!company) {
            return res
                .status(200)
                .json({ success: false, msg: "Invalid Credentials" });
        }

        // DECRYPTING PASSWORD AND MATCHING IT
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res
                .status(200)
                .json({ success: false, msg: "Invalid Credentials" });
        }

        //deleting password before sending to client
        company = company.toObject();
        delete company.password;

        // CREATING JWT FOR USER GIVING TO THE CLIENT
        const token = generateCompanyToken(company._id);
        data = { success: true, token: token, user: company };
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

// REST API FOR FOR FORGET PASSWORD
export const ForgetPassword = async (req, res) => {
    const { email } = req.body;

    // CREATING TOKEN TO SEND IN THE EMAIL TO THE USER
    const token = uuidv4();

    try {
        const user = await Company.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // SAVING TOKEN TO MONGO DB
        user.forgetPasswordAuthToken = token;
        await user.save();

        // EMAILING THE LINK TO THE USER
        const resetLink = `${process.env.LINK}/CsetNewPassword/${token}`;
        const msg = {
            to: email,
            from: process.env.FROM,
            subject: "Reset Your Password",
            html: `
        <p>Click the following link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
        };
        await sgMail.send(msg);

        return res
            .status(200)
            .json({ message: "Email is sended successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// REST API FOR SETTING NEW PASSWORD
export const SetPassword = async (req, res) => {
    const { token, passwords } = req.body;

    try {
        // SEE IF USER EXISTS
        const user = await Company.findOne({ forgetPasswordAuthToken: token });

        if (!user) {
            return res.status(404).json({ error: "Invalid or expired token" });
        }

        // COMPARING THE NEW PASSWORD TO THE PREVIOUS PASSWORD
        // const isPreviousPassword = bcrypt.compare(passwords, user.password);
        // if (isPreviousPassword) {
        //   return res.status(400).json({
        //     error: "New password must be different from the previous password",
        //   });
        // }

        // ENCRYPTING PASSWORD AND SAVING IT TO MONGO DB
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(passwords, salt);
        user.forgetPasswordAuthToken = ""; // Optionally invalidate the token
        await user.save();

        return res
            .status(200)
            .json({ message: "Your password has been updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

export const setProfile = async (req, res) => {
    try {
        const data = req.body;
        const companyID = req.company; // it is set from middleware
        if (
            !data.name ||
            !data.teamSize ||
            !data.phNo ||
            !data.website ||
            !data.country ||
            !data.city ||
            !data.address ||
            !data.about
        ) {
            res.status(400).json({ error: "data in body is not complete" });
            return;
        }

        const company = await Company.findById(companyID);
        company.name = data.name;
        company.teamSize = data.teamSize;
        company.phNo = data.phNo;
        company.website = data.website;
        company.country = data.country;
        company.city = data.city;
        company.address = data.address;
        company.about = data.about;
        await company.save();

        return res.status(201).json({
            message: "Company profile Added Successfully",
        });
    } catch (error) {
        console.error("Error creating Company Profile:", error);
        return res.status(400).json({
            error: "An error occurred while creating Company Profile",
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const companyID = req.company; // it is set from middleware
        const company = await Company.findById(companyID, "-password");

        return res.status(201).json({
            company,
        });
    } catch (error) {
        console.error("Error getting Company Profile:", error);
        return res.status(400).json({
            error: "An error occurred while getting Company Profile",
        });
    }
};

export const getDashboardInfo = async (req, res) => {
    try {
        const companyId = req.company; // Company ID from the middleware
        const companyJobs = await Job.find({ company: companyId });

        let jobPosted = companyJobs.length ? companyJobs.length : 0;
        let applied = 0;
        const jobs = [];

        companyJobs.forEach((job) => {
            applied += job.applications.length; // Sum up applications across all jobs
            job = job.toObject();
            job.applicants = job.applications.length;
            delete job.applications;
            jobs.push(job);
        });

        const jobInfo = {
            jobPosted,
            applied,
            jobs,
        };

        return res.status(200).json(jobInfo);
    } catch (error) {
        console.error("Error fetching dashboard:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getPieInfo = async (req, res) => {
    try {
        const companyId = req.company; // Company ID from the middleware
        const companyJobs = await Job.find({ company: companyId });

        var interviewed = 0;
        var shortlisted = 0;
        var hired = 0;

        companyJobs.forEach((job) => {
            job.applications.forEach((applicant) => {
                if (applicant.hiringStage === "Interviewed") interviewed++;
                if (applicant.hiringStage === "Hired") hired++;
                if (applicant.hiringStage === "Shortlisted") shortlisted++;
            });
        });

        return res.status(200).json({ interviewed, shortlisted, hired });
    } catch (error) {
        console.error("Error fetching Pie Information:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const manageHiringGetJobs = async (req, res) => {
    try {
        const companyId = new mongoose.Types.ObjectId(req.company); // Company ID from the middleware
        const jobs = await Job.aggregate([
            {
                $match: {
                    company: companyId, // Convert company ID to ObjectId
                },
            },
            {
                $project: {
                    _id: 1,
                    jobTitle: 1,
                    applications: { $size: "$applications" },
                },
            },
        ]);

        return res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching dashboard:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
