import express from "express";
import {
  createVisitorRequest,
  getVisitors,
  updateVisitorStatus,
  updateVisitorTimes,
} from "../controllers/visitorController.js";

const router = express.Router();

router.post("/", createVisitorRequest);
router.get("/", getVisitors);
router.put("/:id/status", updateVisitorStatus);
router.put("/:id/time", updateVisitorTimes);

export default router;