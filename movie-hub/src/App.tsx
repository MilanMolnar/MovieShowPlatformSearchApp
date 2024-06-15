import { useState } from "react";
import "./App.css";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import TvShowGrid from "./components/TvShowGrid";
import { Genre } from "./hooks/useGenres";
import { DarkModeProvider } from "./providers/DarkmodeContextProvider";
import useTvShows from "./hooks/useTvShows";

function App() {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const tvShowsData = useTvShows(selectedGenres);

  return (
    <DarkModeProvider>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex-grow flex overflow-auto">
          <aside className=" hidden sm:block w-52 p-4">
            <GenreList onSelectGenres={setSelectedGenres} />
          </aside>
          <main className=" flex-grow p-4">
            <TvShowGrid tvShowsData={tvShowsData} />
          </main>
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;
