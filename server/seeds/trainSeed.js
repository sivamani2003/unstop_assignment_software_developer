const mongoose = require("mongoose");
const Train = require("../models/trainModel");

// Import and call connectDB function to connect to MongoDB
const connectDB = require("../config/db");
connectDB();

const seedTrains = async () => {
  try {
    // Create 7 coaches for each train, with the given seat structure
    const trains = [
      { trainName: "Express 1", trainNumber: "EXP001" },
      { trainName: "Express 2", trainNumber: "EXP002" },
      // Add more train details here if needed
    ];

    for (let train of trains) {
      let coaches = [];
      for (let coachNumber = 1; coachNumber <= 7; coachNumber++) {
        let seats = [];
        for (let i = 1; i <= 77; i++) {
          seats.push({ seatNumber: i });
        }
        for (let i = 78; i <= 80; i++) {
          seats.push({ seatNumber: i });
        }
        coaches.push({ coachNumber, seats });
      }
      await Train.create({ ...train, coaches });
    }

    console.log("Trains and seats added successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedTrains();
