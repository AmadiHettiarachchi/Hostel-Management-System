import express from "express";
import {
  createRoom,
  getRooms,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getRooms);

router.post("/", createRoom);

export default router;