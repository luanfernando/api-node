import "dotenv/config";
import postgres from "postgres";
import mysql from "mysql2/promise";

let sql;

if (process.env.USEMYSQL == true || process.env.USEMYSQL == "true") {
  // Usa conexão com Mysql
  sql = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: Number(process.env.PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
} else if (
  process.env.USEPOSTGRES == "true" ||
  process.env.USEPOSTGRES == true
) {
  // Usa conexão com Postgres
  sql = postgres(process.env.DATABASE_URL, { ssl: "require" });
}

export { sql as sql };
