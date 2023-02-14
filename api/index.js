require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const User = require("./models/User");
const cookieParser = require("cookie-parser");

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URI);

app.get("/test", (req, res) => {
  res.json("test Ok");
});

// ----- REGISTER ----- //
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----- LOGIN ----- //
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id },
        process.env.SECRET_KEY,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(500).json("Wrong credentials");
    }
  }
});

// ----- PROFILE ----- //
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
      if (err) throw err;
      const userDoc = await User.findById(userData.id);
      res.json(userDoc);
    });
  }
});

// ----- LOGOUT ----- //
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(4000, () => console.log("server running..."));
