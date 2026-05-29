import Rating from "../models/Ratings.js";

export const createRating = async (req, res) => {
  try {
    const { studentId, studentName, studentEmail, category, rating } = req.body;

    if (!studentId || !studentName || !studentEmail || !category || !rating) {
      return res.status(400).json({
        message: "All rating fields are required",
      });
    }

    const ratingValue = Number(rating);

    if (ratingValue < 1 || ratingValue > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    const newRating = await Rating.create({
      studentId,
      studentName,
      studentEmail,
      category,
      rating: ratingValue,
    });

    res.status(201).json({
      message: "Rating submitted successfully",
      rating: newRating,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find().sort({ createdAt: -1 });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};