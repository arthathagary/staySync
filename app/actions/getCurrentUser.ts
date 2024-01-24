import axios from "axios";

export const getCurrentUsers = async ({ token }: { token: string }) => {
  console.log("token", token);
  const response = await axios.get(`http://localhost:3000/api/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
