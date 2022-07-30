import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Calendar } from 'antd';
import moment from 'moment';
import { DatePicker } from 'antd';
import * as Api from '../../../api/ManagerApi';
export default function CategoryPrice() {
    const { RangePicker } = DatePicker;
    const cx = classNames.bind(styles);
    const [listSelected, setListSelected] = useState([]);
    const handleAddDate = (date) => {
        if (listSelected.includes(moment(date._d).format('YYYY-MM-DD'))) {
            const newList = listSelected.filter((e) => e !== moment(date._d).format('YYYY-MM-DD'));
            setListSelected(newList);
        } else {
            setListSelected([...listSelected, moment(date._d).format('YYYY-MM-DD')]);
        }
    };
    const [listCategory, setListCategory] = useState([]);
    const hotel = JSON.parse(localStorage.getItem('hotelSelected'));
    const auth = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        Api.getListCategory(hotel.hotelid, auth.token).then((data) => setListCategory(data));
    }, []);
    return (
        <div className={cx('body')}>
            <div>Cài Đặt Giá Cho Các Ngày Xác Định </div>
            <div className={cx('row')}>
                <div className={cx('datepicker')}>Khoảng Thời Gian</div>
                <div className={cx('categoryList')}>Loại Phòng</div>
                <div className={cx('PriceList')}>Giá phòng</div>
            </div>
            <div className={cx('row')}>
                <div className={cx('datepicker')}>
                    <RangePicker
                        dateRender={(current) => {
                            return <div className="ant-calendar-date">{current.date()}</div>;
                        }}
                    />
                </div>
                <div className={cx('categoryList')}>
                    {listCategory.map((e) => {
                        return <div>{e.categoryName}</div>;
                    })}
                </div>
                <div className={cx('PriceList')}>
                    {listCategory.map((e) => {
                        return (
                            <div>
                                <input type={'number'} className={cx('inputPrice')}></input>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
