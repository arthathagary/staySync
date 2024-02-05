import axios from "axios";

//getting all bookings details from db
export const getBookings = async () => {
  const response = await axios.get("http://localhost:3000/api/bookings");
  return response.data;
};
