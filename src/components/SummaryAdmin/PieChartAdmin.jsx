import React, {useEffect, useState} from 'react';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Line, Pie} from 'react-chartjs-2';
import * as adminServices from "../../services/admin";
import FilterChart from "./FilterChart";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

ChartJS.register(ArcElement, Tooltip, Legend);


export function PieChartAdmin() {

    const [dataChart, setDataChart] = useState([])
    const [params, setParams] = useState({period: "year", year: 2024})
    console.log(1)

    useEffect(() => {
        const accessToken = localStorage.getItem('access-token');
        const fetchData = async () => {
            console.log(2)
            const responseData = await adminServices.getChartProduct(accessToken, params)
            console.log(responseData)
            responseData?.status === 200 && setDataChart(responseData?.data?.counts);
        };

        accessToken && fetchData();
    }, [params]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'center',
                margin: {
                    bottom: 10,
                },
            },
            title: {
                display: true,
                position: 'top',
                align: 'start',
                fontSize: 30,
                fontWeight: 'bold',
                text: 'Product Auction Status',
            },
            maintainAspectRatio: true,
        },
    };

    const data = {
        labels: ['Ongoing', 'Ended', 'Not Started'],
        datasets: [
            {
                label: 'count',
                data: dataChart || [0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="relative">
            <div className="hidden lg:block absolute top-2 right-3">
                <FormControl sx={{m: 1, minWidth: 80}} size="small">
                    <InputLabel id="demo-simple-select-helper-label">Year</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={params?.year}
                        label="Period"
                        onChange={(e) => setParams({...params, year: e.target.value})}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2021}>2021</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Pie options={options} data={data}/>
        </div>
    )
}
