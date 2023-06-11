const express = require("express");

const router = express.Router();
const resourceControllers = require("./controllers/resourceControllers");

router.get("/resources", resourceControllers.browse);
router.get("/resources/:id", resourceControllers.read);
router.put("/resources/:id", resourceControllers.edit);
router.post("/resources", resourceControllers.add);
router.delete("/resources/:id", resourceControllers.destroy);

module.exports = router;
