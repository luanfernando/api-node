import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { sql } from "../../db.js";

export class UserServiceMysql {
  async list(search) {
    let users;

    try {
      if (search) {
        [users] = await sql.query(`select * from users where username like ?`, [
          `%${search}%`,
        ]);
      } else {
        [users] = await sql.query(`select * from users`, []);
      }
    } catch (err) {
      console.log(err);
    } finally {
      //   await sql.end();
    }
    return users;
  }

  async create(user) {
    const userId = randomUUID();
    const { username, password, status } = user;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await sql.query(
        `insert into users (id, username, password, status) values (?, ?, ?, ?)`,
        [userId, username, hashedPassword, status],
      );
    } catch (err) {
      console.log(err);
    } finally {
      //   await sql.end();
    }
  }

  async update(id, user) {
    const { username, password, status } = user;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await sql.query(
        `update users set username = ?, password = ?, status = ? where id = ?`,
        [username, hashedPassword, status, id],
      );
    } catch (err) {
      console.log(err);
    } finally {
      //   await sql.end();
    }
  }

  async delete(id) {
    try {
      await sql.query(`delete from users where id = ?`, [id]);
    } catch (err) {
      console.log(err);
    } finally {
      //   await sql.end(); - // Dentro de Express ou Fastify
      // - nunca devemos fechar a conexão usando .end(), por padrão a própria lib faz o gerenciamento de conexões automaticamente
    }
  }
}
