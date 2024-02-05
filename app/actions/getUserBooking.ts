import axios from "axios";

//getting all bookings details from db with their user id
const getUserBooking = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/userbooking/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export default getUserBooking;
