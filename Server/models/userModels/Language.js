import mongoose from "mongoose";

const languageSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  language: String,
  speakingLevel: String,
  listeningLevel: String,
  writingLevel: String,
  readingLevel: String,
});

const Language = mongoose.model("Languages", languageSchema);

export default Language;
