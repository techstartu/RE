import express from "express";

import {
  getData,
  postData,
  postSkills,
  getSkills,
} from "../../controllers/userProfileControllers/personalInfo.js";

const router = express.Router();

router.post("/postData", postData);
router.get("/getData", getData);
router.post("/postSkills", postSkills);
router.get("/getSkills", getSkills);

export default router;
