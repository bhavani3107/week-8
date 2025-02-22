const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const blogAPI = require("./controllers/goalAPIController");
const blogSSR = require("./controllers/goalSSRController");

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

const logger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  // console.log("Hello V2!");
  next();
};

app.use(logger)
// SSR
// Route to render index.html with goals using EJS
app.get("/", blogSSR.renderGoals);
// Define a route to render the addgoal.ejs view
app.get("/addgoal", blogSSR.renderForm);
// Route to add  goal using EJ
app.post("/addgoal", blogSSR.addGoal);
// Define a route to render the singlegoal.ejs view
app.get("/single-goal/:id", blogSSR.renderGoal);

// API
// GET all Goals
app.get("/api/goals", blogAPI.getGoals);
// POST a new Goal
app.post("/api/goals", blogAPI.addGoal);
// GET a single Goal
app.get("/api/goals/:id", blogAPI.getGoal);
// Update Goal using PUT
app.put("/api/goals/:id", blogAPI.updateGoal);
// DELETE a Goal
app.delete("/api/goals/:id", blogAPI.deleteGoal);
// DELETE all Goal
app.delete("/api/goals", blogAPI.deleteAllGoals);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});