const express = require("express");
const app = express();
const methodOverride = require('method-override')

const connectDB = require("./config/db");

const blogAPI = require("./controllers/inventoryAPIController");
const blogSSR = require("./controllers/inventorySSRController");

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
// Route to render index.html with inventorys using EJS
app.get("/", blogSSR.renderInventorys);
// Define a route to render the addinventory.ejs view
app.get("/addinventory", blogSSR.renderForm);
// Route to add  inventory using EJ
app.post("/addinventory", blogSSR.addInventory);
// Define a route to render the singleinventory.ejs view
app.get("/single-inventory/:id", blogSSR.renderInventory);
// Define a route to delete singleinventory
app.delete("/single-inventory/:id", blogSSR.deleteInventory);
// Define a route to update single inventory.ejs
app.put("/single-inventory/:id", blogSSR.updateInventory);
// Define inventory to update
app.get("/single-inventory/update/:id", blogSSR.renderUpdateInventory);

// API
// GET all Inventorys
app.get("/api/inventorys", blogAPI.getInventorys);
// POST a new Inventory
app.post("/api/inventorys", blogAPI.addInventory);
// GET a single Inventory
app.get("/api/inventorys/:id", blogAPI.getInventory);
// Update Inventory using PUT
app.put("/api/inventorys/:id", blogAPI.updateInventory);
// DELETE a Inventory
app.delete("/api/inventorys/:id", blogAPI.deleteInventory);
// DELETE all Inventory
app.delete("/api/inventorys", blogAPI.deleteAllInventorys);

const PORT = 8000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
