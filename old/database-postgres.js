import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DataBasePostgres {
  async list(search) {
    let books;
    if (search) {
      books =
        await sql`select * from books where title ilike ${"%" + search + "%"}`;
    } else {
      books = await sql`select 'test' as test,* from books`;
    }
    return books;
  }

  async create(book) {
    const bookId = randomUUID();
    const { title, description, year } = book;

    await sql`insert into books (id, title, description, year) values (${bookId}, ${title}, ${description}, ${year})`;
  }

  async update(id, book) {
    const { title, description, year } = book;

    await sql`update books set title = ${title}, description = ${description}, year = ${year} where id = ${id}`;
  }

  async delete(id) {
    await sql`delete from books where id = ${id}`;
  }
}
