import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dispatchHostFailed, dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
import * as HostApi from '../../../api/ManagerApi';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import ShowRoomStatus from '../../../Components/Manager-HotelsDetail/ShowRoomStatus';
import { mdiCashCheck, mdiCashClock, mdiCashFast, mdiWalletTravel } from '@mdi/js';
import BoxInfo from '../../../Components/Manager-Dashboard-BoxInfo';
import TableInfo from '../../../Components/Manager-Dashboard-TableBooking';

export default function Dashboard() {
    const cx = classNames.bind(styles);
    const [hotelSelected, setHotelSelect] = useState(
        JSON.parse(localStorage.getItem('hotelSelected')) || {
            hotelid: '',
        },
    );

    const navigation = useNavigate();
    const dispatch = useDispatch();
    const auth = JSON.parse(localStorage.getItem('user'));
    const date = new Date();
    const currentDate = date.getDate();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const firstdayinMonth = `${currentYear}-${currentMonth}-${1}`;
    const today = `${currentYear}-${currentMonth}-${currentDate}`;
    const [hotels, setHotels] = useState([]);
    const [checkOut, setCheckOut] = useState({});
    const [noncheckOut, setNonCheckOut] = useState({});
    const [TotalInMonth, setTotalInMonth] = useState({});
    const [listTable, setListTable] = useState([]);
    useEffect(() => {
        console.log(hotelSelected);
        if (hotelSelected.hotelid === '') {
            navigation('/manager/setting/hotelselection');
        } else {
            if (auth) {
                dispatch(dispatchHostFecth());
                Promise.all([getMoneyCheckOut(), getMoneyNonCheckOut(), getTotalMoneyInMonth()])
                    .then(() => {
                        dispatch(dispatchHostSuccess());
                    })
                    .catch((err) => {
                        console.log(err);
                        dispatch(dispatchHostFailed());
                    });
            }
        }
    }, []);
    const getMoneyCheckOut = () => {
        return HostApi.getMoneyCheckOut(hotelSelected.hotelid, today, today, auth.token)
            .then((result) => {
                setCheckOut(result);
            })
            .catch((err) => console.log(err));
    };
    const getMoneyNonCheckOut = () => {
        return HostApi.getMoneyNonCheckOut(hotelSelected.hotelid, today, today, auth.token)
            .then((result) => {
                setNonCheckOut(result);
            })
            .catch((err) => console.log(err));
    };
    const getTotalMoneyInMonth = () => {
        return HostApi.getMoneyCheckOut(hotelSelected.hotelid, firstdayinMonth, today, auth.token)
            .then((result) => {
                setTotalInMonth(result);
            })
            .catch((err) => console.log(err));
    };
    // -------------------------------------------------------------------------------------------------------
    const handleClose = (id) => {
        const newlist = listTable.filter((e) => e.tableId !== id);
        setListTable(newlist);
    };
    return (
        <div className={cx('body')}>
            <div className={cx(['list-info-box'])}>
                <div
                    onClick={() =>
                        setListTable([
                            ...listTable,
                            {
                                tableId: 1,
                                bookings: noncheckOut.bookings,
                            },
                        ])
                    }
                    style={{ display: 'contents', cursor: 'pointer' }}
                >
                    <BoxInfo
                        background={'#53A1FD'}
                        icon={mdiCashClock}
                        strong={` ${(noncheckOut.totalPriceByfilter * 1000).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })} VNĐ`}
                        title={'Non CheckOut'}
                    ></BoxInfo>
                </div>
                <div
                    onClick={() =>
                        setListTable([
                            ...listTable,
                            {
                                tableId: 2,
                                bookings: checkOut.bookings,
                            },
                        ])
                    }
                    style={{ display: 'contents', cursor: 'pointer' }}
                >
                    <BoxInfo
                        background={'#2EC4B6'}
                        icon={mdiCashCheck}
                        strong={`${(checkOut.totalPriceByfilter * 1000).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })} VNĐ`}
                        title={'CheckOut'}
                    ></BoxInfo>
                </div>
                <BoxInfo
                    background={'#8e44ad'}
                    icon={mdiWalletTravel}
                    strong={'10'}
                    title={'Booking in Online'}
                ></BoxInfo>
                <div
                    onClick={() =>
                        setListTable([
                            ...listTable,
                            {
                                tableId: 4,
                                bookings: TotalInMonth.bookings,
                            },
                        ])
                    }
                    style={{ display: 'contents', cursor: 'pointer' }}
                >
                    <BoxInfo
                        background={'orange'}
                        icon={mdiCashFast}
                        strong={`${(TotalInMonth.totalPriceByfilter * 1000).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })} VNĐ`}
                        title={'Total Earning'}
                        subContent={`In ${currentDate} days`}
                    ></BoxInfo>
                </div>
            </div>
            <ShowRoomStatus hotelId={hotelSelected.hotelid}></ShowRoomStatus>
            {listTable.map((e) => {
                return <TableInfo data={e} onClose={handleClose}></TableInfo>;
            })}
        </div>
    );
}
