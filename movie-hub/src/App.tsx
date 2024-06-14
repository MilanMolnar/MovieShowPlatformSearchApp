import "./App.css";

function App() {
  return (
    <div className="flex flex-col h-screen">
      <header className="border p-4">Navigation Bar</header>
      <div className="flex-grow flex overflow-auto">
        <aside className="border hidden sm:block w-64 p-4">Sidebar</aside>
        <main className="border flex-grow p-4">Main Content</main>
      </div>
    </div>
  );
}

export default App;
