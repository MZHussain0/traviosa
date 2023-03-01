import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import Images from "../components/Images";

const SinglePlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get(`/places/${id}`).then(({ data }) => {
      setPlace(data);
    });
  }, [id]);

  if (!place) return;

  if (showAllPhotos) {
    return (
      <div className="absolute ease-in-out transition-all duration-300 bg-black text-white h-full inset-0 ">
        <h2 className="text-2xl text-center pt-8">Photos of "{place.title}"</h2>
        <div className="py-8 grid gap-2 place-items-center grid-flow-row-dense bg-black">
          <div className="absolute top-2 left-2 p-4">
            <button
              onClick={() => {
                setShowAllPhotos(false);
              }}
              className="flex fixed px-4 py-2 rounded-md gap-1 font-semibold bg-white text-black shadow shadow-white hover:scale-105 duration-300 hover:text-primary  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                  clipRule="evenodd"
                />
              </svg>
              close
            </button>
          </div>
          {place.photos.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <Images className="w-[750px]" src={`${photo}`} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h1 className="text-xl font-bold">{place?.title}</h1>
      <a
        target="_blank"
        href={`https://maps.google.com/?q=${place?.address}`}
        className="flex gap-1 my-2 text-l underline text-primary hover:text-gray-600 duration-300 font-semibold mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place?.address}
      </a>
      <div className="h-[500px] overflow-hidden rounded-2xl relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] items-start ">
          <div className="">
            {place?.photos?.[0] && (
              <Images
                onClick={() => {
                  setShowAllPhotos(true);
                }}
                className="w-full h-full aspect-square object-cover hover:grayscale"
                src={`${place.photos[0]}`}
              />
            )}
          </div>
          <div className="grid gap-2 items-center">
            {place?.photos?.[1] && (
              <Images
                onClick={() => {
                  setShowAllPhotos(true);
                }}
                className="w-full h-64 object-cover hover:grayscale"
                src={`${place.photos[1]}`}
              />
            )}
            {place?.photos?.[2] && (
              <Images
                onClick={() => {
                  setShowAllPhotos(true);
                }}
                className="w-full h-64 object-cover hover:grayscale"
                src={`${place.photos[2]}`}
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-2 right-2 font-semibold shadow shadow-black border-black bg-white rounded-2xl px-4 py-2 opacity-80 hover:text-primary hover:opacity-100 hover:scale-105 duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
            />
          </svg>
          Show more photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mb-8">
        <div className="text-l font-medium">
          <div className="my-8">
            <h2 className="text-2xl font-semibold">Description</h2>
            {place.description}
          </div>
          Check-In : {place.checkIn} am
          <br />
          Check-Out: {place.checkOut} am
          <br />
          Max guests : {place.maxGuests}
        </div>
        <BookingWidget place={place} />
      </div>
      <div className="bg-primary -mx-48 text-white py-4 px-8 border-t-2 border-black">
        <div className="my-4">
          <h2 className="text-2xl font-semibold">Extra Info</h2>
        </div>
        <div className="text-base text-gray-200 ">
          IMPORTANT NOTICE: <br />
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default SinglePlacePage;
