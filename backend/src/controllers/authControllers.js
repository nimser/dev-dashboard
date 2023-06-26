const models = require("../models");

const getUsernameAndPassword = (req, res, next) => {
  models.user.findByUsername(req.body.username).then(([rows]) => {
    const userInDatabase = rows[0];

    if (userInDatabase == null) {
      res.status(401).json({ message: "Invalid credentials. Try again." });
    } else {
      req.user = userInDatabase;
      next();
    }
  });
};

module.exports = {
  getUsernameAndPassword,
};
