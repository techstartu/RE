import mongoose from "mongoose";

const publicationSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  publicationTitle: String,
  publishedBy: String,
  publicationURL: String,
  publishedDate: Date,
  researchArea: String,
  members: String,
  description: String,
});

const Publication = mongoose.model("Publications", publicationSchema);

export default Publication;
