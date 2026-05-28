import UserController from "../controllers/userController.js";

export async function userRoutes(fastify, options) {
  // http://localhost:3333/users
  fastify.post(
    "/",
    {
      schema: {
        description: "Cria um novo usuário",
        tags: ["Usuários"],
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
    async (request, reply) => UserController.create(request, reply),
  );

  // http://localhost:3333/users
  fastify.get(
    "/",
    {
      schema: {
        description: "Listagem de todos os usuários",
        tags: ["Usuários"],
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

  // http://localhost:3333/users/:id
  fastify.put(
    "/:id",
    {
      schema: {
        description: "Atualiza os dados de um usuário existente",
        tags: ["Usuários"],

        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              description: "ID único do usuário (geralmente um UUID ou número)",
            },
          },
        },

        body: {
          type: "object",
          required: ["username"],
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
        },

        response: {
          200: {
            type: "object",
            properties: {
              mensagem: { type: "string" },
            },
          },
          404: {
            type: "object",
            properties: {
              erro: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => UserController.update(request, reply),
  );

  // http://localhost:3333/users/:id
  fastify.delete(
    "/:id",
    {
      schema: {
        description: "Deleta um usuário existente",
        tags: ["Usuários"],

        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              description: "ID único do usuário (geralmente um UUID ou número)",
            },
          },
        },

        response: {
          200: {
            type: "object",
            properties: {
              mensagem: { type: "string" },
            },
          },
          404: {
            type: "object",
            properties: {
              erro: { type: "string" },
            },
          },
        },
      },
    },
    async (request, reply) => UserController.delete(request, reply),
  );
}
