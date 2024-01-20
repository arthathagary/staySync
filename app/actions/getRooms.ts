import axios from "axios";

export const getRooms = async () => {
  const response = await axios.get("http://localhost:3000/api/rooms");
  return response.data;
};
