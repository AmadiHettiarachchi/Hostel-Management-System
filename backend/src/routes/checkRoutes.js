import express from "express";
import {
  createCheckRecord,
  getCheckRecords,
} from "../controllers/checkController.js";

const router = express.Router();

router.post("/", createCheckRecord);
router.get("/", getCheckRecords);

export default router;