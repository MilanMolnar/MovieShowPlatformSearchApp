import "./App.css";
import GenreList from "./components/GenreList";
import NavBar from "./components/NavBar";
import TvShowGrid from "./components/TvShowGrid";
import { DarkModeProvider } from "./providers/DarkmodeContextProvider";

function App() {
  return (
    <DarkModeProvider>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex-grow flex overflow-auto">
          <aside className=" hidden sm:block w-52 p-4">
            <GenreList />
          </aside>
          <main className=" flex-grow p-4">
            <TvShowGrid />
          </main>
        </div>
      </div>
    </DarkModeProvider>
  );
}

export default App;
