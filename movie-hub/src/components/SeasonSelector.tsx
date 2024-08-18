interface Props {
  totalSeasons: number;
  selectedSeason: number;
  onSelectSeason: (season: number) => void;
}

const SeasonSelector = ({
  totalSeasons,
  selectedSeason,
  onSelectSeason,
}: Props) => {
  return (
    <div className="relative w-full text-left">
      <select
        value={selectedSeason}
        onChange={(e) => onSelectSeason(Number(e.target.value))}
        className="w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        {Array.from({ length: totalSeasons }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Season {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeasonSelector;
