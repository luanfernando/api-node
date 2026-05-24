import { fastify } from "fastify";
import { DataBaseMemory } from "./database-memory.js";
import { DataBasePostgres } from "./database-postgres.js";
import { DataBaseMysql } from "./database-mysql.js";
import "dotenv/config";
// import cors from "cors";

const server = fastify();
let database;
if (process.env.USEMYSQL == "true" || process.env.USEMYSQL == true) {
  database = new DataBaseMysql();
} else if (
  process.env.USEPOSTGRES == "true" ||
  process.env.USEPOSTGRES == true
) {
  database = new DataBasePostgres();
} else {
  database = new DataBaseMemory();
}

// http://localhost:3333/books
server.post("/books", async (request, reply) => {
  const { title, description, year } = request.body;

  await database.create({
    title,
    description,
    year,
  });

  return reply.status(201).send();
});

// http://localhost:3333/books
server.get("/books", async (request) => {
  const search = request.query.search;
  const books = await database.list(search);
  return books;
});

// http://localhost:3333/books/:id
server.put("/books/:id", async (request, reply) => {
  const bookId = request.params.id;
  const { title, description, year } = request.body;
  await database.update(bookId, { title, description, year });

  return reply.status(204).send();
});

// http://localhost:3333/books/:id
server.delete("/books/:id", async (request, reply) => {
  const bookId = request.params.id;
  await database.delete(bookId);
  return reply.status(204).send();
});

server.listen({
  port: process.env.PORT ?? 3333,
});
