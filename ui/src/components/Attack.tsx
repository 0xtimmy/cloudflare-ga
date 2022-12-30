import { useState } from "react"
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Attacks() {

    const [loading, setLoading] = useState(true);

    const [total, setTotal] = useState([]);

    (async function() {
        if(loading) {
            const res = await fetch("https://cloudflare-ga-api.0xtimmy.workers.dev/attack-layer3", {
                method: "GET"
            });
            const result = await res.json();
            setLoading(false);
            setTotal(result.data.total.map((datum) => {
                return { y: parseFloat(datum.value), x: datum.timestamp };
            }))
        }
    })();

    const options = {

    }

    return (
        <div className="dash">
            <h2>Layer3 Attacks</h2>
            { loading ?
                <div>loading...</div>
                :
                <Line
                    datasetIdKey="id"
                    options={options}
                    data={{
                        datasets: [
                            { id: 3, label: "Total", data: total, borderColor: '#243763', backgroundColor: '#243763', radius: 2 },
                        ]
                    }}
                />
            }
        </div>
    )
}

export default Attacks;