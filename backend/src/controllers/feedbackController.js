import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      studentEmail,
      type,
      category,
      message,
    } = req.body;

    if (
      !studentId ||
      !studentName ||
      !studentEmail ||
      !type ||
      !category ||
      !message
    ) {
      return res.status(400).json({
        message: "All feedback fields are required",
      });
    }

    const feedback = await Feedback.create({
      studentId,
      studentName,
      studentEmail,
      type,
      category,
      message,
    });

    res.status(201).json({
      message: `${type} submitted successfully`,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  try {
    const { status, response } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status, response },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.json({
      message: "Feedback status updated successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};