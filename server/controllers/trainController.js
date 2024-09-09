const Train = require("../models/trainModel");

// Add Train
const addTrain = async (req, res) => {
  const { trainName, trainNumber } = req.body;

  if (!trainName || !trainNumber) {
    return res.status(400).json({ message: "Train name and number are required" });
  }

  const newTrain = new Train({
    trainName,
    trainNumber,
    coaches: [], // Coaches will be initialized here with seats
  });

  for (let coachNumber = 1; coachNumber <= 7; coachNumber++) {
    let seats = [];
    for (let i = 1; i <= 77; i++) {
      seats.push({ seatNumber: i, isBooked: false });
    }
    for (let i = 78; i <= 80; i++) {
      seats.push({ seatNumber: i, isBooked: false });
    }
    newTrain.coaches.push({ coachNumber, seats });
  }

  await newTrain.save();
  res.status(201).json(newTrain);
};

// Delete Train
const deleteTrain = async (req, res) => {
  const { trainNumber } = req.params;

  const train = await Train.findOneAndDelete({ trainNumber });

  if (!train) {
    return res.status(404).json({ message: "Train not found" });
  }

  res.json({ message: `Train ${train.trainName} deleted successfully` });
};


// Book Seats
const SEATS_PER_ROW = 7;

const bookSeats = async (req, res) => {
  const { trainNumber, numSeats, contiguous } = req.body;

  // Validate input
  if (numSeats < 1) {
    return res.status(400).json({ message: "You must book at least 1 seat" });
  }

  if (contiguous !== true && contiguous !== false) {
    return res.status(400).json({ message: "Contiguous field must be true or false" });
  }

  const train = await Train.findOne({
    $or: [{ trainNumber: trainNumber }, { trainName: trainNumber }]
  });

  if (!train) {
    return res.status(404).json({ message: "Train not found" });
  }

  let allAvailableSeats = train.coaches.flatMap(coach => 
    coach.seats.filter(seat => !seat.isBooked)
  );

  if (allAvailableSeats.length < numSeats) {
    return res.status(400).json({ message: "Not enough seats available" });
  }

  let bookedSeats = [];

  if (contiguous) {
    // Try to book seats in one row
    for (let coach of train.coaches) {
      for (let i = 0; i < coach.seats.length; i += SEATS_PER_ROW) {
        let rowSeats = coach.seats.slice(i, i + SEATS_PER_ROW);
        let availableInRow = rowSeats.filter(seat => !seat.isBooked);
        
        if (availableInRow.length >= numSeats) {
          bookedSeats = availableInRow.slice(0, numSeats);
          break;
        }
      }
      if (bookedSeats.length > 0) break;
    }
  }
  if (bookedSeats.length === 0) {
    bookedSeats = allAvailableSeats.slice(0, numSeats);
  }

  // Mark seats as booked
  bookedSeats.forEach(seat => {
    seat.isBooked = true;
  });

  await train.save();

  return res.json({
    bookedSeats,
    trainName: train.trainName, 
    message: contiguous && bookedSeats.length < numSeats ? 
      'Seats booked successfully, but not all are contiguous' : 
      'Seats booked successfully'
  });
};
const getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Number of Trains
const getNumberOfTrains = async (req, res) => {
  try {
    const count = await Train.countDocuments();
    res.json({ numberOfTrains: count });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Update Train Name
const updateTrainName = async (req, res) => {
  const { trainNumber } = req.params;
  const { newTrainName } = req.body;

  if (!newTrainName) {
    return res.status(400).json({ message: "New train name is required" });
  }

  const train = await Train.findOne({ trainNumber });

  if (!train) {
    return res.status(404).json({ message: "Train not found" });
  }

  train.trainName = newTrainName;

  await train.save();

  res.json({ message: "Train name updated successfully", train });
};

module.exports = {
  addTrain,
  deleteTrain,
  bookSeats,
  getAllTrains,
  getNumberOfTrains,
  updateTrainName
};
