import React, { useContext, useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [NumberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  });

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async (e) => {
    const datum = {
      checkIn,
      checkOut,
      NumberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    };
    const { data } = await axios.post("/bookings", datum);
    const bookingId = data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-gray-200 shadow-md shadow-black rounded-2xl p-4 font-semibold mt-8">
      <h2 className="text-2xl font-semibold text-center">
        Price : ${place.price}{" "}
        <span className="font-normal text-base">per night</span>
      </h2>
      <div className="border border-black rounded-2xl mt-4 bg-white">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l border-black">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t border-black">
          <label>Number of guests: </label>
          <input
            type="number"
            value={NumberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t border-black">
            <label>Your full name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Your mobile No: </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <button
        onClick={bookThisPlace}
        className="primary hover:bg-pink-700 mt-4"
      >
        BOOK this place
        {numberOfNights > 0 && (
          <span>
            {" "}
            for ${numberOfNights * place.price} ({numberOfNights}N)
          </span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
