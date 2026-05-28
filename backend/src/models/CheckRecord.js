import mongoose from "mongoose";

const checkRecordSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    checkType: {
      type: String,
      enum: ["Check In", "Check Out"],
      required: true,
    },
    checkTime: {
      type: String,
      required: true,
    },
    isLate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CheckRecord", checkRecordSchema);