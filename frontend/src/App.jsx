// src/App.js
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TrainForm from './components/TrainForm';
import TrainList from './components/TrainList';
import SeatBooking from './components/SeatBooking';
import { getNumberOfTrains } from './api/trainApi';
import './index.css'
const App = () => {
  const [trainCount, setTrainCount] = useState(0);

  useEffect(() => {
    const fetchTrainCount = async () => {
      const { numberOfTrains } = await getNumberOfTrains();
      setTrainCount(numberOfTrains);
    };
    fetchTrainCount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-8">
        <h2 className="text-2xl font-bold mb-4">Total Trains: {trainCount}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TrainForm />
          <SeatBooking />
        </div>
        <TrainList />
      </main>
    </div>
  );
};

export default App;
