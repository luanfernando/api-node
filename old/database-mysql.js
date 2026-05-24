import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DataBaseMysql {
  async list(search) {
    let books;

    try {
      if (search) {
        [books] = await sql.query(`select * from books where title like ?`, [
          `%${search}%`,
        ]);
      } else {
        [books] = await sql.query(`select 'test' as test,* from books`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      //   await sql.end();
    }
    return books;
  }

  async create(book) {
    const bookId = randomUUID();
    const { title, description, year } = book;

    try {
      await sql.query(
        `insert into books (id, title, description, year) values (?, ?, ?, ?)`,
        [bookId, title, description, year],
      );
    } catch (err) {
      console.log(err);
    } finally {
      //   await sql.end();
    }
  }

  async update(id, book) {
    const { title, description, year } = book;

    try {
      await sql.query(
        `update books set title = ?, description = ?, year = ? where id = ?`,
        [title, description, year, id],
      );
    } catch (err) {
      console.log(err);
    } finally {
      //   await sql.end();
    }
  }

  async delete(id) {
    try {
      await sql.query(`delete from books where id = ?`, [id]);
    } catch (err) {
      console.log(err);
    } finally {
      //   await sql.end(); - // Dentro de Express ou Fastify
      // - nunca devemos fechar a conexão usando .end(), por padrão a própria lib faz o gerenciamento de conexões automaticamente
    }
  }
}
