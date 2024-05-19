import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getTransaction } from '../../services/user';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartMoney = () => {
    const [transactions, setTransactions] = useState([]);
    const [ewallet, setEwallet] = useState(0);
    const [bank, setBank] = useState(0);
    const [paypal, setPaypal] = useState(0);

    useEffect(() => {
        const accessToken = localStorage.getItem("access-token");
        const fetchTransactions = async () => {
            const responseTransactions = await getTransaction(accessToken, 1, 3);
            console.log(responseTransactions);
            if (responseTransactions?.statusCode === 200) {
                setTransactions(responseTransactions?.response?.trans);
                let ewalletCount = 0;
                let bankCount = 0;
                let paypalCount = 0;
                responseTransactions?.response?.trans.forEach((item) => {
                    if (item.paymentMethods === 'E_Wallet') {
                        ewalletCount++;
                    } else if (item.paymentMethods === 'PayPal') {
                        paypalCount++;
                    } else {
                        bankCount++;
                    }
                });
                setEwallet(ewalletCount);
                setBank(bankCount);
                setPaypal(paypalCount);
            }
        };
        if (accessToken) {
            fetchTransactions();
        }
    }, []);

    const data = {
        labels: ['E-Wallet', 'Bank', 'PayPal'],
        datasets: [
            {
                label: 'Payment Methods',
                data: [ewallet, bank, paypal],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Payment Methods Distribution',
                color: '#2563EB',
                font: {
                    size: 16,
                    weight: '600'
                }
            }
        }
    };

    return (
        <div style={{ width: '300px', height: '300px' }} className='flex items-center justify-center ml-3'>
            <Pie data={data} options={options} />
        </div>
    );
}

export default ChartMoney;
