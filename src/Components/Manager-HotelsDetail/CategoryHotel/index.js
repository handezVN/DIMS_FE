import styles from './index.module.scss';
import classNames from 'classnames/bind';
import * as Api from '../../../api/ManagerApi';
import { useEffect, useState } from 'react';

import CategoryType from './CategoryType';
import { useSelector } from 'react-redux';
import { notification } from 'antd';
export default function CategoryHotel({ hotelid }) {
    const [datas, setData] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const cx = classNames.bind(styles);
    const auth = JSON.parse(localStorage.getItem('user'));
    const getHotelCategory = () => {
        Api.getHotelCategory(auth.token, hotelid)
            .then((result) => setData(result))
            .catch((err) => console.log(err));
    };
    const loading = useSelector((state) => state.hostReducer.loading);
    useEffect(() => {
        if (!loading) {
            getHotelCategory();
        }
    }, [loading]);
    const handleDeleteCategory = (categoriID) => {
        if (window.confirm('Are you sure ?')) {
            Api.RemoveCategory(categoriID, auth.token)
                .then(() => {
                    openNotificationWithIcon('success', 'Success', 'Đã Xóa');
                    getHotelCategory();
                })
                .catch((err) => {
                    console.log(err);
                    openNotificationWithIcon(
                        'error',
                        'Failed',
                        'Phòng này đã được sử dụng nên bạn không thể xóa ! Hãy đọc hướng dẫn để xử lý tình huống này .',
                    );
                });
        }
    };
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    return (
        <div className={cx('body')}>
            <div className={cx('btn_newCategory')} onClick={() => setAddNew(!addNew)}>
                New Category
            </div>

            {addNew ? <CategoryType hotelId={hotelid} addnew={true}></CategoryType> : <></>}
            {datas.map((data) => {
                return (
                    <CategoryType
                        data={data}
                        hotelId={hotelid}
                        key={data.categoryId}
                        iconDelete={true}
                        handleDeleteCategory={handleDeleteCategory}
                    ></CategoryType>
                );
            })}
        </div>
    );
}
