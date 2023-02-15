import axios from "axios";
import React, { useState } from "react";

const PhotosUploader = ({ addedPhotos, onChange }) => {
  const [photoLink, setPhotoLink] = useState("");

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/upload-by-link", { link: photoLink });
    onChange((prev) => {
      return [...prev, data];
    });
    setPhotoLink("");
  };

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const datum = new FormData();
    for (let i = 0; i < files.length; i++) {
      datum.append("photos", files[i]);
    }
    const { data } = await axios.post("/upload", datum, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    onChange((prev) => {
      return [...prev, ...data];
    });
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="add links of images to upload..."
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div key={link} className="h-32 flex">
              <img
                src={"http://localhost:4000/uploads/" + link}
                alt=""
                className="rounded-xl w-full object-cover"
              />
            </div>
          ))}
        <label className="h-32 cursor-pointer flex gap-1 items-center justify-center text-gray-500 border bg-transparent p-2 rounded-xl hover:bg-gray-100 text-2xl">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
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
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
