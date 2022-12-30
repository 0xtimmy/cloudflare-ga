import './App.css';
import { useState } from "react"
import Traffic from "./Traffic.tsx"
import Attacks from "./Attack.tsx"
function App() {


    const [loadingAttacks, setLoadingAttacks] = useState(false);
    const [loadingPopular, setLoadingPopular] = useState(true);
    const [popular, setPopular] = useState([]);

    (async function() {
        if(loadingPopular) {
            const res = await fetch("https://cloudflare-ga-api.0xtimmy.workers.dev/popular-domains", {
                method: "GET"
            });
            const jsonrecord = await res.json();
            setLoadingPopular(false);
            //console.log(jsonrecord);
            setPopular(jsonrecord.rankingEntries);
        }
    })();

  return (
    <div>
        <header>
          <h1>Cloudflare Dashboard</h1>
        </header>
        <div className="main">
            <div className="dashboards">
                <Traffic />
                <Attacks />
            </div>
            <div className="dash">
                <h2>Popular Domains</h2>
                { loadingPopular ?
                    <div>loading...</div>
                    :
                    popular.sort((a, b) => a.rank > b.rank ? 1 : -1).map((domain) => {
                        return (<div key={domain.domain}>{ domain.rank } : { domain.domain }</div>)
                    })
                }
            </div>
        </div>
    </div>
  );
}

export default App;
