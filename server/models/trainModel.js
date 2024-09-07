const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
  coachNumber: Number,
  seats: [
    {
      seatNumber: Number,
      isBooked: { type: Boolean, default: false },
    },
  ],
});

const trainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  trainNumber: { type: String, required: true, unique: true },
  coaches: [coachSchema], // Each train will have 7 coaches, each with its seat schema
});

module.exports = mongoose.model("Train", trainSchema);
