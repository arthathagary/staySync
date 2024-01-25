import axios from "axios";

const getSpecificRoom = async (getSpecificRoom: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/rooms/${getSpecificRoom}`
    );
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};
export default getSpecificRoom;
