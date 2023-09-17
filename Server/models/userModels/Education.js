import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
  },
  startYear: {
    type: Number,
  },
  endMonth: {
    type: String,
  },
  endYear: {
    type: Number,
  },
  grades: {
    type: String,
  },
  activities_societies: {
    type: String,
  },
});

const Education = mongoose.model("Education", educationSchema);

export default Education;
