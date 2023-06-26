const models = require("../models");

const getUsernameAndPassword = (req, res, next) => {
  models.user.findByUsername(req.body.username).then(([rows]) => {
    const userInDatabase = rows[0];

    if (userInDatabase == null) {
      res.sendStatus(422);
    } else {
      req.user = userInDatabase;
      next();
    }
  });
  res.json({ token: "oui oui, entre !" });
};

module.exports = {
  getUsernameAndPassword,
}
