import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as Api from '../../api/ManagerApi';
import { Select } from 'antd';
import moment from 'moment';
import { Spin, Alert } from 'antd';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
interface MoneyApi {
    bookings: [];
    totalPriceByfilter;
}
export function ChartYearInfo() {
    const cx = classNames.bind(styles);
    const { Option } = Select;
    const d = new Date();
    const [year, setYear] = useState(d.getFullYear());
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: ` Total Earning ${year}`,
            },
        },
    };
    function handleChange(value) {
        setYear(value);
    }
    function getAllDaysInMonth(year, month) {
        const date = new Date(year, month, 1);

        const dates = [];

        while (date.getMonth() === month) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates.length;
    }
    const hotelSelected = JSON.parse(localStorage.getItem('hotelSelected') || '');
    const auth = JSON.parse(localStorage.getItem('user') || '');
    const [listMoney, setListMoney] = useState([]);
    let datatmp = [];
    const getMoney = [...Array(12)].map((e, i) => {
        // Initial FormData
        const getDaysInMonth = getAllDaysInMonth(year, i);
        // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
        const from = `${year}-${i + 1}-1`;
        const to = `${year}-${i + 1}-${getDaysInMonth}`;
        return Api.getMoneyCheckOut(hotelSelected.hotelid, from, to, auth.token).then((result: MoneyApi) => {
            datatmp.push({ month: i + 1, total: result.totalPriceByfilter });
        });
    });
    // uploaders;

    useEffect(() => {
        Promise.all(getMoney)
            .catch((err) => {
                console.log(err);
            })
            .then((result) => {
                datatmp.sort(function (a, b) {
                    return a.month - b.month;
                });
                setListMoney(datatmp);
            });
    }, [year]);
    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const data = {
        labels,
        datasets: [
            {
                label: 'TotalEarnOfMonth',
                data: listMoney.map((e) => e.total * 1000),
                backgroundColor: 'rgb(46, 196, 182)',
            },
        ],
    };
    return (
        <div style={{ width: 1040 }}>
            <Select defaultValue={d.getFullYear()} style={{ width: 120 }} onChange={handleChange}>
                <Option value={d.getFullYear()}>{d.getFullYear()}</Option>
                <Option value={d.getFullYear() - 1}>{d.getFullYear() - 1}</Option>
                <Option value={d.getFullYear() - 2}>{d.getFullYear() - 2}</Option>
                <Option value={d.getFullYear() - 3}>{d.getFullYear() - 3}</Option>
            </Select>
            <Bar options={options} data={data} />;
        </div>
    );
}

export function ChartMonthInfo() {
    const cx = classNames.bind(styles);
    const { Option } = Select;
    const d = new Date();
    const [year, setYear] = useState(d.getFullYear());
    const [month, setMonth] = useState(d.getMonth());
    const [datesInMonth, setDateInMonth] = useState(getAllDaysInMonth(d.getFullYear(), d.getMonth()));
    const [labels, setLabels] = useState([]);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: ` Total Earning ${month + 1}/${year}`,
            },
        },
    };
    function handleChangeYear(value) {
        setYear(value);
    }
    function handleChangeMonth(value) {
        setMonth(value);
    }
    function getAllDaysInMonth(year, month) {
        const date = new Date(year, month, 1);

        const dates = [];

        while (date.getMonth() === month) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        return dates.length;
    }
    const hotelSelected = JSON.parse(localStorage.getItem('hotelSelected') || '');
    const auth = JSON.parse(localStorage.getItem('user') || '');
    const [listMoney, setListMoney] = useState([]);
    let datatmp = [];
    let dates = [];
    const getMoneyOfDate = [...Array(datesInMonth)].map((e, i) => {
        // Initial FormData
        // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
        const from = `${year}-${month + 1}-${i + 1}`;
        const to = `${year}-${month + 1}-${i + 1}`;
        dates.push(`${i + 1}`);
        return Api.getMoneyCheckOut(hotelSelected.hotelid, from, to, auth.token).then((result: MoneyApi) => {
            datatmp.push({ dates: i + 1, total: result.totalPriceByfilter });
        });
    });
    // const getMoneyOfDate = [...Array(datesInMonth)].map((e, i) => {
    //     setDates([...dates, i + 1]);
    //     const from = `${year}-${month}-${i + 1}`;
    //     const to = `${year}-${month}-${i + 1}`;
    //     console.log(from, to);
    //     // return Api.getMoneyCheckOut(hotelSelected.hotelid, from, to, auth.token).then((result: MoneyApi) => {
    //     //     datatmp.push({ date: i + 1, total: result.totalPriceByfilter });
    //     // });
    // });
    // uploaders;
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setDateInMonth(getAllDaysInMonth(year, month));
        console.log(month, getAllDaysInMonth(year, month));
        setIsLoading(true);
        Promise.all(getMoneyOfDate)
            .catch((err) => {
                console.log(err);
            })
            .then((result) => {
                datatmp.sort(function (a, b) {
                    return a.dates - b.dates;
                });
                setListMoney(datatmp);
                console.log(datatmp);
                setLabels(dates);
            })
            .finally(() => setIsLoading(false));
    }, [month, year]);
    const labels2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '11', '12'];
    const data = {
        labels,
        datasets: [
            {
                label: 'TotalEarn of date',
                data: listMoney.map((e) => e.total * 1000),
                backgroundColor: 'rgb(46, 196, 182)',
            },
        ],
    };
    return (
        <div style={{ width: 1040 }}>
            <Select defaultValue={d.getMonth()} style={{ width: 120 }} onChange={handleChangeMonth}>
                {labels2.map((e, i) => {
                    return <Option value={i}>Tháng {i + 1}</Option>;
                })}
            </Select>
            <Select defaultValue={d.getFullYear()} style={{ width: 120 }} onChange={handleChangeYear}>
                <Option value={d.getFullYear()}>{d.getFullYear()}</Option>
                <Option value={d.getFullYear() - 1}>{d.getFullYear() - 1}</Option>
                <Option value={d.getFullYear() - 2}>{d.getFullYear() - 2}</Option>
                <Option value={d.getFullYear() - 3}>{d.getFullYear() - 3}</Option>
            </Select>
            <Spin tip="Loading..." spinning={isLoading}>
                {listMoney ? <Bar options={options} data={data} /> : <></>}
            </Spin>
        </div>
    );
}
