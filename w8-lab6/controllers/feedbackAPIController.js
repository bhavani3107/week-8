const Feedback = require("../models/feedbackModel");

// get all Feedbacks
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Feedback
const addFeedback = async (req, res) => {
  // console.log();
  try {
    const { sender, message, rating } = req.body;
    const newFeedback = new Feedback({ sender, message, rating });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Feedback by ID
const getFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Feedback by ID
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete({ _id: id });
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Feedbacks
const deleteAllFeedbacks = async (req, res) => {
  try {
    const result = await Feedback.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Feedback by ID
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFeedback = req.body;
    // const feedback = await Feedback.findOneAndUpdate({ _id: id }, updatedFeedback);
    const feedback = await Feedback.findOneAndUpdate({ _id: id }, updatedFeedback, { new: true });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getFeedbacks,
  addFeedback,
  getFeedback,
  deleteFeedback,
  deleteAllFeedbacks,
  updateFeedback,
};
