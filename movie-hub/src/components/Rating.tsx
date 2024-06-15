interface Props {
  averageVote: number;
}

const Rating = ({ averageVote }: Props) => {
  return (
    <div
      className={`text-xs font-bold py-1 px-2 rounded border bg-opacity-70 ${
        averageVote >= 7.5
          ? "bg-green-800 text-green-300 border-green-800"
          : averageVote >= 5.5
          ? "bg-blue-800 text-blue-300 border-blue-800"
          : averageVote >= 4
          ? "bg-yellow-800 text-yellow-300 border-yellow-800"
          : "bg-red-800 text-red-300 border-red-800"
      }`}
    >
      {averageVote.toFixed(1)}
    </div>
  );
};

export default Rating;
