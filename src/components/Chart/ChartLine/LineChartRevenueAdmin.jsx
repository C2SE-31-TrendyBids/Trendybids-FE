import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import * as adminServices from "../../../services/admin";
import FilterChart from "../../SummaryAdmin/FilterChart";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);





export function LineChartRevenueAdmin() {

    const [profit, setProfit] = useState([]);
    const [params, setParams] = useState({ period: "Year", year: 2024, month: 1, week: 1});
    const [label, setLabel] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem("access-token");

        params?.period.toLowerCase() === "year" && setLabel(timeLine.years);
        params?.period.toLowerCase() === "month" && setLabel(timeLine.months);
        params?.period.toLowerCase() === "week" && setLabel(timeLine.weeks);
        const fetchProfit = async () => {
            const responseSummary = await adminServices.getProfit(accessToken,params);
            if (responseSummary.status === 200) {
                setProfit(responseSummary?.data?.data);
            }
        }
        accessToken && fetchProfit();

    }, [params]);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                align: 'start',
                margin: {
                    bottom: 20,
                },
            },
            title: {
                display: true,
                position: 'top',
                align: 'start',
                fontSize: 30,
                fontWeight: 'bold',
                text: 'Total Revenue',
            },
            margin: {
                top: 10,
            },
        },
    };

    const timeLine = {
        weeks: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        months: ['Week-1', 'Week-2', 'Week-3', 'Week-4'],
        years: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };

    const data = {
        labels: label,
        datasets: [
            {
                fill: true,
                label: 'price',
                data: profit,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <div className="relative w-full h-full">
            <div className="hidden lg:block absolute top-2 right-3">
                <FilterChart params={params} setParams={setParams}/>
            </div>
            <Line options={options} data={data}/>
        </div>
    )
}
