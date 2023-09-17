import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  email: String,
  password: String,
  forgetPasswordAuthToken: String,
  name: String,
  teamSize: String,
  phNo: String,
  website: String,
  country: String,
  city: String,
  address: String,
  about: String,
});

const Company = mongoose.model("Company", companySchema);

export default Company;
