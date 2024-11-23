const TvShowDetailSkeleton = () => {
  return (
    <div className=" max-w-5xl w-[330px] lg:w-[950px] md:w-[700px] sm:w-[500px] animate-pulse">

      <div className="relative h-96 mb-6 overflow-hidden bg-gray-700 ">
        <div className="absolute inset-0 bg-gray-300"></div>
      </div>


      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div className="h-6 bg-gray-600  w-3/4"></div>
        <div className="h-6 bg-gray-600  w-1/2"></div>
        <div className="h-6 bg-gray-600  w-2/3"></div>
        <div className="h-6 bg-gray-600  w-2/3"></div>
        <div className="h-6 bg-gray-600  w-2/3"></div>

        <div className="h-6 bg-gray-600  w-2/3"></div>
        <div className="h-6 bg-gray-600  w-2/3"></div>

        <div className="h-6 bg-gray-600  w-2/3"></div>
        <div className="h-6 bg-gray-600  w-2/3"></div>

        <div className="h-6 bg-gray-600  w-1/3"></div>
        <div className="h-6 bg-gray-600  w-1/4"></div>
      </div>


      <div className="mb-6 mt-3 grid gap-4 md:grid-cols-2">
        <div className="h-10 bg-gray-600  w-full"></div>
        <div className="h-10 bg-gray-600  w-full"></div>
      </div>
    </div>
  );
};

export default TvShowDetailSkeleton;
