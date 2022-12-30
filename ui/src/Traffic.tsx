import { useState, useMemo } from "react"
import type { AxisOptions } from "react-charts";
import { Chart } from "react-charts";

type TrafficRecord = {
    timestamp: number,
    value: number,
}

function Traffic() {

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(null);
    const [http, setHttp] = useState([]);
    const [total, setTotal] = useState([]);

    (async function() {
        if(loading) {
            const res = await fetch("https://cloudflare-ga-api.0xtimmy.workers.dev/traffic-change", {
                method: "GET"
            });
            const jsonrecord = await res.json();

            setLoading(false);
            setData(jsonrecord);
            setTotal(jsonrecord.data.total.map((datum) => {
                return { value: parseFloat(datum.value), timestamp: new Date(datum.timestamp) };
            }))
            setHttp(jsonrecord.data.http.map((datum) => {
                return { value: parseFloat(datum.value), timestamp: new Date(datum.timestamp) };
            }));

        }
    })();

    const primaryAxis = useMemo(
        (): AxisOptions<TrafficRecord> => {
            return { getValue: (datum) => datum.timestamp };
        }, []
     );

    const secondaryAxes = useMemo(
        (): AxisOptions<TrafficRecord>[] => [
            { getValue: datum => datum.value, },
        ], []
     );

    return (
        <div className="dash">
            <h2>Traffic</h2>
                { loading ?
                    <div>loading...</div>
                    :
                    <Chart
                        style={{
                            position: "relative",
                            height: "500px",
                        }}
                        options={{
                            data: [
                                { label: "Total", data: total },
                                { label: "HTTP", data: http }
                            ],
                            primaryAxis: primaryAxis,
                            secondaryAxes: secondaryAxes
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