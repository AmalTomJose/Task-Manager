const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.render("login",{message:'successull signup, please login'});

} catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
        return res.render('login',{message:"Invalid credentials"});

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.render('login',{message:"Invalid credentials"});
    console.log(process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);
    res.cookie("token", token);
res.redirect("/dashboard");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
res.redirect("/login");
};