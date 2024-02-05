import axios from "axios";

//getting current users details from db with the help of jwt token
export const getCurrentUsers = async ({ token }: { token: string | null }) => {
  const response = await axios.get(`http://localhost:3000/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
