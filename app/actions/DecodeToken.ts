import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  userRole: string;
  email: string;
}

export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded;
  } catch (error) {
    // Handle decoding errors
    console.log(error);
    return null;
  }
};
