import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";

const PlacesPage = () => {
  const { action } = useParams();
  // console.log("🚀 ~ file: PlacesPage.jsx:6 ~ actions", action);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);

  const inputHeaderDescription = (header, description) => {
    return (
      <>
        <h2 className="text-xl mt-4 font-semibold">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };

  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <form action="">
          <div>
            {inputHeaderDescription(
              "Title",
              "Title should be short and catchy"
            )}
            <input
              type="text"
              placeholder="title, for ex: seaface apartment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {inputHeaderDescription(
              "Address",
              "Adress to your place. Include nearby landmarks if possible."
            )}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            {inputHeaderDescription("Photos", "3-5 photos are better")}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="add links of images to upload..."
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className=" flex gap-1 justify-center text-gray-500 border bg-transparent p-8 rounded-xl hover:bg-gray-100 text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </button>
            </div>

            {inputHeaderDescription(
              "Description",
              "Sweet and short. Features of the property"
            )}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {inputHeaderDescription(
              "Perks",
              "select all the perks available at your property"
            )}
            <Perks selected={perks} onChange={setPerks} />

            {inputHeaderDescription("Extra Info", "House rules, etc..")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            {inputHeaderDescription(
              "Check-in & check-out times",
              "Add check in and check out times"
            )}
            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2 -mb-1">Check-in time : </h3>
                <input
                  type="text"
                  placeholder="ex: 14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check-out time : </h3>

                <input
                  type="text"
                  placeholder="ex: 14:00"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type="text"
                  value={maxGuest}
                  onChange={(e) => setMaxGuest(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PlacesPage;
