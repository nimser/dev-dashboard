const models = require("../models");

const browse = async (req, res) => {
  try {
    const [rows] = await models.resource.findAll();
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error in querying the SQL server");
  }
};

const read = (req, res) => {
  models.resource
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const resource = req.body;

  // TODO validations (length, format...)

  resource.id = parseInt(req.params.id, 10);

  models.resource
    .update(resource)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const resource = req.body;

  // TODO validations (length, format...)

  models.resource
    .insert(resource)
    .then(([result]) => {
      res.status(201).send({ ...resource, id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.resource
    .delete(req.params.id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
