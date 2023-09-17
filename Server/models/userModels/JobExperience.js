import mongoose from "mongoose";

const jobExperienceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  currentlyWorking: {
    type: Boolean,
    required: true,
  },
  endDate: {
    type: String,
    default: "none",
  },
  company: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const JobExperience = mongoose.model("JobExperience", jobExperienceSchema);

export default JobExperience;
