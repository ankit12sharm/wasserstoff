// index.js

const express = require("express");
const bodyParser = require("body-parser");
const { connectToDatabase, closeDatabaseConnection } = require("./db");
const Element = require("./models/ElementModel"); // Adjust the path accordingly

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectToDatabase();

// Create
app.post("/api/elements", async (req, res) => {
  try {
    const newElement = new Element(req.body);
    const savedElement = await newElement.save();
    res.json(savedElement);
  } catch (error) {
    console.error("Error creating element:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read all
app.get("/api/elements", async (req, res) => {
  try {
    const elements = await Element.find();
    res.json(elements);
  } catch (error) {
    console.error("Error getting elements:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Read by ID
app.get("/api/elements/:id", async (req, res) => {
  try {
    const element = await Element.findById(req.params.id);
    if (!element) {
      res.status(404).json({ error: "Element not found" });
      return;
    }
    res.json(element);
  } catch (error) {
    console.error("Error getting element by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update
app.put("/api/elements/:id", async (req, res) => {
  try {
    const updatedElement = await Element.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedElement) {
      res.status(404).json({ error: "Element not found" });
      return;
    }
    res.json(updatedElement);
  } catch (error) {
    console.error("Error updating element:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete
app.delete("/api/elements/:id", async (req, res) => {
  try {
    const deletedElement = await Element.findByIdAndDelete(req.params.id);
    if (!deletedElement) {
      res.status(404).json({ error: "Element not found" });
      return;
    }
    res.json({ message: "Element deleted successfully" });
  } catch (error) {
    console.error("Error deleting element:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
