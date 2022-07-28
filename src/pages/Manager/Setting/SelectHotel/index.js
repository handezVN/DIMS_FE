import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dispatchHostFecth, dispatchHostSuccess } from '../../../../redux/actions/authAction';
import * as HostApi from '../../../../api/ManagerApi';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import SelectHotel from '../../../../Components/Manager-HotelsDetail/SelectHotel';
export default function HotelSelection() {
    const cx = classNames.bind(styles);
    const hotelSelected = JSON.parse(localStorage.getItem('hotelSelected'));
    const [setlectHotel, setSelectHotel] = useState(false);
    const dispatch = useDispatch();
    const auth = JSON.parse(localStorage.getItem('user'));
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        // dispatch(dispatchHostFecth());
        if (auth) {
            dispatch(dispatchHostFecth());
            HostApi.getListHotels(auth.token)
                .then((result) => {
                    setHotels(result);
                })
                .catch((err) => console.log(err))
                .finally(dispatch(dispatchHostSuccess()));
        }
        if (hotelSelected === null) {
            setSelectHotel(true);
        }
    }, [auth, dispatch]);

    return (
        <div className={cx('body')}>
            Chọn khách sạn
            {hotels.map((hotel, index) => {
                return (
                    <SelectHotel
                        hotel={hotel}
                        key={index}
                        isSelect={hotelSelected.hotelid === hotel.hotelId ? true : false}
                    ></SelectHotel>
                );
            })}
        </div>
    );
}
