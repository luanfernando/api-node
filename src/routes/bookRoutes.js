import BookController from "../controllers/bookController.js";

export async function bookRoutes(fastify, options) {
  // http://localhost:3333/books
  fastify.post("/", (request, reply) => BookController.create(request, reply));

  // http://localhost:3333/books
  fastify.get("/", (request, reply) => BookController.list(request, reply));

  // http://localhost:3333/books/:id
  fastify.put("/:id", (request, reply) =>
    BookController.update(request, reply),
  );

  // http://localhost:3333/books/:id
  fastify.delete("/:id", (request, reply) =>
    BookController.delete(request, reply),
  );
}
