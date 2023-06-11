const AbstractManager = require("./AbstractManager");

class ResourceManager extends AbstractManager {
  constructor() {
    super({ table: "resources" });
  }

  insert(resource) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      resource.title,
    ]);
  }

  update(resource) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [resource.title, resource.id]
    );
  }
}

module.exports = ResourceManager;
