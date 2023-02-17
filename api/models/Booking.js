const mongoose = require("mongoose");
const Place = require("./Place");

const bookingModel = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Place,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  price: Number,
});

const BookingModel = mongoose.model("bookings", bookingModel);
module.exports = BookingModel;
