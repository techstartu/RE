import Language from "../../models/userModels/Language.js";
import { User } from "../../models/User.js";

// This function handles the creation of language skills data for a user.
export const postData = async (req, res) => {
    try {
        const data = req.body;
        const userID = req.user; // User ID is obtained from middleware.
        var progress = 0;

        // Check if there are existing language skills for the user.
        const checkForProgress = await Language.find({ user: userID });

        // If no language skills exist, increase the user's profile completion by 10%.
        if (checkForProgress.length === 0) {
            const user = await User.findById(userID);
            user.profileCompletion += 10;
            progress = 10;
            await user.save();
        }

        // Check if all required language skill data is provided.
        if (
            !data.language ||
            !data.speakingLevel ||
            !data.listeningLevel ||
            !data.writingLevel ||
            !data.readingLevel
        ) {
            res.status(400).json({
                error: "Data in the request body is not complete",
            });
            return;
        }

        // Add the user ID to the language skill data and save it.
        data.user = userID;
        const languageObj = new Language(data);
        const language = await languageObj.save();

        return res.status(201).json({
            progress: progress,
            message: "Language Added Successfully",
        });
    } catch (error) {
        console.error("Error creating Language:", error);
        return res.status(400).json({
            error: "An error occurred while creating Language",
        });
    }
};

// This function retrieves a user's language skills data.
export const getData = async (req, res) => {
    try {
        const userID = req.user; // User ID is obtained from middleware.

        // Retrieve the user's language skills.
        const languages = await Language.find({ user: userID });

        return res.status(201).json({
            languages,
        });
    } catch (error) {
        console.error("Error getting Languages:", error);
        return res.status(400).json({
            error: "An error occurred while getting Languages",
        });
    }
};
