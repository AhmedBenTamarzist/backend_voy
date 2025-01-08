const mongoose = require("mongoose");

const AirportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true }, // IATA code (e.g., "JFK")
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Airport", AirportSchema);
