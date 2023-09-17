import express from "express";
import { User } from "../models/User.js";
import { Admin } from "../models/Admin.js";
import fs from "fs";
import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
const router = express.Router();
import dotenv from "dotenv";

// DECLOARING .ENV FILE HERE
dotenv.config("../.env");

// GETTING ENVIRONMENTAL VARIABLES FROM .ENV FILE
var jwtSecret = process.env.JWToken;
const API_KEY = process.env.MAIL_TOKEN;
sgMail.setApiKey(API_KEY);

// REST API FOR REGISTERING USERS FIRST TIME
export const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  let data;

  try {
    // SEE IF USER ALREADY EXISTS
    let user = await User.findOne({ email });

    // RETURN ERROR IF ALREADY EXISTS
    if (user) {
      res.status(200).json({ success: false, msg: "User already exists" });
      return;
    }

    // MAKING NEW USER
    user = new User({
      name,
      email,
      password,
    });

    // ENCRYPT PASSWORD
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt); //convert into hashing algorithm

    // SAVING DATA TO MONGO DB
    await user.save();

    // PAYLOAD FOR JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // CREATING JWT FOR USER GIVING TO THE CLIENT
    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      data = { success: true, token: token, user: user };
      res.json(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// REST API FOR LOGGING IN USER IF EXISTS
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let data;

  try {
    // SEE IF USER EXISTS
    let user = await User.findOne({ email });

    // RETURN ERROR IF USER NOT EXISTS
    if (!user) {
      return res
        .status(200)
        .json({ success: false, msg: "Invalid Credentials" });
    }

    // DECRYPTING PASSWORD AND MATCHING IT
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .json({ success: false, msg: "Invalid Credentials" });
    }

    // PAYLOAD FOR JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    // RETURN JWT TO CLIENT
    jwt.sign(payload, jwtSecret, { expiresIn: "5 days" }, (err, token) => {
      if (err) throw err;
      data = {
        success: true,
        token: token,
        user: user,
        completionStatus: user.profileCompletion,
      };
      res.json(data);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const uploadResume = async (req, res) => {
  try {
    const userID = req.user;
    const resume = req.body.resume;

    const user = await User.findById(userID, "-password");

    user.resume = resume;
    await user.save();

    return res.status(201).json({
      message: "Resume Saved Successfully",
    });
  } catch (err) {
    console.error("Error saving Resume:", err);
    return res.status(400).json({
      error: "An error occurred while Saving Resume",
    });
  }
};

// REST API FOR FOR FORGET PASSWORD
export const ForgetPassword = async (req, res) => {
  const { email } = req.body;

  // CREATING TOKEN TO SEND IN THE EMAIL TO THE USER
  const token = uuidv4();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // SAVING TOKEN TO MONGO DB
    user.forgetPasswordAuthToken = token;
    await user.save();

    // EMAILING THE LINK TO THE USER
    const resetLink = `${process.env.LINK}/setNewPassword/${token}`;
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

    return res.status(200).json({ message: "Email is sended successfully" });
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
    const user = await User.findOne({ forgetPasswordAuthToken: token });

    if (!user) {
      return res.status(404).json({ error: "Invalid or expired token" });
    }

    // COMPARING THE NEW PASSWORD TO THE PREVIOUS PASSWORD
    // const isPreviousPassword = await bcrypt.compare(passwords, user.password);
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

// REST API FOR SENDING EMAIL TO THE ADMIN FOR SUBSCRIPTION
export const SendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    // SENDING EMAIL TO THE ADMIN
    const msg = {
      to: process.env.TO,
      from: process.env.FROM,
      subject: "New User Email",
      html: `
        <p>A new user have sent you there email</p>
        <p>Email: ${email}</p>
      `,
    };
    await sgMail.send(msg);
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false, msg: err.message });
    console.log("err");
  }
};

// REST API FOR APPLYING TO JOBS
export const ApplyJob = async (req, res) => {
  const { userId, fullName, email, jobTitle, phoneNumber, dbFile, Files } =
    req.body;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    // VALIDATING IF USER HAVE ALREADY APPLIED TO THIS JOB
    const hasApplied = user.jobs.some((job) => job.jobTitle === jobTitle);
    if (hasApplied) {
      return res
        .status(200)
        .json({ message: "User already applied for this job." });
    } else {
      // IF NOT APPLIED MAKING OBJECT AND SAVING TO MONGO DB
      user.jobs.push({
        fullName,
        email,
        phoneNumber,
        jobTitle,
        Files: dbFile,
      });
      const userdata = await user.save();

      // CREATING EMAIL CONSIST OF INFO AND RESUME TO SEND TO THE CLIENT
      const message = {
        from: process.env.FROM,
        to: process.env.TO,
        subject: "Soltridge Jobs",
        html: `<div class="container">
            <h1>Email Template</h1>
            <p>Dear ${fullName},</p>
            <p>Thank you for contacting us. Here are the details you provided:</p>
            <table>
              <tr>
              <th>Field</th>
              <th>Detail</th>
              </tr>
              <tr>
                <td>Name</td>
                <td>${fullName}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>${email}</td>
              </tr>
              <tr>
              <td>job Title</td>
              <td>${jobTitle}</td>
            </tr>
              <tr>
                <td>Phone Number</td>
                <td>${phoneNumber}</td>
              </tr>
            </table>
            <p>We will get back to you as soon as possible.</p>
            <p>Best regards,<br>Soltridge</p>
          </div>`,
        attachments: [Files],
      };
      const sendEmail = await sgMail.send(message);

      // IF MAIL IS SENT THEN SUCCESSFULL MESSAGE IS SHOWN
      if (userdata && sendEmail) {
        res.status(200).json({ message: "Applied Successfully" });
      } else {
        res.status(400).json("error occurred somewhere");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export default router;
