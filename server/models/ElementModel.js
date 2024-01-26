// Assuming you have mongoose installed: npm install mongoose

const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Element schema
const elementSchema = new Schema({
  type: { type: String, required: true },
  grid: {
    w: { type: Number, required: true },
    h: { type: Number, required: true },
  },
  properties: { text: { type: String, required: true } },
});

// Create a model from the schema
const Element = mongoose.model("Element", elementSchema);

module.exports = Element;
