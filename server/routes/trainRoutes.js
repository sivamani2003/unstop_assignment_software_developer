const express = require("express");
const { addTrain, deleteTrain, bookSeats, getAllTrains, getNumberOfTrains,updateTrainName } = require("../controllers/trainController");
const router = express.Router();

router.post("/add", addTrain); // Add train
router.delete("/delete/:trainNumber", deleteTrain); // Delete train by trainNumber
router.post("/book", bookSeats); // Book seats
router.get("/", getAllTrains); // Get all trains
router.get("/count", getNumberOfTrains); // Get number of trains
router.put('/:trainNumber',updateTrainName);
module.exports = router;
