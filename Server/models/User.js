import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the User schema
const userSchema = Schema({
    // Basic user information
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    profileImage: String,

    // Password reset token for email-based password reset
    forgetPasswordAuthToken: String,

    // Jobs applied by the user
    jobs: [
        {
            fullName: String,
            email: String,
            jobTitle: String,
            phoneNumber: String,
            coverLetter: String,
            Files: String, // Assuming this field stores file paths
        },
    ],

    // Contact information
    phNo: String,
    address: String,
    country: String,
    city: String,
    zipCode: Number,

    // Social media links
    linkednLink: String,
    twitterLink: String,

    // Skills of the user, stored as an array of strings
    skills: {
        type: [String],
    },

    // Profile completion percentage (default is 0)
    profileCompletion: {
        type: Number,
        default: 0,
    },

    // Desired job and salary information
    desiredJob: String,
    minSalary: String,
    payment: String,

    // Desired job location
    desiredLocation: String,
});

// Create the User model using the schema
export const User = mongoose.model("User", userSchema);
