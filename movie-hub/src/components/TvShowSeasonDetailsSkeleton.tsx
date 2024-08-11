import React from "react";

const SeasonDetailSkeleton = () => {
  return (
    <div className="p-6 max-w-5xl w-[330px] lg:w-[1000px] md:w-[700px] sm:w-[500px]animate-pulse">
      {/* Placeholder for the Season Title */}
      <div className="h-8 bg-gray-600 rounded w-1/2 mb-4"></div>

      {/* Placeholder for Season Overview */}
      <div className="h-6 bg-gray-600 rounded w-3/4 mb-4"></div>
      <div className="h-6 bg-gray-600 rounded w-2/3 mb-4"></div>
      <div className="h-6 bg-gray-600 rounded w-1/2 mb-4"></div>

      {/* Placeholder for list of episodes */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gray-700 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-6 bg-gray-600 rounded w-3/4"></div>
              <div className="h-6 bg-gray-600 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetailSkeleton;
