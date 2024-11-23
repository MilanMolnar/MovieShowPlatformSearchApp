import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEpisodeDetails from "../hooks/useEpisodeDetails";
import Spinner from "./Spinner";
import { useTranslation } from "react-i18next";

interface Props {
  seriesId: number;
  seasonNumber: number;
  episodeNumber: number;
}

const EpisodeDetails = ({
  seriesId,
  seasonNumber,
  episodeNumber,
}:Props) => {
  const { t } = useTranslation();
  const {
    data: episodeDetails,
    isLoading,
    isError,
  } = useEpisodeDetails(seriesId, seasonNumber, episodeNumber);

  const [isGuestStarsExpanded, setIsGuestStarsExpanded] = useState(false);

  if (isLoading) return <Spinner />;
  if (isError) return <div>{t("error_loading_details")}</div>;
  if (!episodeDetails) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 space-y-4"
    >
      <DetailItem label={t("air_date")} value={episodeDetails.air_date} />
      <DetailItem label={t("overview")} value={episodeDetails.overview} />
      <DetailItem
        label={t("vote_average")}
        value={`${episodeDetails.vote_average.toFixed(1)} (${
          episodeDetails.vote_count
        } votes)`}
      />

      {episodeDetails.crew.length > 0 && (
        <div>
          <strong className="text-sm md:text-base text-black dark:text-gray-400">
            {t("crew")}:
          </strong>
          <ul className="list-disc list-inside">
            {episodeDetails.crew.slice(0, 5).map((member) => (
              <li
                key={member.id}
                className="text-sm md:text-base text-black list-none dark:text-gray-200"
              >
                <strong className="text-black dark:text-gray-400">
                  {member.job}
                </strong>{" "}
                - {member.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {episodeDetails.guest_stars.length > 0 && (
        <div>
          <button
            onClick={() => setIsGuestStarsExpanded(!isGuestStarsExpanded)}
            className="text-sm md:text-base font-bold text-gray-600 hover:text-black dark:text-gray-500 dark:hover:text-gray-300 transition focus:outline-none"
          >
            {isGuestStarsExpanded
              ? t("hide_guest_stars")
              : t("show_guest_stars")}{" "}
            ({episodeDetails.guest_stars.length})
          </button>
          <AnimatePresence>
            {isGuestStarsExpanded && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="list-disc list-inside mt-2"
              >
                {episodeDetails.guest_stars.map((star) => (
                  <li
                    key={star.id}
                    className="text-sm md:text-base text-black dark:text-gray-200"
                  >
                    <strong> {star.name}</strong> as {star.character}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

const DetailItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div>
    <strong className="text-sm md:text-base text-black dark:text-gray-400">
      {label}:
    </strong>
    <p className="text-sm md:text-base text-black dark:text-gray-200">
      {value}
    </p>
  </div>
);

export default EpisodeDetails;
