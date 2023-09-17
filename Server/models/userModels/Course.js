import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseName: String,
  instituteName: String,
  startDate: String,
  endDate: String,
  desrciption: String,
});

const Course = mongoose.model("Courses", courseSchema);

export default Course;
