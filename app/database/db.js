import mysql from "mysql2/promise";

//this function is used to connect db and query the database
export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "staySyncDb",
    user: "root",
    password: "Agary@990414",
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    console.log(error);
    dbconnection.end();
    return { error };
  }
}
