// src/components/TrainList.js
import React, { useEffect, useState } from 'react';
import { getAllTrains, deleteTrain } from '../api/trainApi';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      const data = await getAllTrains();
      setTrains(data);
    };
    fetchTrains();
    
  }, []);

  const handleDelete = async (trainNumber) => {
    await deleteTrain(trainNumber);
    setTrains(trains.filter(train => train.trainNumber !== trainNumber));
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">All Trains</h2>
      {trains.length === 0 ? (
        <p>No trains available.</p>
      ) : (
        <ul>
          {trains.map((train) => (
            <li key={train.trainNumber} className="mb-4 p-4 border border-gray-300 rounded">
              <h3 className="text-lg font-semibold">{train.trainName}</h3>
              <p>Train Number: {train.trainNumber}</p>
              <button
                onClick={() => handleDelete(train.trainNumber)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
              >
                Delete Train
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainList;
