import UserController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export async function dashRoutes(fastify, options) {
  // // Isso protege TODAS as rotas deste arquivo de uma vez só:
  //   fastify.addHook('preHandler', authMiddleware);

  // http://localhost:3333/dashboard
  fastify.get("/", { preHandler: [authMiddleware] }, (request, reply) =>
    UserController.list(request, reply),
  );
}
