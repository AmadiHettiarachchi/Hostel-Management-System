import mongoose from "mongoose";

const cleaningSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
    },
    floor: {
      type: String,
      required: true,
    },
    cleaningArea: {
      type: String,
      required: true,
    },
    assignedDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cleaning", cleaningSchema);