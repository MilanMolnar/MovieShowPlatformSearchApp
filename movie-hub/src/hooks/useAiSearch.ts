import { useState, useEffect } from "react";

// Placeholder for AI search API or function
const fetchAiSearchResults = async (query: string) => {
  // Replace with your actual AI search API call
  return new Promise<{ data: any[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { id: 1, name: "AI Search Result 1" },
          { id: 2, name: "AI Search Result 2" },
        ],
      });
    }, 1000);
  });
};

const useAiSearch = (query: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchAiSearchResults(query)
        .then((result) => {
          setData(result.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("An error occurred while searching");
          setLoading(false);
        });
    } else {
      setData([]);
    }
  }, [query]);

  return { data, loading, error };
};

export default useAiSearch;
