import mongoose from "mongoose";

const certificateSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseTitle: String,
  organization: String,
  issueDate: Date,
  expiryDate: Date,
  credentialID: String,
  credentialURL: String,
  desrciption: String,
});

const Certificate = mongoose.model("Certificates", certificateSchema);

export default Certificate;
