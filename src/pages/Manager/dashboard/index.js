import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HotelItem from '../../../Components/Manager-HotelItem';
import { dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
import * as HostApi from '../../../api/ManagerApi';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Radio } from 'antd';
import SelectHotel from '../../../Components/Manager-HotelsDetail/SelectHotel';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
    const cx = classNames.bind(styles);
    const hotelSelected = JSON.parse(localStorage.getItem('hotelSelected'));
    const navigation = useNavigate();
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
            navigation('/manager/setting/hotelselection');
        }
    }, [auth, dispatch]);

    return <div>dashboard</div>;
}
