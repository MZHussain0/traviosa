import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Images from "../components/Images";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            key={place._id}
            className="rounded-2xl hover:-translate-y-1 duration-300">
            <div className="flex mb-4">
              {place.photos?.[0] && (
                <Images
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos?.[0]}
                />
              )}
            </div>
            <h3 className="font-semibold text-lg truncate">{place.address}</h3>
            <h2 className="font-medium  text-gray-600">{place.title}</h2>
            <div className="font-semibold mt-1">
              ${place.price} <span className="font-normal">per night</span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
