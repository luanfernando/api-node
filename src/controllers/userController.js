import { UserServiceMysql } from "../services/userServiceMysql.js";
import { UserServicePostgres } from "../services/userServicePostgres.js";
import { UserServiceMemory } from "../services/userServiceMemory.js";
import "dotenv/config";

class UserController {
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

  async list(request, reply) {
    const search = request.query.search;
    const Users = await this.#service.list(search);
    return Users;
  }

  async create(request, reply) {
    const { username, password, status } = request.body;

    await this.#service.create({
      username,
      password,
      status,
    });

    return reply.status(201).send();
  }

  async update(request, reply) {
    const userId = request.params.id;
    const { username, password, status } = request.body;
    await this.#service.update(userId, { username, password, status });

    return reply.status(204).send();
  }

  async delete(request, reply) {
    const userId = request.params.id;
    await this.#service.delete(userId);
    return reply.status(204).send();
  }
}

export default new UserController();
