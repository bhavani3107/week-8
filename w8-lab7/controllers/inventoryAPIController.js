const Inventory = require("../models/inventoryModel");

// get all Inventorys
const getInventorys = async (req, res) => {
  try {
    const inventorys = await Inventory.find({});
    res.status(200).json(inventorys);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Inventory
const addInventory = async (req, res) => {
  // console.log();
  try {
    const { name, description, quantity, price } = req.body;
    const newInventory = new Inventory({ name, description, quantity, price });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Inventory by ID
const getInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Inventory by ID
const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await Inventory.findByIdAndDelete({ _id: id });
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Inventorys
const deleteAllInventorys = async (req, res) => {
  try {
    const result = await Inventory.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Inventory by ID
const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedInventory = req.body;
    // const inventory = await Inventory.findOneAndUpdate({ _id: id }, updatedInventory);
    const inventory = await Inventory.findOneAndUpdate({ _id: id }, updatedInventory, { new: true });

    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json(inventory);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getInventorys,
  addInventory,
  getInventory,
  deleteInventory,
  deleteAllInventorys,
  updateInventory,
};
