import axios from 'axios';

export const fetchCryptoPrices = async (symbol: string) => {
  const response = await axios.get(`http://localhost:5000/api/prices/recent?symbol=${symbol}`);
  return response.data;
};
