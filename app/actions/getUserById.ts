import axios from "axios";

//getting user details from db with the help of userId
const getUserById = async (userId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/users/${userId}`
    );
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};
export default getUserById;
