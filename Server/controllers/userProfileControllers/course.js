import Course from "../../models/userModels/Course.js";
import { User } from "../../models/User.js";

export const postData = async (req, res) => {
  try {
    const data = req.body;
    const userID = req.user; // it is set from middleware

    var progress = 0;
    const checkForProgress = await Course.find({ user: userID });
    if (checkForProgress.length === 0) {
      const user = await User.findById(userID);
      user.profileCompletion += 10;
      progress = 10;
      await user.save();
    }

    if (
      !data.courseName ||
      !data.instituteName ||
      !data.startDate ||
      !data.endDate ||
      !data.description
    ) {
      res.status(400).json({ error: "data in body is not complete" });
      return;
    }

    data.user = userID;
    const courseObj = new Course(data);
    const course = await courseObj.save();

    return res.status(201).json({
      progress: progress,
      message: "Course Added Successfully",
    });
  } catch (error) {
    console.error("Error creating Course:", error);
    return res.status(400).json({
      error: "An error occurred while creating Course",
    });
  }
};

export const getData = async (req, res) => {
  try {
    const userID = req.user; // it is set from middleware
    const courses = await Course.find({ user: userID });

    return res.status(201).json({
      courses,
    });
  } catch (error) {
    console.error("Error creating Course:", error);
    return res.status(400).json({
      error: "An error occurred while creating Course",
    });
  }
};
