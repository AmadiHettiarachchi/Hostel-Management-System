import express from "express";
import {
  createPayment,
  getPayments,
  updatePaymentStatus,
} from "../controllers/paymentController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", upload.single("paymentSlip"), createPayment);
router.get("/", getPayments);
router.put("/:id/status", updatePaymentStatus);

export default router;