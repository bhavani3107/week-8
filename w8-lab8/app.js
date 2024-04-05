const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const blogAPI = require("./controllers/contactAPIController");
const blogSSR = require("./controllers/contactSSRController");

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
// Route to render index.html with contacts using EJS
app.get("/", blogSSR.renderContacts);
// Define a route to render the addcontact.ejs view
app.get("/addcontact", blogSSR.renderForm);
// Route to add  contact using EJ
app.post("/addcontact", blogSSR.addContact);
// Define a route to render the singlecontact.ejs view
app.get("/single-contact/:id", blogSSR.renderContact);
// Define a route to delete singlecontact
app.delete("/single-contact/:id", blogSSR.deleteContact);
// Define a route to update single contact.ejs
app.put("/single-contact/:id", blogSSR.updateContact);
// Define contact to update
app.get("/single-contact/update/:id", blogSSR.renderUpdateContact);

// API
// GET all Contacts
app.get("/api/contacts", blogAPI.getContacts);
// POST a new Contact
app.post("/api/contacts", blogAPI.addContact);
// GET a single Contact
app.get("/api/contacts/:id", blogAPI.getContact);
// Update Contact using PUT
app.put("/api/contacts/:id", blogAPI.updateContact);
// DELETE a Contact
app.delete("/api/contacts/:id", blogAPI.deleteContact);
// DELETE all Contact
app.delete("/api/contacts", blogAPI.deleteAllContacts);

const PORT = 9000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});