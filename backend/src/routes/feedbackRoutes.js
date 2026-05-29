import express from "express";
import {
  createFeedback,
  getFeedbacks,
  updateFeedbackStatus,
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", createFeedback);
router.get("/", getFeedbacks);
router.put("/:id/status", updateFeedbackStatus);

export default router;