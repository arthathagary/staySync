import axios from "axios";

interface IParams {
  bookingsId?: string;
}
const getBookingsById = async (params: IParams) => {
  try {
    const { bookingsId } = params;
    const response = await axios.get(
      `http://localhost:3000/api/bookings/${bookingsId}`
    );
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};
export default getBookingsById;
