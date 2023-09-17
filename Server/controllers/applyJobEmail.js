import express from "express";
import fs from "fs";
import path from "path";
import sgMail from "@sendgrid/mail";

const API_KEY =
    "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";
sgMail.setApiKey(API_KEY);
const router = express.Router();

// This function handles the sending of an email when a user applies for a job.
export const ApplyJobEmail = async (req, res) => {
    const { fullName, email, phoneNumber, coverLetter, Files } = req.body;

    try {
        // Create an email message with the provided information.
        const message = {
            from: "ahadshams002@gmail.com",
            to: "info@soltridge.com",
            subject: "Soltridge jobs",
            html: ` <div class="container">
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
          <td>phoneNumber</td>
          <td>${phoneNumber}</td>
        </tr>
      
    
        <tr>
          <td>coverLetter</td>
          <td>${coverLetter}</td>
        </tr>
        <tr>
        <td>Files</td>
        <td>${Files}</td>
      </tr>
        <!-- Add more rows for additional form fields -->
      </table>
  
      <p>We will get back to you as soon as possible.</p>
  
      <p>Best regards,<br>
      Soltridge</p>
    </div>`,
        };

        // Send the email using SendGrid.
        const send = await sgMail.send(message);

        // If the email is sent successfully, return a success response.
        if (send) {
            return res.status(200).json({ message: "Email sent successfully" });
        }
    } catch (error) {
        console.error("Error sending email:", error);
        console.log("Error:", error.response.body.errors);
        res.status(500).send("Error sending email");
        return false;
    }
};

export default router;
