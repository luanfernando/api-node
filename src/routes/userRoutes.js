import UserController from "../controllers/userController.js";

export async function userRoutes(fastify, options) {
  // http://localhost:3333/users
  fastify.post("/", (request, reply) => UserController.create(request, reply));

  // http://localhost:3333/users
  fastify.get("/", (request, reply) => UserController.list(request, reply));

  // http://localhost:3333/users/:id
  fastify.put("/:id", (request, reply) =>
    UserController.update(request, reply),
  );

  // http://localhost:3333/users/:id
  fastify.delete("/:id", (request, reply) =>
    UserController.delete(request, reply),
  );
}
