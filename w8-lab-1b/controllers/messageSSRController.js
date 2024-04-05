const Message = require("../models/messageModel");

// Render Controller: Render index.html with messages using EJS
const renderMessages = async (req, res) => {
  try {
    const messages = await Message.find({});
    res.render("index", { messages }); // Render index.ejs with messages data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};
 
// Get Message by ID
const renderMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    if (!message) {
      return res.render("notfound");
    }
    res.render("singlemessage", { message }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Message:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addmessage"); // Assuming "addmessage.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new message (used for rendering and API)
const addMessage = async (req, res) => {
  try {
    const { sender, recipient, content } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newMessage = new Message({ sender, recipient, content });
    await newMessage.save();
    // Redirect to the main page after successfully adding the message
    console.log("Message added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).render("error");
  }
};


module.exports = {
  renderMessages,
  renderMessage,
  addMessage,
  renderForm,
};