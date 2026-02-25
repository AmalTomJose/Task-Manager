const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      user: req.user.id,
    });

    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET USER TASKS (IMPORTANT FILTER)
// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({
//       user: req.user.id,
//       isDeleted: false,
//     });

//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// UPDATE STATUS
exports.updateTask = async (req, res) => {
  try {
    console.log('Hii');
    console.log(req.body);
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { status: req.body.status },
      { new: true }
    );

    res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SOFT DELETE (IMPORTANT)
exports.deleteTask = async (req, res) => {
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isDeleted: true }
    );

    res.redirect("/dashboard");

e  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};