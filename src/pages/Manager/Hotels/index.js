import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import Feature_Icon from '../../../Components/DetailHotel-Feature-Icon';
import GalleryMainImage from '../../../Components/DetailHotel-MainImageGallery';
import HotelItem from '../../../Components/Manager-HotelItem';
import { useDispatch, useSelector } from 'react-redux';
import * as HostApi from '../../../api/ManagerApi';
import { dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
export default function Hotels() {
    const dispatch = useDispatch();
    const cx = classNames.bind(styles);
    const auth = JSON.parse(localStorage.getItem('user'));
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        // dispatch(dispatchHostFecth());
        if (auth) {
            dispatch(dispatchHostFecth());
            HostApi.getListHotels(auth.token)
                .then((result) => {
                    setHotels(result);
                    console.log(result);
                })
                .catch((err) => console.log(err))
                .finally(dispatch(dispatchHostSuccess()));
        }
    }, []);

    return (
        <div className={cx('body')}>
            {hotels.map((hotel, index) => {
                return <HotelItem hotel={hotel} key={index}></HotelItem>;
            })}
        </div>
    );
}