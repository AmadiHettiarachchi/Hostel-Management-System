import Room from "../models/Room.js";
import User from "../models/User.js";

export const createRoom = async (req, res) => {
  try {
    const { roomNumber, floor, capacity, type } = req.body;

    if (!roomNumber || !floor || !capacity || !type) {
      return res.status(400).json({
        message: "All room fields are required",
      });
    }

    const roomCapacity = Number(capacity);

    if (roomCapacity < 1 || roomCapacity > 3) {
      return res.status(400).json({
        message: "Room capacity must be between 1 and 3",
      });
    }

    const room = await Room.create({
      roomNumber,
      floor,
      capacity: roomCapacity,
      type,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("allocatedStudents", "fullName email phone nic")
      .sort({ createdAt: -1 });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUnallocatedStudents = async (req, res) => {
  try {
    const rooms = await Room.find().select("allocatedStudents");

    const allocatedIds = rooms.flatMap((room) =>
      room.allocatedStudents.map((id) => id.toString())
    );

    const students = await User.find({
      _id: { $nin: allocatedIds },
    }).select("fullName email phone nic");

    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const allocateStudentToRoom = async (req, res) => {
  try {
    const { roomId, studentId } = req.body;

    if (!roomId || !studentId) {
      return res.status(400).json({
        message: "Room and student are required",
      });
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    if (room.allocatedStudents.length >= room.capacity) {
      return res.status(400).json({
        message: "Room is already full",
      });
    }

    if (room.allocatedStudents.includes(studentId)) {
      return res.status(400).json({
        message: "Student already allocated",
      });
    }

    room.allocatedStudents.push(studentId);

    if (room.allocatedStudents.length >= room.capacity) {
      room.status = "Full";
    } else {
      room.status = "Occupied";
    }

    await room.save();

    const updatedRoom = await Room.findById(roomId).populate(
      "allocatedStudents",
      "fullName email phone nic"
    );

    res.json({
      message: "Student allocated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};