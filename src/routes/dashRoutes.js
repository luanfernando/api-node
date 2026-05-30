import UserController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export async function dashRoutes(fastify, options) {
  // // Isso protege TODAS as rotas deste arquivo de uma vez só:
  //   fastify.addHook('preHandler', authMiddleware);

  // http://localhost:3333/dashboard
  fastify.get(
    "/",
    {
      preHandler: [authMiddleware],
      schema: {
        description: "Dashboard",
        tags: ["Dashboard"],
        // Define que esta rota precisa do token JWT
        security: [
          {
            bearerAuth: [],
          },
        ],
        response: {
          201: {
            type: "object",
            properties: {
              mensagem: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => UserController.list(request, reply),
  );
}
