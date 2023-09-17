import mongoose from "mongoose";

const contactOptions = ["phone", "email", "both"];

const jobSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
    },
    //Job Basics
    industry: String, //company's industry
    jobTitle: String, //job title
    jobType: String, //job type
    // jobLevel: String,
    location: String,
    jobDescription: String,

    //Tech Details
    jobSchedule: String, //tech details
    openings: Number, //number of people to hire
    jobTimeline: String, //recruitment timeline
    postedOn: {
        type: Number,
        default: Date.now(),
    },

    //Pay & Benefits
    maxSR: Number,
    minSR: Number,
    Benefits: [String], //array of string type benefits

    //Preferences
    email: [String], //daily updates emails
    sendIndividualReminder: Boolean,
    contactMethod: {
        type: String,
        enum: contactOptions,
    },
    askForCV: Boolean,

    //qualifications:
    skills: [
        {
            skill: {
                type: String,
            },
            isMustHave: Boolean,
            isNiceToHave: Boolean,
        },
    ],

    // Experience: String,
    // qualification: String,
    applications: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            appliedDate: {
                type: Date,
                default: Date.now(),
            },
            hiringStage: {
                type: String,
                default: "Pending",
            },
            status: {
                type: String,
                default: "On Going",
            },
            resume: String,
        },
    ],
});

const Job = new mongoose.model("Job", jobSchema);
export default Job;
