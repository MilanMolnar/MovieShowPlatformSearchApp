import { useEffect, useRef, useState } from "react";
import { Platform } from "../hooks/usePlatforms";
import { TvShow } from "../hooks/useTvShows";
import TvShowCard from "./TvShowCard";
import Spinner from "./Spinner";
import TvShowSkeleton from "./TvShowSkeleton";
import "../App.css";

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

const TvShowGrid = ({ tvShowsData, selectedPlatform }: Props) => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = tvShowsData;
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const skeletonCount = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

  useEffect(() => {
    if (!fetchNextPage || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
          setShowScrollToTop(true);
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

  const scrollToTop = () => {
    const mainContent = document.querySelector("main");
    setShowScrollToTop(false);
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {" "}
      {/* Add this wrapper div */}
      {error && <div>{error}</div>}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1 mt-2">
        {isLoading &&
          skeletonCount.map((skeleton) => <TvShowSkeleton key={skeleton} />)}
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
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 w-32 left-1/2 transform -translate-x-1/2 bg-blue-500 dark:bg-slate-500 text-white p-2 rounded-full shadow-lg z-50  transition-all duration-300 ease-in-out opacity-60 hover:opacity-100"
        >
          ↑ Back to Top
        </button>
      )}
    </div>
  );
};

export default TvShowGrid;
