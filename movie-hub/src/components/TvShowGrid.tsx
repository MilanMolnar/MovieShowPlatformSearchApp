import React, { useEffect, useRef, useState } from "react";
import { Platform } from "../hooks/usePlatforms";
import { TvShow } from "../hooks/useTvShows";
import TvShowCard from "./TvShowCard";
import Spinner from "./Spinner";
import TvShowSkeleton from "./TvShowSkeleton";
import { PersistentOutline } from "./PersistentOutline";
import "../App.css";
import { useTranslation } from "react-i18next";

interface TvShowsData {
  data: TvShow[];
  error: string;
  isLoading: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

interface Props {
  tvShowsData: TvShowsData;
  selectedPlatform: Platform | null;
}

interface OutlinePosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

const TvShowGrid = ({ tvShowsData, selectedPlatform }: Props) => {
  const { t } = useTranslation();
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = tvShowsData;
  const observerTarget = useRef<HTMLDivElement>(null);
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const skeletonCount = Array.from({ length: 17 }, (_, i) => i + 1);

  const [outlinePosition, setOutlinePosition] =
    useState<OutlinePosition | null>(null);
  const [scaleFactor, setScaleFactor] = useState<number>(1);

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

  const gridRef = useRef<HTMLDivElement>(null);

  const handleCardHover = (
    event: React.MouseEvent<HTMLDivElement>,
    tvShowId: number
  ) => {
    const card = event.currentTarget.querySelector(
      ".card-inner"
    ) as HTMLElement;
    if (card && gridRef.current) {
      const cardRect = card.getBoundingClientRect();
      const gridRect = gridRef.current.getBoundingClientRect();

      setOutlinePosition({
        top: cardRect.top - gridRect.top + 3.3,
        left: cardRect.left - gridRect.left - 4.5,
        width: cardRect.width + 9,
        height: cardRect.height + 9,
      });

      setScaleFactor(1.01);
      setHoveredCard(tvShowId);
    }
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
    setScaleFactor(0.9);
  };

  return (
    <div className="relative overflow-hidden">
      {outlinePosition && (
        <PersistentOutline
          position={outlinePosition}
          scaleFactor={scaleFactor}
        />
      )}
      {error && <div>{t("error_loading_tv_shows")}</div>}
      <div
        ref={gridRef}
        className="grid lg:grid-cols-3 lm:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-1 mt-2 overflow-hidden">
        {isLoading &&
          skeletonCount.map((skeleton) => <TvShowSkeleton key={skeleton} />)}
        {data.length === 0 && !isLoading ? (
          <div className="text-2xl ml-4 my-2 w-full">
            {t("no_tv_shows_found")}
          </div>
        ) : (
          data.map((tvShow) => (
            <div
              key={tvShow.id}
              onMouseEnter={(e) => handleCardHover(e, tvShow.id)}
              onMouseLeave={handleCardLeave}>
              <TvShowCard tvShow={tvShow} />
            </div>
          ))
        )}
      </div>
      {isFetchingNextPage && <Spinner />}
      {fetchNextPage && hasNextPage && (
        <div ref={observerTarget} style={{ height: "20px" }}></div>
      )}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 w-32 left-1/2 transform -translate-x-1/2 bg-blue-500 dark:bg-slate-500 text-white p-2 rounded-full shadow-lg z-50  transition-all duration-300 ease-in-out opacity-60 hover:opacity-100">
          {t("back_to_top")}
        </button>
      )}
    </div>
  );
};

export default TvShowGrid;
