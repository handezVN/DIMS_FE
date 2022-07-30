import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

import Icon from '@mdi/react';

import { mdiChevronDown } from '@mdi/js';
import PhotosHotel from '../../../../Components/Manager-HotelsDetail/PhotosHotel';
import CategoryHotel from '../../../../Components/Manager-HotelsDetail/CategoryHotel';
import ShowRoomStatus from '../../../../Components/Manager-HotelsDetail/ShowRoomStatus';
import CategoryPrice from '../../../../Components/Manager-HotelsDetail/PriceUpdate';
export default function DetailHotels() {
    const cx = classNames.bind(styles);
    const [params] = useSearchParams();
    const hotelid = params.get('hotelid');
    const categoryShow = params.get('categoryShow');
    const roomShow = params.get('roomShow');
    const photoShow = params.get('photoShow');
    const [showRoomStatus, setShowRoomStatus] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    useEffect(() => {
        if (categoryShow) {
            setShowCategory(categoryShow);
            scrolltoItem('category');
        }
        if (roomShow) {
            setShowRoomStatus(roomShow);
            scrolltoItem('rooms');
        }
        if (photoShow) {
            setShowImage(photoShow);
            scrolltoItem('photos');
        }
    }, [categoryShow, roomShow]);
    const scrolltoItem = (item) => {
        const e = document.getElementById(item);
        e.scrollIntoView();
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={cx('Menu')} onClick={() => setShowRoomStatus(!showRoomStatus)} id="rooms">
                View All Rooms Status{' '}
                <Icon path={mdiChevronDown} title="Delete Item" size={'30px'} horizontal vertical rotate={180} />
            </div>
            <div className={cx(['container', showRoomStatus ? 'active' : 'unActive-left'])}>
                <ShowRoomStatus hotelId={hotelid}></ShowRoomStatus>
            </div>
            <div className={cx('Menu')} onClick={() => setShowImage(!showImage)} id="photos">
                Image <Icon path={mdiChevronDown} title="Delete Item" size={'30px'} horizontal vertical rotate={180} />
            </div>
            <div className={cx(['container', showImage ? 'active' : 'unActive-right'])}>
                <PhotosHotel hotelid={hotelid}></PhotosHotel>
            </div>
            <div className={cx(['Menu'])} onClick={() => setShowCategory(!showCategory)} id="category">
                Category{' '}
                <Icon path={mdiChevronDown} title="Delete Item" size={'30px'} horizontal vertical rotate={180} />
            </div>
            <div className={cx(['container', showCategory ? 'active-bottom' : 'unActive-bottom'])}>
                <CategoryHotel hotelid={hotelid}></CategoryHotel>
            </div>
            <div className={cx(['Menu'])} onClick={() => setShowCalendar(!showCalendar)} id="category">
                Price Update{' '}
                <Icon path={mdiChevronDown} title="Delete Item" size={'30px'} horizontal vertical rotate={180} />
            </div>
            <div className={cx(['container', showCalendar ? 'active-bottom' : 'unActive-bottom'])}>
                <CategoryPrice></CategoryPrice>
            </div>
        </div>
    );
}
