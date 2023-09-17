import express from "express";

import {
  postData,
  getData,
} from "../../controllers/userProfileControllers/education.js";

const router = express.Router();

router.post("/postData", postData);
router.get("/getData", getData);

export default router;
