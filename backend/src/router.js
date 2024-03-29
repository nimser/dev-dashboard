const express = require("express");
const validateUser = require("./middlewares/validators/userValidator");

const router = express.Router();
const resourceControllers = require("./controllers/resourceControllers");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const {
  hashPassword,
  verifyPassword,
  verifyToken,
  logout,
} = require("./middlewares/services/auth");

router.get("/resources", resourceControllers.browse);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", validateUser, hashPassword, userControllers.edit);
router.post("/users", validateUser, hashPassword, userControllers.add);
router.delete("/users/:id", userControllers.destroy);

router.post("/login", authControllers.getUsernameAndPassword, verifyPassword);
router.get("/logout", logout);
router.use(verifyToken); // Auth wall. Routes after this lines use the middleware
router.get("/resources/:id", resourceControllers.read);
router.put("/resources/:id", resourceControllers.edit);
router.post("/resources", resourceControllers.add);
router.delete("/resources/:id", resourceControllers.destroy);

module.exports = router;
