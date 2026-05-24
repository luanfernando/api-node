import { BookServiceMysql } from "../services/bookServiceMysql.js";
import { BookServicePostgres } from "../services/bookServicePostgres.js";
import { BookServiceMemory } from "../services/bookServiceMemory.js";
import "dotenv/config";

class BookController {
  // NOTE: Cria a conexão com a base de dados (mysql , postgres ou memory)
  #database;
  // NOTE: Dentro do construtor verifica e estabelece um conexão
  constructor() {
    if (process.env.USEMYSQL == "true" || process.env.USEMYSQL == true) {
      this.#database = new BookServiceMysql();
    } else if (
      process.env.USEPOSTGRES == "true" ||
      process.env.USEPOSTGRES == true
    ) {
      this.#database = new BookServicePostgres();
    } else {
      this.#database = new BookServiceMemory();
    }
  }

  async list(request, reply) {
    const search = request.query.search;
    const books = await this.#database.list(search);
    return books;
  }

  async create(request, reply) {
    const { title, description, year } = request.body;

    await this.#database.create({
      title,
      description,
      year,
    });

    return reply.status(201).send();
  }

  async update(request, reply) {
    const bookId = request.params.id;
    const { title, description, year } = request.body;
    await this.#database.update(bookId, { title, description, year });

    return reply.status(204).send();
  }

  async delete(request, reply) {
    const bookId = request.params.id;
    await this.#database.delete(bookId);
    return reply.status(204).send();
  }
}

// NOTE: Exporta uma instancia da classe
export default new BookController();
