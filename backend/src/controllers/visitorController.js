import Visitor from "../models/Visitor.js";

export const createVisitorRequest = async (req, res) => {
  try {
    const { visitorName, phone, nic, studentName, visitDate } = req.body;

    if (!visitorName || !phone || !nic || !studentName || !visitDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const visitor = await Visitor.create({
      visitorName,
      phone,
      nic,
      studentName,
      visitDate,
    });

    res.status(201).json({
      message: "Visitor request submitted successfully",
      visitor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVisitorStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!visitor) {
      return res.status(404).json({ message: "Visitor request not found" });
    }

    res.json({
      message: `Visitor request ${status}`,
      visitor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVisitorTimes = async (req, res) => {
  try {
    const { checkInTime, checkOutTime } = req.body;

    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { checkInTime, checkOutTime },
      { new: true }
    );

    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    res.json({
      message: "Visitor time updated successfully",
      visitor,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};