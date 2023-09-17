import { User } from "../../models/User.js";

// This function handles the creation of personal information for a user.
export const postData = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phNo,
            address,
            country,
            city,
            zipCode,
            linkednLink,
            twitterLink,
            desiredJob,
            desiredLocation,
            payment,
            minSalary,
        } = req.body;
        const userID = req.user;
        var progress = 0;

        // Check if all required personal information is provided.
        if (
            !firstName ||
            !lastName ||
            !phNo ||
            !address ||
            !country ||
            !city ||
            !zipCode ||
            !linkednLink ||
            !twitterLink ||
            !desiredJob ||
            !desiredLocation ||
            !payment ||
            !minSalary
        ) {
            res.status(400).json({
                error: "Data in the request body is not complete",
            });
            return;
        }

        // Retrieve the user's profile and update it with the provided information.
        const user = await User.findById(userID, {
            password: 0,
            jobs: 0,
            forgetPasswordAuthToken: 0,
        });

        // If the user's first name is not set, increase their profile completion by 20%.
        if (!user.firstName) {
            user.profileCompletion += 20;
            progress = 20;
        }

        // Update user's personal information fields.
        user.firstName = firstName;
        user.lastName = lastName;
        user.phNo = phNo;
        user.address = address;
        user.country = country;
        user.city = city;
        user.zipCode = zipCode;
        user.linkednLink = linkednLink;
        user.twitterLink = twitterLink;
        user.desiredJob = desiredJob;
        user.minSalary = minSalary;
        user.payment = payment;
        user.desiredLocation = desiredLocation;

        // Save the updated user profile.
        user.save();

        return res.status(201).json({
            progress: progress,
            user: user,
            message: "Personal Information Added Successfully",
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(400).json({
            error: "An error occurred while creating Personal Information",
        });
    }
};

// This function retrieves a user's personal information.
export const getData = async (req, res) => {
    try {
        const userID = req.user;

        // Retrieve the user's profile, excluding sensitive information.
        const user = await User.findById(userID, {
            password: 0,
            jobs: 0,
            forgetPasswordAuthToken: 0,
        });

        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            error: "Error while getting Personal Information",
        });
    }
};

// This function handles the addition of skills for a user.
export const postSkills = async (req, res) => {
    try {
        const data = req.body;
        const userID = req.user;

        // Check if skills data is provided.
        if (!data.skills) {
            res.status(400).json({
                error: "Data in the request body is not complete",
            });
            return;
        }

        var progress = 0;
        const user = await User.findById(userID);

        // Check if the user has no skills, and increase their profile completion by 10%.
        if (user.skills.length === 0) {
            user.profileCompletion += 10;
            progress = 10;
        }

        // Add the provided skills to the user's existing skills.
        user.skills = [...data.skills, ...user.skills];
        const skills = await user.save();

        res.status(200).json({
            progress: progress,
            message: "Skills Added Successfully",
        });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            error: "An error occurred while adding Skills",
        });
    }
};

// This function retrieves a user's skills.
export const getSkills = async (req, res) => {
    try {
        const userID = req.user;

        // Retrieve the user's skills.
        const user = await User.findById(userID, "skills");
        res.status(200).json(user);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ error: "Error while getting Skills" });
    }
};
