import axios from "axios";

export const getBookingsHistory = async () => {
  const response = await axios.get(`http://localhost:3000/api/bookingshistory`);
  return response.data;
};
