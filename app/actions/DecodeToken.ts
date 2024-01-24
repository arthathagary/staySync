import jwt from "jsonwebtoken";

export const decodeToken = (token: any) => {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    // Handle decoding errors
    console.log(error);
    return null;
  }
};
