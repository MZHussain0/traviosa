import axios from "axios";
import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../context/userContext";
import PlacesPage from "./PlacesPage";

const ProfilePage = () => {
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const handleLogout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center mt-8 max-w-sm mx-auto">
          <span className="text-primary">Logged in as: </span>
          {user?.name} || {user?.email}
          <button
            className="primary mt-3 text-xl font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
