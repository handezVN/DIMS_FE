import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './index.module.scss';
import classNames from 'classnames/bind';

import Icon from '@mdi/react';

import { mdiChevronDown } from '@mdi/js';
import PhotosHotel from '../../../../Components/Manager-HotelsDetail/PhotosHotel';
import CategoryHotel from '../../../../Components/Manager-HotelsDetail/CategoryHotel';
import ShowRoomStatus from '../../../../Components/Manager-HotelsDetail/ShowRoomStatus';
export default function DetailHotels() {
    const cx = classNames.bind(styles);
    const [params] = useSearchParams();
    const hotelid = params.get('hotelid');
    const [showRoomStatus, setShowRoomStatus] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className={cx('Menu')} onClick={() => setShowRoomStatus(!showRoomStatus)}>
                View All Rooms Status{' '}
                <Icon path={mdiChevronDown} title="Delete Item" size={'30px'} horizontal vertical rotate={180} />
            </div>
            <div className={cx(['container', showRoomStatus ? 'active' : 'unActive'])}>
                <ShowRoomStatus hotelid={hotelid}></ShowRoomStatus>
            </div>
            <div className={cx('Menu')} onClick={() => setShowImage(!showImage)}>
                Show Image{' '}
                <Icon path={mdiChevronDown} title="Delete Item" size={'30px'} horizontal vertical rotate={180} />
            </div>
            <div className={cx(['container', showImage ? 'active' : 'unActive'])}>
                <PhotosHotel hotelid={hotelid}></PhotosHotel>
            </div>
            <div className={cx(['Menu'])} onClick={() => setShowCategory(!showCategory)}>
                Show Category{' '}
                <Icon path={mdiChevronDown} title="Delete Item" size={'30px'} horizontal vertical rotate={180} />
            </div>
            <div className={cx(['container', showCategory ? 'active' : 'unActive'])}>
                <CategoryHotel hotelid={hotelid}></CategoryHotel>
            </div>
        </div>
    );
}
