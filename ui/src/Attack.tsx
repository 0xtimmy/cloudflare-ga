import { useState, useMemo } from "react"
import type { AxisOptions } from "react-charts";
import { Chart } from "react-charts";

type AttackRecord = {
    timestamp: number,
    value: number,
}

function Attacks() {

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(null);
    const [total, setTotal] = useState([]);

    (async function() {
        if(loading) {
            const res = await fetch("https://cloudflare-ga-api.0xtimmy.workers.dev/attack-layer3", {
                method: "GET"
            });
            const jsonrecord = await res.json();
            setLoading(false);
            setData(jsonrecord);
            console.log(jsonrecord);
            setTotal(jsonrecord.data.total.map((datum) => {
                return { value: parseFloat(datum.value), timestamp: new Date(datum.timestamp) };
            }))
        }
    })();

    const primaryAxis = useMemo(
        (): AxisOptions<AttackRecord> => {
            return { getValue: (datum) => datum.timestamp };
        }, []
     );

    const secondaryAxes = useMemo(
        (): AxisOptions<AttackRecord>[] => [
            { getValue: datum => datum.value, },
        ], []
     );

    return (
        <div className="dash">
            <h2>Layer3 Attacks</h2>
            { loading ?
                <div>loading...</div>
                :
                <Chart
                    className="flex-grow"
                    options={{
                        data: [
                            { label: "Total", data: total },
                        ],
                        primaryAxis: primaryAxis,
                        secondaryAxes: secondaryAxes
                    }}
                />
            }
        </div>
    )
}

export default Attacks;