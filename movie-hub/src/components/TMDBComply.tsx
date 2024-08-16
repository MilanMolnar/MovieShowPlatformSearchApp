import React from "react";
import TMDBLogo from "../assets/TMDB.svg";

const TMDBComply = () => {
  return (
    <div className="mt-8">
      <a href="https://www.themoviedb.org/">
        {`Powered by:`}
        <img src={TMDBLogo} alt="TMDB Logo" className="h-8 mr-2" />
      </a>
    </div>
  );
};

export default TMDBComply;
