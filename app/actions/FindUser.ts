import { query } from "@/app/database/db";

// This is for getting a specific user by its email
const findUserByEmail = async (email: any) => {
  const user = await query({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  });

  return { email: email, user: user };
};

export default findUserByEmail;
