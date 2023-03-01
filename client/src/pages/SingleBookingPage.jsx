import React from "react";
import { useParams } from "react-router-dom";

const SingleBookingPage = () => {
  const { id } = useParams();
  return <div>SingleBookingPage : {id}</div>;
};

export default SingleBookingPage;
