import express from "express";
import {
    loginUser,
    UserList,
    UpdateAttendance,
    UpdateLeave,
    AttendanceReport,
    GradeList,
    CountAttendanceList,
    deleteAttendace,
} from "../controllers/Admin.js";

// Create an Express router
const router = express.Router();

// Define routes for administrative actions

// Route to allow an admin user to log in
router.post("/login", loginUser);

// Route to get a list of users
router.get("/userList", UserList);

// Route to update attendance records
router.patch("/updateAttendance", UpdateAttendance);

// Route to delete an attendance record
router.patch("/deleteAttendace", deleteAttendace);

// Route to update leave records
router.patch("/updateLeave", UpdateLeave);

// Route to generate an attendance report based on start and end dates
router.get("/attendanceReport/:startDate/:endDate", AttendanceReport);

// Route to get a list of grades
router.get("/gradeList", GradeList);

// Route to get a count of attendance records
router.get("/countAttendance", CountAttendanceList);

export default router;
