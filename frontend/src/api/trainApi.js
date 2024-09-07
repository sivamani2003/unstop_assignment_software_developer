const API_URL = 'https://unstop-assignment-software-developer.onrender.com/api/trains'; // Adjust this URL as needed

export const addTrain = async (train) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(train),
    });
    return response.json();
    
  } catch (error) {
    console.error('Error adding train:', error);
  }
};

export const deleteTrain = async (trainNumber) => {
  try {
    const response = await fetch(`${API_URL}/delete/${trainNumber}`, {
      method: 'DELETE',
    });
    return response.json();
  } catch (error) {
    console.error('Error deleting train:', error);
  }
};

export const bookSeats = async ({ trainNumber, numSeats,contiguous }) => {
  try {
    const response = await fetch(`${API_URL}/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trainNumber, numSeats,contiguous }),
    });
    return response.json();
  } catch (error) {
    console.error('Error booking seats:', error);
  }
};

export const getAllTrains = async () => {
  try {
    const response = await fetch(API_URL);
    return response.json();
  } catch (error) {
    console.error('Error fetching trains:', error);
  }
};

export const getNumberOfTrains = async () => {
  try {
    const response = await fetch(`${API_URL}/count`);
    return response.json();
  } catch (error) {
    console.error('Error fetching number of trains:', error);
  }
};
