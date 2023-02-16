import React from "react";

const BookingWidget = ({ place }) => {
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
            <input type="date" />
          </div>
          <div className="py-3 px-4 border-l border-black">
            <label>Check out: </label>
            <input type="date" />
          </div>
        </div>
        <div className="py-3 px-4 border-t border-black">
          <label>Number of guests: </label>
          <input type="number" defaultValue={1} />
        </div>
      </div>
      <button className="primary hover:bg-pink-700 mt-4">BOOK NOW</button>
    </div>
  );
};

export default BookingWidget;
