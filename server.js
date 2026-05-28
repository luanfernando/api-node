import { fastify } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { bookRoutes } from "./src/routes/bookRoutes.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import { authRoutes } from "./src/routes/authRoutes.js";
import { dashRoutes } from "./src/routes/dashRoutes.js";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import "dotenv/config";

// NOTE: Instancia do fastify
const server = fastify();

// Registre o plugin do JWT antes das rotas
server.register(fastifyJwt, {
  secret: process.env.JWTSECRET,
});

// Registra o Swagger
await server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "API com Fastify",
      description: "Documentação automática com Fastify e Swagger",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3333" }],
  },
});

// Registra o Swagger UI
await server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});

// NOTE: Para cada novo conjunto de rota precisa registrar abaixo
server.register(bookRoutes, { prefix: "/books" });
server.register(userRoutes, { prefix: "/users" });
server.register(authRoutes, { prefix: "/auth" });
server.register(dashRoutes, { prefix: "/dashboard" });

// NOTE: Fica ouvindo a por padrão do servidor ou a 3333
const start = async () => {
  try {
    await server.listen({
      port: process.env.PORT ?? 3333,
    });
    console.log("Servidor online");
  } catch (error) {
    console.log(error);
  }
};

start();
