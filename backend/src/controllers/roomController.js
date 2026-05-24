import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { roomNumber, floor, capacity, type, facilities } = req.body;

    const room = await Room.create({
      roomNumber,
      floor,
      capacity,
      type,
      facilities,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};