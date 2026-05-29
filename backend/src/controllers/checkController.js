import CheckRecord from "../models/CheckRecord.js";
import User from "../models/User.js";
import sendSMS from "../utils/sendSMS.js";

export const createCheckRecord = async (req, res) => {
  try {
    const { qrData } = req.body;

    if (!qrData) {
      return res.status(400).json({
        message: "QR data is required",
      });
    }

    console.log("QR DATA RECEIVED:", qrData);

    let parsedQR;

    try {
      parsedQR = JSON.parse(qrData);
    } catch (error) {
      return res.status(400).json({
        message: "QR is not valid JSON",
      });
    }

    console.log("PARSED QR:", parsedQR);

    const { studentId, studentName, generatedAt } = parsedQR;

    if (!studentId || !studentName || !generatedAt) {
      return res.status(400).json({
        message: "Invalid QR code data",
      });
    }

    const qrAge = Date.now() - Number(generatedAt);

    if (qrAge > 50000) {
      return res.status(400).json({
        message: "QR code expired. Please scan new QR.",
      });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found in system",
      });
    }

    const lastRecord = await CheckRecord.findOne({ studentId }).sort({
      createdAt: -1,
    });

    const checkType =
      !lastRecord || lastRecord.checkType === "Check Out"
        ? "Check In"
        : "Check Out";

    const currentDate = new Date();
    const hour = currentDate.getHours();

    // Late check-in after 10 PM
    const isLate = checkType === "Check In" && hour >= 22;

    const record = await CheckRecord.create({
      studentId,
      studentName,
      checkType,
      checkTime: currentDate.toLocaleString(),
      isLate,
    });

    if (isLate && student.parentPhone) {
      await sendSMS(
        student.parentPhone,
        `HostelHub Alert: ${studentName} checked in late at ${record.checkTime}.`
      );
    }

    res.status(201).json({
      message: isLate
        ? "Late check-in recorded. Parent SMS alert sent."
        : `${checkType} recorded successfully`,
      record,
    });
  } catch (error) {
    console.log("CHECK RECORD ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCheckRecords = async (req, res) => {
  try {
    const records = await CheckRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};