import styles from './index.module.scss';
import classNames from 'classnames/bind';
import * as Api from '../../../api/ManagerApi';
import { useEffect, useState } from 'react';

import CategoryType from './CategoryType';
import { useSelector } from 'react-redux';
export default function CategoryHotel({ hotelid }) {
    const [datas, setData] = useState([]);
    const [addNew, setAddNew] = useState(false);
    const cx = classNames.bind(styles);
    const getHotelCategory = () => {
        const auth = JSON.parse(localStorage.getItem('user'));
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
    return (
        <div className={cx('body')}>
            <div className={cx('btn_newCategory')} onClick={() => setAddNew(!addNew)}>
                New Category
            </div>

            {addNew ? <CategoryType hotelId={hotelid} addnew={true}></CategoryType> : <></>}
            {datas.map((data) => {
                return (
                    <CategoryType data={data} hotelId={hotelid} key={data.categoryId} iconDelete={true}></CategoryType>
                );
            })}
        </div>
    );
}
