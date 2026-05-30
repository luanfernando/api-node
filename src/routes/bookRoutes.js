import { type } from "node:os";
import BookController from "../controllers/bookController.js";

export async function bookRoutes(fastify, options) {
  // http://localhost:3333/books
  fastify.post(
    "/",
    {
      schema: {
        description: "Cria um novo livro",
        tags: ["Livros"],
        body: {
          type: "object",
          required: ["title", "description", "year"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            year: { type: "integer" },
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
    (request, reply) => BookController.create(request, reply),
  );

  // http://localhost:3333/books
  fastify.get(
    "/",
    {
      schema: {
        description: "Lista todos os livros.",
        tags: ["Livros"],
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
    async (request, reply) => BookController.list(request, reply),
  );

  // http://localhost:3333/books/:id
  fastify.put(
    "/:id",
    {
      schema: {
        description: "Atualiza os dados de um livro existente",
        tags: ["Livros"],

        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              description: "ID único do usuário geralmente um UUID)",
            },
          },
        },

        body: {
          type: "object",
          required: ["title", "description", "year"],
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            year: { type: "integer" },
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
    async (request, reply) => BookController.update(request, reply),
  );

  // http://localhost:3333/books/:id
  fastify.delete(
    "/:id",
    {
      schema: {
        description: "Deleta um livro existente",
        tags: ["Livros"],

        params: {
          type: "object",
          required: ["id"],
          properties: {
            id: {
              type: "string",
              description: "ID único do livro (geralmente um UUID)",
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
    async (request, reply) => BookController.delete(request, reply),
  );
}
