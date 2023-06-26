const { body, validationResult } = require("express-validator");

const validateUser = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg, param }) => {
      return { field: param, message: msg };
    });
    const user = req.body;
    if (!errors.isEmpty()) {
      res.status(422).json({ ...user, errors: errors.mapped() });
    } else {
      next();
    }
  },
];

module.exports = validateUser;
