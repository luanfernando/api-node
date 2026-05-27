import { fastify } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { bookRoutes } from "./src/routes/bookRoutes.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import { authRoutes } from "./src/routes/authRoutes.js";
import { dashRoutes } from "./src/routes/dashRoutes.js";

import "dotenv/config";

// NOTE: Instancia do fastify
const server = fastify();

// Registre o plugin do JWT antes das rotas
server.register(fastifyJwt, {
  secret: process.env.JWTSECRET,
});

// NOTE: Para cada novo conjunto de rota precisa registrar abaixo
server.register(bookRoutes, { prefix: "/books" });
server.register(userRoutes, { prefix: "/users" });
server.register(authRoutes, { prefix: "/auth" });
server.register(dashRoutes, { prefix: "/dashboard" });

// NOTE: Fica ouvindo a por padrão do servidor ou a 3333
try {
  server.listen({
    port: process.env.PORT ?? 3333,
  });
} catch (error) {
  console.log(error);
}
