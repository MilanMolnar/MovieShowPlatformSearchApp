import { Platform } from "../hooks/usePlatforms";
import useTvShows, { TvShow } from "../hooks/useTvShows";
import TvShowCard from "./TvShowCard";
import TvShowSkeleton from "./TvShowSkeleton";

interface Props {
  tvShowsData: {
    data: TvShow[];
    error: string;
    loading: boolean;
  };

  selectedPlatform: Platform | null;
}

const TvShowGrid = ({ tvShowsData }: Props) => {
  const { data, error, loading } = tvShowsData;
  const skeletonCount = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];
  return (
    <>
      {error && <div>{error}</div>}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1">
        {loading &&
          skeletonCount.map((skeleton) => <TvShowSkeleton key={skeleton} />)}
        {data.length === 0 ? (
          <div className="text-2xl ml-4 my-2 w-full">No Tv Shows Found :(</div>
        ) : (
          data.map((tvShow) => <TvShowCard key={tvShow.id} tvShow={tvShow} />)
        )}
      </div>
    </>
  );
};

export default TvShowGrid;
