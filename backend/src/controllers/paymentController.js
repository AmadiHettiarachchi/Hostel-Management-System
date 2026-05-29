import Payment from "../models/Payment.js";

export const createPayment = async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      studentEmail,
      amount,
      month,
      paymentMethod,
      referenceNumber,
    } = req.body;

    if (
      !studentId ||
      !studentName ||
      !studentEmail ||
      !amount ||
      !month ||
      !paymentMethod ||
      !referenceNumber
    ) {
      return res.status(400).json({
        message: "All payment fields are required",
      });
    }

    const paymentSlip = req.file
      ? `/uploads/payments/${req.file.filename}`
      : "";

    const payment = await Payment.create({
      studentId,
      studentName,
      studentEmail,
      amount: Number(amount),
      month,
      paymentMethod,
      referenceNumber,
      paymentSlip,
    });

    res.status(201).json({
      message: "Payment submitted successfully",
      payment,
    });
  } catch (error) {
    console.log("PAYMENT ERROR:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.json({
      message: `Payment ${status}`,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};