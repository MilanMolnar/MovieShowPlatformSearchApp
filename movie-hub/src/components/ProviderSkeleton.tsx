const ProvidersSkeleton = () => {
  return (
    <div className="min-h-[200px] animate-pulse">
      <div className="mb-4 h-6 bg-gray-600 rounded w-1/2"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 h-10 bg-gray-600 rounded"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProvidersSkeleton;
