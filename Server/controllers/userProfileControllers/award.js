import { User } from "../../models/User.js";
import Award from "../../models/userModels/Award.js";

export const postData = async (req, res) => {
    try {
        const data = req.body;
        const userID = req.user; // it is set from middleware
        var progress = 0;
        const checkForProgress = await Award.find({ user: userID });
        if (checkForProgress.length === 0) {
            const user = await User.findById(userID);
            user.profileCompletion += 10;
            progress = 10;
            await user.save();
        }

        if (
            !data.awardTitle ||
            !data.institute ||
            !data.issueDate ||
            !data.awardImage ||
            !data.desrciption
        ) {
            res.status(400).json({ error: "data in body is not complete" });
            return;
        }

        data.user = userID;
        const awardObj = new Award(data);
        const award = await awardObj.save();

        return res.status(201).json({
            progress: progress,
            message: "Award Added Successfully",
        });
    } catch (error) {
        console.error("Error creating Award:", error);
        return res.status(400).json({
            error: "An error occurred while creating Award",
        });
    }
};

export const getData = async (req, res) => {
    try {
        const userID = req.user; // it is set from middleware
        const awards = await Award.find({ user: userID });

        return res.status(201).json({
            awards,
        });
    } catch (error) {
        console.error("Error creating Award:", error);
        return res.status(400).json({
            error: "An error occurred while creating Award",
        });
    }
};
