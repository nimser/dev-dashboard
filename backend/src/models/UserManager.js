const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByUsername(username) {
    return this.database.query(
      `SELECT id, username, hashedPassword FROM ${this.table} WHERE username = ? `,
      [username]
    );
  }

  insert(user) {
    return this.database.query(
      `INSERT INTO ${this.table} (${Object.keys(user).join(
        ","
      )}) VALUES (?, ?, ?)`,
      Object.values(user)
    );
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET username = ?, email = ?, hashedPassword = ? WHERE id = ?`,
      [user.username, user.email, user.hashedPassword, user.id]
    );
  }
}

module.exports = UserManager;
