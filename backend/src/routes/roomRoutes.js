import express from "express";
import {
  createRoom,
  getRooms,
  getUnallocatedStudents,
  allocateStudentToRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getRooms);
router.post("/", createRoom);

router.get("/unallocated-students", getUnallocatedStudents);
router.post("/allocate", allocateStudentToRoom);

export default router;