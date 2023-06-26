const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

   findByUsername(username) {
    return this.database.query(
      `select username, hashedPassword from ${this.table} where username = ? `
    )
   }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (${Object.keys(user).join(
        ","
      )}) values (?, ?, ?)`,
      Object.values(user)
    );
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set username = ?, email = ?, password = ? where id = ?`,
      [user.username, user.email, user.password, user.id]
    );
  }
}

module.exports = UserManager;
