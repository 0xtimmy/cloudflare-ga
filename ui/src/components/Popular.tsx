import { useState } from "react"
import RankItem from "./RankItem.tsx";

function Popular() {

    const [loading, setLoading] = useState(true);
    const [popular, setPopular] = useState([]);

    (async function() {
        if(loading) {
            const res = await fetch("https://cloudflare-ga-api.0xtimmy.workers.dev/popular-domains", {
                method: "GET"
            });
            const result = await res.json();
            setLoading(false);
            setPopular(result.rankingEntries);
        }
    })();

    return (
        <div className="dash">
            <h2>Popular Domains</h2>
            { loading ?
                <div>loading...</div>
                :
                popular.sort((a, b) => a.rank > b.rank ? 1 : -1).map((domain) => {
                    return (<RankItem key={domain.domain} item={domain}>{ domain.rank } : { domain.domain }</RankItem>)
            })
        }
    </div>)
}

export default Popular;