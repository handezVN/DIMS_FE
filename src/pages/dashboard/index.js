import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import * as authApi from '../../api/authApi';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchFecth, dispatchSuccess } from '../../redux/actions/authAction';
import BookingItem from '../../Components/Dashboard-BookingItem';
export default function Dashboard() {
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const auth = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    useEffect(() => {
        if (auth) {
            dispatch(dispatchFecth());
            authApi
                .GetDashBoard(auth.token)
                .then((result) => setData(result))
                .catch((err) => console.log(err))
                .finally(dispatch(dispatchSuccess()));
        }
    }, [auth]);
    return (
        <div className={cx('body')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Quản lý đơn hàng </div>
                {data.length > 0 ? (
                    data.map((order, index) => {
                        return (
                            <BookingItem
                                bookingId={order.bookingId}
                                categoryName={order.bookingDetails[0].categoryName}
                                endDate={order.endDate}
                                hotelAddress={order.hotelAddress}
                                hotelName={order.hotelName}
                                imgUrl={order.hotelPhotos[0].photoUrl}
                                startDate={order.startDate}
                                totalPrice={order.totalPrice}
                                qrCode={order.qrcheckup.qrUrl}
                                key={index}
                            ></BookingItem>
                        );
                    })
                ) : (
                    <div>Bạn chưa có đơn hàng nào !</div>
                )}
            </div>
        </div>
    );
}
