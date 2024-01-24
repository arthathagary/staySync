import { query } from "@/app/database/db";

export const findUserByEmail = async (email: any) => {
  const user = await query({
    query: "SELECT * FROM users WHERE email = ?",
    values: [email],
  });

  return { email: email, name: user };
};
