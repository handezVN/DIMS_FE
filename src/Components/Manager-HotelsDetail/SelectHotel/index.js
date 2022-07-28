import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HotelItem from '../../../Components/Manager-HotelItem';
import { dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
import * as HostApi from '../../../api/ManagerApi';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function SelectHotel({ hotel, isSelect }) {
    const cx = classNames.bind(styles);
    const navigation = useNavigate();
    const handleSelect = () => {
        localStorage.setItem(
            'hotelSelected',
            JSON.stringify({
                hotelid: hotel.hotelId,
                hotelName: hotel.hotelName,
            }),
        );
        navigation('/manager/dashboard');
    };
    return (
        <div className={cx('body')}>
            <div className={cx('container')} onClick={() => handleSelect()}>
                <div>
                    <img src={hotel.photos[0].photoUrl} className={cx('MainImg')}></img>
                </div>
                <div className={cx('hotel-info')}>
                    <div className={cx('hotel-info-title')}>
                        <h3> {hotel.hotelName} </h3>
                        <h5 style={{ color: 'rgba(1,148,243,1.00)' }}> {hotel.totalRate} Điểm Ấn Tượng</h5>
                    </div>

                    <div className={cx('detailHotel_Type')}>
                        <div className={cx('hotelType')}>Khách sạn</div>
                        <div className={cx('star')}>
                            {[...Array(hotel.star)].map((e, i) => (
                                <i class="fa-solid fa-star"></i>
                            ))}
                        </div>
                    </div>
                    <div className={cx('detailHotel_Type')}>
                        <i className="fa-solid fa-location-dot" style={{ marginRight: 10 }}></i>
                        <span>{hotel.hotelAddress}</span>
                    </div>
                </div>
                <div className={cx('select')}>
                    <Radio checked={isSelect}> </Radio>
                </div>
            </div>
        </div>
    );
}
