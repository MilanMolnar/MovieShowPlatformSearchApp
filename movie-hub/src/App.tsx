import "./App.css";
import NavBar from "./components/NavBar";
import TvShowGrid from "./components/TvShowGrid";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex-grow flex overflow-auto">
        <aside className="border hidden sm:block w-64 p-4">Sidebar</aside>
        <main className="border flex-grow p-4">
          <TvShowGrid />
        </main>
      </div>
    </div>
  );
}

export default App;
