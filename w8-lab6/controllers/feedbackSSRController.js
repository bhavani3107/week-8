const Feedback = require("../models/feedbackModel");

// Render Controller: Render index.html with feedbacks using EJS
const renderFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    res.render("index", { feedbacks }); // Render index.ejs with feedbacks data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Feedback by ID
const renderFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.render("notfound");
    }
    res.render("singlefeedback", { feedback }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Feedback:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addfeedback"); // Assuming "addfeedback.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new feedback (used for rendering and API)
const addFeedback = async (req, res) => {
  try {
    const { sender, message, rating  } = req.body;
    // Convert the achieved field to a Boolean
    //const achieved = req.body.achieved === "on";
    const newFeedback = new Feedback({ sender, message, rating  });
    await newFeedback.save();
    // Redirect to the main page after successfully adding the feedback
    console.log("Feedback added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding feedback:", error);
    res.status(500).render("error");
  }
};

// Delete Feedback by ID
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete({ _id: id });
    if (!feedback) {
      return res.status(404).render("notfound");
    }
    console.log("Feedback delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Feedback:", error);
    res.status(500).render("error");
  }
};


// Update Feedback by ID
const renderUpdateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the feedback by id
    const feedback = await Feedback.findById(id);

    if (!feedback) {
      return res.render("notfound");
    }

    // Render the singlefeedback.ejs template with the feedback data
    res.render("updatefeedback", { feedback });

  } catch (error) {
    console.error("Error fetching Feedback:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the feedback
const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    //const achieved = req.body.achieved === "on";
    const { sender, message, rating  } = req.body;
    const updatedFeedbackData = { sender, message, rating  };

    // Update the feedback with the new data
    const updatedFeedback = await Feedback.findOneAndUpdate({ _id: id }, updatedFeedbackData, { new: true });

    if (!updatedFeedback) {
      return res.render("notfound");
    }

    console.log("Feedback updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Feedback:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderFeedbacks,
  renderFeedback,
  addFeedback,
  renderForm,
  deleteFeedback,
  updateFeedback,
  renderUpdateFeedback,
};
