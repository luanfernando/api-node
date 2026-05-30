import AuthController from "../controllers/authController.js";

export async function authRoutes(fastify, options) {
  // http://localhost:3333/auth
  fastify.post(
    "/",
    {
      schema: {
        description: "Login do usuário",
        tags: ["Login"],
        body: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },
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
    async (request, reply) => AuthController.auth(request, reply),
  );
}
