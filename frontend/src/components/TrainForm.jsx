import React, { useState } from 'react';
import { addTrain } from '../api/trainApi';

const TrainForm = () => {
  const [trainName, setTrainName] = useState('');
  const [trainNumber, setTrainNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add train and reload the page on success
    const response = await addTrain({ trainName, trainNumber });
    
    if (response && response.success) {
      window.location.reload();  // Reload page if train is successfully added
    } else {
      console.error('Failed to add train:', response);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add a New Train</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Train Name</label>
          <input
            type="text"
            value={trainName}
            onChange={(e) => setTrainName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Train
        </button>
      </form>
    </div>
  );
};

export default TrainForm;
