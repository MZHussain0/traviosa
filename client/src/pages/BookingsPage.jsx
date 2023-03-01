import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then(({ data }) => {
      setBookings(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="mt-8">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4  rounded-2xl overflow-hidden hover:bg-gray-200 duration-300"
              key={booking._id}
            >
              <div className="w-44">
                <PlaceImg place={booking.place} index={1} />
              </div>

              <div className="py-4 pr-3 grow">
                <h2 className="py-2 font-semibold text-xl">
                  {booking.place.title}
                </h2>
                <div className="border-t border-gray-300 mt-2 py-2">
                  {format(new Date(booking.checkIn), "yyyy-MM-dd")} {"--> "}
                  {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                </div>

                <div className="text-xl font-medium">
                  {differenceInCalendarDays(
                    new Date(booking.checkOut),
                    new Date(booking.checkIn)
                  )}{" "}
                  nights | Price: ${booking.price}
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
