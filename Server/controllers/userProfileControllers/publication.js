import { User } from "../../models/User.js";
import Publication from "../../models/userModels/Publications.js";

// This function handles the creation of a new publication entry for a user.
export const postData = async (req, res) => {
    try {
        const data = req.body;
        const userID = req.user; // User ID is set from middleware
        var progress = 0;

        // Check if the user has any previous publications.
        const checkForProgress = await Publication.find({ user: userID });

        // If the user has no publications, increase their profile completion by 10%.
        if (checkForProgress.length === 0) {
            const user = await User.findById(userID);
            user.profileCompletion += 10;
            progress = 10;
            await user.save();
        }

        // Check if all required publication data is provided.
        if (
            !data.publicationTitle ||
            !data.publishedBy ||
            !data.publicationURL ||
            !data.publishedDate ||
            !data.description
        ) {
            res.status(400).json({
                error: "Data in the request body is not complete",
            });
            return;
        }

        // Set the user ID for the publication data and save it to the database.
        data.user = userID;
        const publicationObj = new Publication(data);
        const publication = await publicationObj.save();

        return res.status(201).json({
            progress: progress,
            message: "Publication Added Successfully",
        });
    } catch (error) {
        console.error("Error creating Publication:", error);
        return res.status(400).json({
            error: "An error occurred while creating Publication",
        });
    }
};

// This function retrieves all publications for a user.
export const getData = async (req, res) => {
    try {
        const userID = req.user; // User ID is set from middleware
        const publications = await Publication.find({ user: userID });

        return res.status(201).json({
            publications,
        });
    } catch (error) {
        console.error("Error getting Publication:", error);
        return res.status(400).json({
            error: "An error occurred while getting Publications",
        });
    }
};
