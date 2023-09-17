import JobExperience from "../../models/userModels/JobExperience.js";
import { User } from "../../models/User.js";

export const postData = async (req, res) => {
    try {
        const data = req.body;
        const userID = req.user; // it is set from middleware
        var progress = 0;
        const checkForProgress = await JobExperience.find({ user: userID });
        if (checkForProgress.length === 0) {
            const user = await User.findById(userID);
            user.profileCompletion += 10;
            progress = 10;
            await user.save();
        }
        console.log(data);
        if (
            !data.jobTitle ||
            !data.employmentType ||
            !data.industry ||
            !data.startDate ||
            !data.company ||
            !data.companyWebsite ||
            !data.country ||
            !data.state ||
            !data.city ||
            !data.description
        ) {
            res.status(400).json({ error: "data in body is not complete" });
            return;
        }

        data.user = userID;
        const jobExperience = new JobExperience(data);
        const job = await jobExperience.save();

        return res.status(201).json({
            progress: progress,
            message: "Job Experience Added Successfully",
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(400).json({
            error: "An error occurred while creating Job Experience",
        });
    }
};

export const getData = async (req, res) => {
    console.log("get data called");
    try {
        const userID = req.user; // it is set from middleware
        const jobExperience = await JobExperience.find({ user: userID });

        return res.status(201).json({
            jobs: jobExperience,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(400).json({
            error: "An error occurred while creating Job Experience",
        });
    }
};
