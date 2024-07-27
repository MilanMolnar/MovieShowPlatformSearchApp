import { useEffect, useRef } from "react";
import { Platform } from "../hooks/usePlatforms";
import { TvShow } from "../hooks/useTvShows";
import TvShowCard from "./TvShowCard";
import Spinner from "./Spinner";

interface Props {
  tvShowsData: {
    data: TvShow[];
    error: string;
    isLoading: boolean;
    fetchNextPage?: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage?: boolean;
  };
  selectedPlatform: Platform | null;
}

const TvShowGrid = ({ tvShowsData }: Props) => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = tvShowsData;

  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!fetchNextPage || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      {error && <div>{error}</div>}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1">
        {isLoading && <Spinner />}
        {data.length === 0 && !isLoading ? (
          <div className="text-2xl ml-4 my-2 w-full">No Tv Shows Found</div>
        ) : (
          data.map((tvShow) => <TvShowCard key={tvShow.id} tvShow={tvShow} />)
        )}
      </div>
      {isFetchingNextPage && <Spinner />}
      {fetchNextPage && hasNextPage && (
        <div ref={observerTarget} style={{ height: "20px" }}></div>
      )}
    </>
  );
};

export default TvShowGrid;
