import { useState } from "react";
import ChatPanel from "./components/ChatPanel";
import ListingsPanel from "./components/ListingsPanel";

export default function App() {
  const [cityFilter, setCityFilter] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">R8</div>
        <div className="brand">
          <div className="brand-name">RealNov8 Group</div>
          <div className="brand-sub">Smart Real Estate · Sustainable Cities</div>
        </div>
        <div className="project-badge">Project 3 of 5</div>
      </header>

      <main className="app-main">
        <ChatPanel onFilter={setCityFilter} />
        <ListingsPanel cityFilter={cityFilter} />
      </main>

      <footer className="app-footer">
        RealNov8 Group — Smart Real Estate, Sustainable Cities
      </footer>
    </div>
  );
}