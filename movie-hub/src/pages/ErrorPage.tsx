import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center mx-auto -mt-24">
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 p-6">
        <h1 className="text-4xl text-zinc-800 dark:text-zinc-400 font-bold mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-lg mb-8 text-zinc-800 dark:text-zinc-400">
          We can't seem to find the page you're looking for. It might have been
          removed, had its name changed, or is temporarily unavailable.
        </p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 text-white hover:scale-105 dark:text-zinc-100 z-50 bg-blue-600 dark:bg-slate-700 rounded-md shadow-md transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
