import { UserServiceMysql } from "../services/userServiceMysql.js";
import { UserServicePostgres } from "../services/userServicePostgres.js";
import { UserServiceMemory } from "../services/userServiceMemory.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import "dotenv/config";

class AuthController {
  // NOTE: Cria a conexão com a base de dados (mysql , postgres ou memory)
  #service;
  // NOTE: Dentro do construtor verifica e estabelece um conexão
  constructor() {
    if (process.env.USEMYSQL == "true" || process.env.USEMYSQL == true) {
      this.#service = new UserServiceMysql();
    } else if (
      process.env.USEPOSTGRES == "true" ||
      process.env.USEPOSTGRES == true
    ) {
      this.#service = new UserServicePostgres();
    } else {
      this.#service = new UserServiceMemory();
    }
  }

  async auth(request, reply) {
    const { username, password } = request.body;
    const Users = await this.#service.list(username);

    if (!Users) {
      return reply.status(401).send({ message: "Credenciais invalidas." });
    }

    const isCorrectPassword = await bcrypt.compare(password, Users[0].password);

    if (!isCorrectPassword) {
      return reply.status(401).send({ message: "Credenciais invalidas." });
    }

    // Gerar o token JWT
    const token = jwt.sign(
      {
        id: Users[0].id,
        username: Users[0].username,
        status: Users[0].status,
      },
      process.env.JWTSECRET,
      {
        expiresIn: "1h",
      },
    );

    return { token };
  }
}

export default new AuthController();
