const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const blogAPI = require("./controllers/feedbackAPIController");
const blogSSR = require("./controllers/feedbackSSRController");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//https://expressjs.com/en/resources/middleware/method-override.html
app.use(methodOverride('_method'))

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// SSR
// Route to render index.html with feedbacks using EJS
app.get("/", blogSSR.renderFeedbacks);
// Define a route to render the addfeedback.ejs view
app.get("/addfeedback", blogSSR.renderForm);
// Route to add  feedback using EJ
app.post("/addfeedback", blogSSR.addFeedback);
// Define a route to render the singlefeedback.ejs view
app.get("/single-feedback/:id", blogSSR.renderFeedback);
// Define a route to delete singlefeedback
app.delete("/single-feedback/:id", blogSSR.deleteFeedback);
// Define a route to update single feedback.ejs
app.put("/single-feedback/:id", blogSSR.updateFeedback);
// Define feedback to update
app.get("/single-feedback/update/:id", blogSSR.renderUpdateFeedback);

// API
// GET all Feedbacks
app.get("/api/feedbacks", blogAPI.getFeedbacks);
// POST a new Feedback
app.post("/api/feedbacks", blogAPI.addFeedback);
// GET a single Feedback
app.get("/api/feedbacks/:id", blogAPI.getFeedback);
// Update Feedback using PUT
app.put("/api/feedbacks/:id", blogAPI.updateFeedback);
// DELETE a Feedback
app.delete("/api/feedbacks/:id", blogAPI.deleteFeedback);
// DELETE all Feedback
app.delete("/api/feedbacks", blogAPI.deleteAllFeedbacks);

const PORT = 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
