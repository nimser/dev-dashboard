const AbstractManager = require("./AbstractManager");

class ResourceManager extends AbstractManager {
  constructor() {
    super({ table: "resources" });
  }

  insert(resource) {
    return this.database.query(
      `insert into ${this.table} (${Object.keys(resource).join(
        ","
      )}) values (?, ?, ?, ?, ?)`,
      Object.values(resource)
    );
  }

  update(resource) {
    return this.database.query(
      `update ${this.table} set title = ?, url = ?, type = ?, topics = ?, description = ? where id = ?`,
      [
        resource.title,
        resource.url,
        resource.type,
        resource.topics,
        resource.description,
        resource.id,
      ]
    );
  }
}

module.exports = ResourceManager;
