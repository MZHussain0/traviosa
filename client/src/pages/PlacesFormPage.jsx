import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then(({ data }) => {
      setTitle(data.title);
      setAddress(data.address);
      setDescription(data.description);
      setAddedPhotos(data.photos);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuests);
    });
  }, [id]);

  const inputHeaderDescription = (header, description) => {
    return (
      <>
        <h2 className="text-xl mt-4 font-semibold">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      description,
      addedPhotos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
    };

    if (id) {
      //update existing
      await axios.put("/places", { id, ...placeData });
      setRedirect(true);
    } else {
      // new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        <div>
          {inputHeaderDescription("Title", "Title should be short and catchy")}
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
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
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
    </div>
  );
};

export default PlacesFormPage;
