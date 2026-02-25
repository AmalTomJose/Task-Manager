require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");
const Task = require("./models/Task");

const app = express();
connectDB();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride("_method"));

// view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));


app.get("/", (req, res) => res.redirect("/login"));

app.get("/signup", (req, res) => res.render("signup"));
app.get("/login", (req, res) => res.render("login"));

app.get("/dashboard", authMiddleware, async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
    isDeleted: false,
  });

  res.render("dashboard", { tasks });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));