import { useState, useEffect } from "react";
import axios from "axios";

const fetchAiSearchResults = async (query: string) => {
  const API_TOKEN = localStorage.getItem("chatGPTToken") || "";
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an assistant that provides popular TV show recommendations based on recomendations.",
          },
          {
            role: "user",
            content: `You are a search assistant and users input querys to you to search popular tvshows, the user may input the prompt in any language, but only respond in english, you are to search for 20 tv shows based on the query, if you cant find 20 you can add similar responses into the response, but it must be exactly 20. the response must be comma separated english tvshow names like this: (The flash,The Simpsons,Friends) if the prompt is one word try to search for the theme or synonyms here is the query between asterisks you need to search for: *${query}*`,
          },
        ],
        max_tokens: 100,
        n: 1,
        stop: null,
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const showList = response.data.choices[0].message.content.split(",").map((name:string, index:number) => ({
      id: index,
      name: name.trim(),
    }));

    return showList;
  } catch (error) {
    console.error("Error fetching AI search results:", error);
    throw new Error("Failed to fetch AI search results");
  }
};


const fetchTmdbShowDetails = async (showName: string) => {
  const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN || "";
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/tv`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + API_TOKEN,
      },
      params: {
        query: showName,
        language: "en-US",
        include_adult: false,
      },
    });

    if (response.data.results.length > 0) {
      const show = response.data.results[0];
      return {
        id: show.id,
        name: show.name,
        overview: show.overview,
        poster_path: show.poster_path,
        backdrop_path: show.backdrop_path,
        vote_average: show.vote_average,
        first_air_date: show.first_air_date,
      };
    }

    return null;
  } catch (error) {
    console.error("Error fetching TMDB details:", error);
    throw new Error("Failed to fetch TMDB details");
  }
};


const useAiSearch = (query: string) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(""); 
      fetchAiSearchResults(query) 
        .then((showList) => {

          const fetchDetailsPromises = showList.map(async (show: { name: string }) => {
            const tmdbDetails = await fetchTmdbShowDetails(show.name);
            return tmdbDetails; 
          });


          Promise.all(fetchDetailsPromises)
            .then((results) => {

              setData(results.filter((result) => result !== null));
              setLoading(false);
            })
            .catch((err) => {
              setError("An error occurred while fetching TMDB details");
              setLoading(false);
            });
        })
        .catch((err) => {
          setError("An error occurred while fetching AI results");
          setLoading(false);
        });
    } else {
      setData([]); 
    }
  }, [query]);

  return { data, isLoading, error };
};

export default useAiSearch;
