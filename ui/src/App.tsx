import './App.css';
import { useState } from "react"
import Traffic from "./components/Traffic.tsx"
import Attacks from "./components/Attack.tsx"
import Popular from "./components/Popular.tsx"
function App() {

  return (
    <div id="app">
        <header>
          <h1>Cloudflare General Assignment</h1>
        </header>
        <main>
            <div className="dashboards">
                <Traffic />
                <Attacks />
            </div>
            <Popular />
        </main>
    </div>
  );
}

export default App;
