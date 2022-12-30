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

function Traffic() {

    const [loading, setLoading] = useState(true);

    const [http, setHttp] = useState([]);
    const [total, setTotal] = useState([]);

    (async function() {
        if(loading) {
            const res = await fetch("https://cloudflare-ga-api.0xtimmy.workers.dev/traffic-change", {
                method: "GET"
            });
            const result = await res.json();

            setLoading(false);
            setTotal(result.data.total.map((datum) => {
                return { y: parseFloat(datum.value), x: datum.timestamp };
            }));
            setHttp(result.data.http.map((datum) => {
                return { y: parseFloat(datum.value), x: datum.timestamp };
            }));

        }
    })();

    const options = {

    }

    return (
        <div className="dash">
            <h2>Traffic</h2>
                { loading ?
                    <div>loading...</div>
                    :
                    <Line
                        datasetIdKey="id"
                        options={options}
                        data={{
                            datasets: [
                                { id: 1, label: "Total", data: total, borderColor: '#243763', backgroundColor: '#243763', radius: 2 },
                                { id: 2, label: "Http", data: http, borderColor: '#FF6E31', backgroundColor: '#FF6E31', radius: 2 }
                            ]
                        }}
                    />
                }
        </div>
    )
}

export default Traffic;

/*
            let nhttp = [];
            let ntotal = [];
            Object.keys(jsonrecord.data).forEach((key) => {
                const match = key.match(/(\w+)\/(\w+)\/(\d+)/);
                if(match) {
                    if(match["1"] == "total") {
                        if(ntotal[parseInt(match["3"])]) {
                            ntotal[parseInt(match["3"])] = { [match["2"]]: jsonrecord.data[key], ...ntotal[parseInt(match["3"])] }
                        } else {
                            ntotal[parseInt(match["3"])] = { [match["2"]]: jsonrecord.data[key] }
                        }
                    } else if(match["1"] == "http") {
                        if(nhttp[parseInt(match["3"])]) {
                            nhttp[parseInt(match["3"])] = { [match["2"]]: jsonrecord.data[key], ...nhttp[parseInt(match["3"])] }
                        } else {
                            nhttp[parseInt(match["3"])] = { [match["2"]]: jsonrecord.data[key] }
                        }
                    }
                }
            });

            nhttp = nhttp.map((datum) => {
                return { value: datum.values, timestamp: datum.timestamps }
            })
            ntotal = ntotal.map((datum) => {
                return { value: datum.values, timestamp: datum.timestamps }
            })

            const out = {
                data: {
                    total: ntotal,
                    http: nhttp
                },
                meta: {
                    dateRange: {
                        startTime: "2022-07-25T10:00:00Z",
                        endTime: "2022-08-24T10:00:00Z"
                    },
                    confidenceInfo: {
                        level: 5,
                        annotations: [
                            {
                                dataSource: "NET",
                                startDate: "2022-08-24T10:00:00Z",
                                endDate: "2022-08-24T10:59:59Z",
                                eventType: "PARTIAL_PROJECTION",
                                description: "Only part of the aggregation interval is available (eg. for 1 hour, we only have 30 mins). Remaining time was projected given available data.",
                            },
                            {
                                dataSource: "NET",
                                startDate: "2022-08-04T01:00:00Z",
                                endDate: "2022-08-04T02:45:00Z",
                                eventType: "PIPELINE",
                                description: "internal issue"
                            }
                        ]
                    },
                    aggInterval: "ONE_HOUR",
                    lastUpdated: "2022-08-24T10:15:00Z"
                }
            }

            console.log(JSON.stringify(out));
            */