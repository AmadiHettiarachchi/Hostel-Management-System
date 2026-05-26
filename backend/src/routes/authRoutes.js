import express from "express";
import { registerStudent, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginUser);

export default router;