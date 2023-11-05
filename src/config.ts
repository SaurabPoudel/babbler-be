require("dotenv").config();

export const port = process.env.PORT || 3000;
export const dbPort = parseInt(process.env.DB_PORT) || 5432;
export const dbUser = process.env.DB_USER || "postgres";
export const dbPassword = process.env.DB_PASSWORD || "postgres";
export const database = process.env.DB;
