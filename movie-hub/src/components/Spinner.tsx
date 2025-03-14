import "../App.css";

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-300 h-12 w-12 mb-4 border-t-blue-600 dark:border-gray-200 dark:border-t-gray-800"></div>
  </div>
);

export default Spinner;
