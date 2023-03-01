require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");
const fs = require("fs");

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const bucket = "traviossa-booking-app";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads/"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.get("/test", (req, res) => {
  mongoose.connect(process.env.MONGO_URI);
  res.json("test Ok");
});

const uploadToS3 = async (path, originalFilename, mimetype) => {
  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFileName = Date.now() + "." + ext;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      Body: fs.readFileSync(path),
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFileName}`;
};

// ----- REGISTER ----- //
app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

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
  mongoose.connect(process.env.MONGO_URI);

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
  mongoose.connect(process.env.MONGO_URI);

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
  mongoose.connect(process.env.MONGO_URI);

  res.cookie("token", "").json(true);
});

// ----- DOWNLOAD IMAGE ----- //
app.post("/upload-by-link", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + newName,
  });
  const url = await uploadToS3(
    "/tmp/" + newName,
    newName,
    mime.lookup("/tmp/" + newName)
  );
  res.json(url);
});

// ---- UPLOAD ---- //
const photosMiddleware = multer({ dest: "/tmp" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

// ----- ADD NEW PLACE ----- //
app.post("/places", (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

  const { token } = req.cookies;
  const {
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    title,
    price,
  } = req.body;

  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests: maxGuest,
      price,
    });
    res.json(placeDoc);
  });
});

// ----- GET USER created PLACES ----- //
app.get("/user-places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const places = await Place.find({ owner: userData.id });
    res.json(places);
  });
});

// ----- GET ONE PLACE ----- //
app.get("/places/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

  const place = await Place.findById(req.params.id);
  res.json(place);
});

// ----- UPDATE PLACE ----- //
app.put("/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

  const { token } = req.cookies;
  const {
    id,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    title,
    price,
  } = req.body;

  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        owner: userData.id,
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests: maxGuest,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

// ----- GET ALL PLACES FROM DATABASE ----- //
app.get("/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

  const places = await Place.find();
  res.json(places);
});

// ---- CREATE BOOKINGS ----- //
app.post("/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const bookingDoc = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
    });
    res.json(bookingDoc);
  });
});

// ----- GET ALL BOOKINGS FROM DATABASE ----- //
app.get("/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URI);

  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
    if (err) throw err;
    const user = await Booking.find({ user: userData.id }).populate("place");
    res.json(user);
  });
});

app.listen(4000, () => console.log("server running..."));
