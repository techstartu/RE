import Certificate from "../../models/userModels/Certificate.js";
import { User } from "../../models/User.js";

export const postData = async (req, res) => {
  try {
    const data = req.body;
    const userID = req.user; // it is set from middleware
    var progress = 0;
    const checkForProgress = await Certificate.find({ user: userID });
    if (checkForProgress.length === 0) {
      const user = await User.findById(userID);
      user.profileCompletion += 10;
      progress = 10;
      await user.save();
    }

    if (
      !data.courseTitle ||
      !data.organization ||
      !data.issueDate ||
      !data.expiryDate ||
      !data.desrciption
    ) {
      res.status(400).json({ error: "data in body is not complete" });
      return;
    }

    data.user = userID;
    const certificateObj = new Certificate(data);
    const certificate = await certificateObj.save();

    return res.status(201).json({
      progress: progress,
      message: "Certificate Added Successfully",
    });
  } catch (error) {
    console.error("Error creating Certificate:", error);
    return res.status(400).json({
      error: "An error occurred while creating Certificate",
    });
  }
};

export const getData = async (req, res) => {
  try {
    const userID = req.user; // it is set from middleware
    const certificate = await Certificate.find({ user: userID });

    return res.status(201).json({
      certificate,
    });
  } catch (error) {
    console.error("Error creating Certificate:", error);
    return res.status(400).json({
      error: "An error occurred while creating Certificate",
    });
  }
};
