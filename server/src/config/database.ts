import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

const pool: Pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connection succesful");
});

export const databaseQuery = (text: string, params?: string[]) =>
  pool.query(text, params);
