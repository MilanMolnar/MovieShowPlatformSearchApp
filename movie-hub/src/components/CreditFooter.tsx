import TMDBLogo from "../assets/TMDB.svg";

const CreditFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-opacity-0 pointer-events-none dark:text-gray-200 p-4 flex flex-col sm:flex-row  items-center z-50">
      <div className="flex items-center mb-2 sm:mb-0  ml-5">
        <span className="text-m select-none">
          This Badge animation was made possible by Paul Henschel's Blog about
          3D event badge with React Three Fiber, check it out here:
        </span>
        <a
          className="font-bold  ml-3 flex pointer-events-auto"
          href="https://vercel.com/blog/building-an-interactive-3d-event-badge-with-react-three-fiber"
        >
          <svg
            width="30"
            height="25"
            viewBox="0 0 76 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#000000" />
          </svg>
          <span className="text-black text-lg select-none z-10">VERCEL</span>
        </a>
      </div>
    </div>
  );
};

export default CreditFooter;
