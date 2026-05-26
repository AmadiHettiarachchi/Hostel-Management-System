import express from "express";
import {
  createRoom,
  getRooms,
  getUnallocatedStudents,
  allocateStudentToRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getRooms);
router.post("/", createRoom);

router.get("/unallocated-students", getUnallocatedStudents);
router.post("/allocate", allocateStudentToRoom);

router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

export default router;