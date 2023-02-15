import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
const PlacesPage = () => {
  const [places, setPlaces] = useState("");
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center mt-8">
        <Link
          className="inline-flex gap-2 bg-primary text-white text-xl font-semibold py-2 px-6 rounded-xl"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add New Place
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="bg-gray-100 cursor-pointer flex gap-4 p-4 rounded-xl shrink-0 grow"
            >
              <div className="w-32 h-32 bg-gray-300">
                {place.photos.length > 0 && <img src={place.photos[0]}></img>}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl font-semibold">{place.title}</h2>
                <p className="mt-2 text-sm">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;