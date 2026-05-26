import AuthController from "../controllers/authController.js";

export async function authRoutes(fastify, options) {
  // http://localhost:3333/auth
  fastify.post("/", (request, reply) => AuthController.auth(request, reply));
}
