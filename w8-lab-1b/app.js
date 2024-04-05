const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const blogAPI = require("./controllers/messageAPIController");
const blogSSR = require("./controllers/messageSSRController");

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
// Route to render index.html with messages using EJS
app.get("/", blogSSR.renderMessages);
// Define a route to render the addmessage.ejs view
app.get("/addmessage", blogSSR.renderForm);
// Route to add  message using EJ
app.post("/addmessage", blogSSR.addMessage);
// Define a route to render the singlemessage.ejs view
app.get("/single-message/:id", blogSSR.renderMessage);

// API
// GET all Messages
app.get("/api/messages", blogAPI.getMessages);
// POST a new Message
app.post("/api/messages", blogAPI.addMessage);
// GET a single Message
app.get("/api/messages/:id", blogAPI.getMessage);
// Update Message using PUT
app.put("/api/messages/:id", blogAPI.updateMessage);
// DELETE a Message
app.delete("/api/messages/:id", blogAPI.deleteMessage);
// DELETE all Message
app.delete("/api/messages", blogAPI.deleteAllMessages);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});