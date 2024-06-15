const TvShowSkeleton = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="relative h-64 rounded-t-lg overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-gray-300"></div>
        <div className="absolute justify-between bottom-0 w-full h-15 flex items-center p-4 bg-gradient-to-b from-transparent to-gray-700">
          <div className="bg-gray-400 h-6 w-1/2 rounded"></div>
          <div className="bg-gray-400 h-6 w-1/6 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default TvShowSkeleton;
