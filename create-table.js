import { sql } from "./db.js";

const querySchema = `
  CREATE TABLE IF NOT EXISTS books (
    id VARCHAR(255) PRIMARY KEY,
    title TEXT,
    description TEXT,
    year INTEGER
  )

  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(255) PRIMARY KEY,
    username TEXT,
    password TEXT,
    status INTEGER
  )
`;

// Verifica se a conexão atual é o Pool do MySQL (que usa a função 'execute' ou 'query')
if (typeof sql.execute === "function") {
  sql
    .query(querySchema)
    .then(() => console.log("Tabela Criada no MySQL!"))
    .catch((err) => console.error("Erro no MySQL:", err));
} else {
  sql`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      year INTEGER
    )

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT,
      password TEXT,
      status INTEGER
    )
  `
    .then(() => console.log("Tabela Criada no Postgres!"))
    .catch((err) => console.error("Erro no Postgres:", err));
}
