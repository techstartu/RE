import mongoose from "mongoose";

const awardSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  awardTitle: String,
  institute: String,
  issueDate: Date,
  awardImage: String,
  desrciption: String,
});

const Award = mongoose.model("Awards", awardSchema);

export default Award;
