import express from "express";
import {
  getStudents,
  changePassword,
  deleteStudent,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/students", getStudents);
router.put("/change-password", changePassword);
router.delete("/students/:id", deleteStudent);

export default router;