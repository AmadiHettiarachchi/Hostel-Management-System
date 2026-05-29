import express from "express";
import { getStudents, changePassword } from "../controllers/userController.js";

const router = express.Router();

router.get("/students", getStudents);
router.put("/change-password", changePassword);

export default router;