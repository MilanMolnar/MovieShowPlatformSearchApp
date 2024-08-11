import React from "react";

const TvShowDetailSkeleton = () => {
  return (
    <div className="p-6 max-w-5xl w-[330px] lg:w-[950px] md:w-[700px] sm:w-[500px] animate-pulse">
      {/* Placeholder for the backdrop */}
      <div className="relative h-96 mb-6 overflow-hidden bg-gray-700 rounded-lg">
        <div className="absolute inset-0 bg-gray-300"></div>
      </div>

      {/* Placeholder for TV show details */}
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div className="h-6 bg-gray-600 rounded w-3/4"></div>
        <div className="h-6 bg-gray-600 rounded w-1/2"></div>
        <div className="h-6 bg-gray-600 rounded w-2/3"></div>
        <div className="h-6 bg-gray-600 rounded w-1/3"></div>
        <div className="h-6 bg-gray-600 rounded w-1/4"></div>
      </div>

      {/* Placeholder for dropdowns */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="h-10 bg-gray-600 rounded w-full"></div>
        <div className="h-10 bg-gray-600 rounded w-full"></div>
      </div>
    </div>
  );
};

export default TvShowDetailSkeleton;
