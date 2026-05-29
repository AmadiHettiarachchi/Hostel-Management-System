import bcrypt from "bcryptjs";
import User from "../models/User.js";

import Room from "../models/Room.js";
import Payment from "../models/Payment.js";
import Feedback from "../models/Feedback.js";
import Rating from "../models/Ratings.js";
import CheckRecord from "../models/CheckRecord.js";

export const getStudents = async (req, res) => {
  try {
    const students = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { studentId, currentPassword, newPassword } = req.body;

    if (!studentId || !currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    const user = await User.findById(studentId);

    if (!user) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await Room.updateMany(
      { allocatedStudents: id },
      { $pull: { allocatedStudents: id } }
    );

    const rooms = await Room.find();

    for (const room of rooms) {
      if (room.allocatedStudents.length === 0) {
        room.status = "Available";
      } else if (room.allocatedStudents.length < room.capacity) {
        room.status = "Occupied";
      } else {
        room.status = "Full";
      }

      await room.save();
    }

    await Payment.deleteMany({ studentId: id });
    await Feedback.deleteMany({ studentId: id });
    await Rating.deleteMany({ studentId: id });
    await CheckRecord.deleteMany({ studentId: id });

    await User.findByIdAndDelete(id);

    res.json({
      message: "Student removed and related records updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};