import express from "express";
import { User } from "../models/User.js";
import { Admin } from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

var jwtSecret = process.env.JWToken;

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let data;
  try {
    // See if user exists
    let user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    //Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: "5 days" }, (err, token) => {
      if (err) throw err;
      data = [{ token: token, user: user }];
      res.json(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const UserList = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
export const UpdateAttendance = async (req, res) => {
  const { userId, attendanceId, status } = req.body;

  try {
    const user = await User.findById(userId);
    const attendance = user.attendance.id(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    attendance.status = status;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const deleteAttendace = async (req, res) => {
  const { userId, attendanceId } = req.body;

  try {
    const user = await User.findById(userId);
    const attendanceIndex = user.attendance.findIndex(
      (attendance) => attendance._id == attendanceId
    );
    if (attendanceIndex >= 0) {
      user.attendance.splice(attendanceIndex, 1);
    }

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const UpdateLeave = async (req, res) => {
  const { userId, leaveId, status } = req.body;

  try {
    const user = await User.findById(userId);
    const leaves = user.leaves.id(leaveId);

    if (!leaves) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    leaves.status = status;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const AttendanceReport = async (req, res) => {
  const { startDate, endDate } = req.params;

  try {
    // Find the user by their ID
    const users = await User.find({
      "attendance.date": { $gte: startDate, $lte: endDate },
    });

    // create an object to hold attendance data for each user
    let attendanceData = [{}];
    users.forEach((user) => {
      attendanceData = {
        name: user.name,
        email: user.email,
        attendance: [],
      };
      // filter attendance records within the date range
      const attendance = user.attendance.filter((record) => {
        return record.date >= startDate && record.date <= endDate;
      });

      // add attendance records to the attendanceData object
      attendance.forEach((record) => {
        attendanceData.attendance.push({
          date: record.date,
          status: record.status,
        });
      });
    });

    // return the attendance data as a response
    res.json(attendanceData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const GradeList = async (req, res) => {
  try {
    const gradeThresholds = {
      A: 26,
      B: 20,
      C: 15,
      D: 10,
      F: 0,
    };

    // find all users
    const users = await User.find();

    // update the grade for each user based on attendance
    for (const user of users) {
      const attendanceCount = user.attendance.filter((record) => {
        return record.status === "present";
      }).length;

      // set the user's grade based on the attendance count
      let grade = "F";
      for (const [g, threshold] of Object.entries(gradeThresholds)) {
        if (attendanceCount >= threshold) {
          grade = g;
          break;
        }
      }

      // update the user's grade in the database
      try {
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { grade },
          { new: true }
        );
        console.log(
          `User ${updatedUser.name} upgraded to grade ${updatedUser.grade}`
        );
      } catch (err) {
        console.error(err);
      }
    }

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const CountAttendanceList = async (req, res) => {
  try {
    // find all users
    const users = await User.find();

    // create an object to store the counts for each user
    const counts = [];

    // loop through each user and count their attendance records
    users.forEach((user) => {
      const attendance = user.attendance;
      const leaves = user.leaves;
      const presentCount = attendance.filter(
        (record) => record.status === "present"
      ).length;
      const absentCount = attendance.filter(
        (record) => record.status === "absent"
      ).length;
      const leaveCount = leaves.filter(
        (leave) => leave.status === "approved"
      ).length;
      counts.push({
        name: user.name,
        presentCount: presentCount,
        absentCount: absentCount,
        leaveCount: leaveCount,
      });
    });

    res.json(counts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export default router;
