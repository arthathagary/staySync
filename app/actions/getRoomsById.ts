import axios from "axios";

interface IParams {
  roomsId?: string;
}
const getRooms = async (params: IParams) => {
  try {
    const { roomsId } = params;
    console.log(roomsId);
    const response = await axios.get(
      `http://localhost:3000/api/rooms/${roomsId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export default getRooms;
