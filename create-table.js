import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS books;`.then(() => {
//   console.log("Tabela apagada!");
// });

sql`
CREATE TABLE books(
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    year INTEGER
)
`.then(() => {
  console.log("Tabela Criada");
});
