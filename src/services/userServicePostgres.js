import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { sql } from "../../db.js";

export class UserServicePostgres {
  async list(search) {
    let users;
    if (search) {
      users =
        await sql`select * from users where username ilike ${"%" + search + "%"}`;
    } else {
      users = await sql`select 'test' as test,* from users`;
    }
    return users;
  }

  async create(user) {
    const userId = randomUUID();
    const { username, password, status } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`insert into users (id, username, password, status) values (${userId}, ${username}, ${hashedPassword}, ${status})`;
  }

  async update(id, user) {
    const { username, password, status } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`update users set username = ${username}, password = ${hashedPassword}, status = ${status} where id = ${id}`;
  }

  async delete(id) {
    await sql`delete from users where id = ${id}`;
  }
}
