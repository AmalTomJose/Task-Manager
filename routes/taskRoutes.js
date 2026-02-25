const router = require("express").Router();
const taskController = require("../controller/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;