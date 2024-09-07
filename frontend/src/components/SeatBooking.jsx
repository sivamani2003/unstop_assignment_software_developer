import React, { useState } from 'react';
import { bookSeats } from '../api/trainApi';

const SeatBooking = () => {
  const [trainNumber, setTrainNumber] = useState('');
  const [numSeats, setNumSeats] = useState('');
  const [contiguous, setContiguous] = useState(false); // State for contiguous seats option
  const [receipt, setReceipt] = useState(null); // State to handle receipt details
  const [error, setError] = useState(null); // State to handle errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before booking
    try {
      const response = await bookSeats({ trainNumber, numSeats, contiguous }); // Pass contiguous in the request
      
      if (response.bookedSeats) {
        // Set receipt details on successful booking
        setReceipt({
          trainNumber,
          bookedSeats: response.bookedSeats, // Ensure bookedSeats is an array
          trainName: response.trainName, // Assuming the response includes trainName
          message: response.message, // Include message about row splitting options
        });
      } else {
        throw new Error('Failed to book seats');
      }
    } catch (err) {
      setError(err.message); // Set error message if booking fails
      setReceipt(null); // Clear receipt on error
    }
    setTrainNumber('');
    setNumSeats('');
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Book Seats</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Train Number</label>
          <input
            type="text"
            value={trainNumber}
            onChange={(e) => setTrainNumber(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number of Seats</label>
          <input
            type="number"
            value={numSeats}
            onChange={(e) => setNumSeats(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            min="1"
            max="7"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Continuous Seats</label>
          <input
            type="checkbox"
            checked={contiguous}
            onChange={(e) => setContiguous(e.target.checked)}
            className="mt-1"
          />
          <span className="ml-2 text-gray-600">Book seats next to each other</span>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Book Seats
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded text-red-800">
          <h3 className="text-lg font-semibold mb-2">Error</h3>
          <p>{error}</p>
        </div>
      )}

      {receipt && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <h3 className="text-lg font-semibold mb-2">Booking Receipt</h3>
          <p><strong>Train Number:</strong> {receipt.trainNumber}</p>
          <p><strong>Train Name:</strong> {receipt.trainName}</p>
          <p><strong>Booked Seats:</strong></p>
          <ul className="list-disc list-inside">
            {receipt.bookedSeats.map((seat) => (
              <li key={seat._id}>Seat {seat.seatNumber}</li>
            ))}
          </ul>
          {receipt.message && (
            <p className="mt-4 text-yellow-800">{receipt.message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SeatBooking;
