import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center mx-auto -mt-24">
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 p-6">
        <h1 className="text-4xl text-zinc-800 dark:text-zinc-400 font-bold mb-4">
          {t("error_title")}
        </h1>
        <p className="text-lg mb-8 text-zinc-800 dark:text-zinc-400">
          {t("error_message")}
        </p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 text-white hover:scale-105 dark:text-zinc-100 z-50 bg-blue-600 dark:bg-slate-700 rounded-md shadow-md transition duration-300"
        >
          {t("go_home")}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
