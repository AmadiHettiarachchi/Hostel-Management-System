import Cleaning from "../models/Cleaning.js";

export const createCleaningSchedule = async (req, res) => {
  try {
    const {
      roomNumber,
      floor,
      cleaningArea,
      assignedDate,
    } = req.body;

    if (
      !roomNumber ||
      !floor ||
      !cleaningArea ||
      !assignedDate
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const cleaning = await Cleaning.create({
      roomNumber,
      floor,
      cleaningArea,
      assignedDate,
    });

    res.status(201).json({
      message: "Cleaning schedule created successfully",
      cleaning,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCleaningSchedules = async (req, res) => {
  try {
    const schedules = await Cleaning.find().sort({ assignedDate: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCleaningStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const schedule = await Cleaning.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!schedule) {
      return res.status(404).json({
        message: "Cleaning schedule not found",
      });
    }

    res.json({
      message: "Cleaning status updated successfully",
      schedule,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCleaningSchedule = async (req, res) => {
  try {
    const schedule = await Cleaning.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({
        message: "Cleaning schedule not found",
      });
    }

    res.json({
      message: "Cleaning schedule deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};