import React from "react";
import TMDBLogo from "../assets/TMDB.svg";
import { useTranslation } from "react-i18next";

const TMDBComply = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-8">
      <a href="https://www.themoviedb.org/">
        {t("powered")}
        <img src={TMDBLogo} alt="TMDB Logo" className="h-8 mr-2" />
      </a>
    </div>
  );
};

export default TMDBComply;
