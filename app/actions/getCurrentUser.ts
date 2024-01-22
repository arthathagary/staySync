import axios from "axios";

export const getCurrentUsers = async ({ userId }: { userId: string }) => {
  const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
  return response.data;
};
