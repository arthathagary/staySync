import axios from "axios";

//getting specific room details from db
const getSpecificRoom = async (getSpecificRoom: string | undefined) => {
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
