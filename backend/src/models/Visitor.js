import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    visitorName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    visitDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Declined"],
      default: "Pending",
    },
    checkInTime: {
      type: String,
      default: "",
    },
    checkOutTime: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);