import express from "express";
import {
  createCleaningSchedule,
  getCleaningSchedules,
  updateCleaningStatus,
  deleteCleaningSchedule,
} from "../controllers/cleaningController.js";

const router = express.Router();

router.post("/", createCleaningSchedule);
router.get("/", getCleaningSchedules);
router.put("/:id/status", updateCleaningStatus);
router.delete("/:id", deleteCleaningSchedule);

export default router;