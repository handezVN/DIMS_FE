import styles from './index.module.scss';
import classNames from 'classnames/bind';
import * as Api from '../../../api/ManagerApi';
import { useEffect, useState } from 'react';

import CategoryType from './CategoryType';
export default function CategoryHotel({ hotelid }) {
    const [datas, setData] = useState([]);

    const cx = classNames.bind(styles);
    const getHotelCategory = () => {
        const auth = JSON.parse(localStorage.getItem('user'));
        Api.getHotelCategory(auth.token, hotelid)
            .then((result) => setData(result))
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        getHotelCategory();
    }, []);
    return (
        <div className={cx('body')}>
            {datas.map((data) => {
                return <CategoryType data={data} hotelId={hotelid} key={data.categoryId}></CategoryType>;
            })}
        </div>
    );
}
