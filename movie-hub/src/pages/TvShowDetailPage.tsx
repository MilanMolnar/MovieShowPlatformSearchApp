import React from "react";
import { useParams } from "react-router-dom";

const TvShowDetailPage = () => {
  const { id } = useParams();
  return <div>TvShowDetailPage for {id}</div>;
};

export default TvShowDetailPage;
