const express = require("express");

const router = express.Router();
const resourceControllers = require("./controllers/resourceControllers");
const userControllers = require("./controllers/userControllers");

router.get("/resources", resourceControllers.browse);
router.get("/resources/:id", resourceControllers.read);
router.put("/resources/:id", resourceControllers.edit);
router.post("/resources", resourceControllers.add);
router.delete("/resources/:id", resourceControllers.destroy);

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

module.exports = router;
