const Task = require("../models/Task");

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