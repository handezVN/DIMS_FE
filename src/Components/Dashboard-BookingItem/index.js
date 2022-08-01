import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Divider from 'antd/lib/divider';
import { Modal, Button } from 'antd';
import Icon from '@mdi/react';
import { mdiQrcode } from '@mdi/js';
export default function BookingItem({
    imgUrl,
    hotelName,
    hotelAddress,
    bookingId,
    startDate,
    endDate,
    categoryName,
    totalPrice,
    qrCode,
}) {
    const cx = classNames.bind(styles);
    function info() {
        Modal.info({
            title: 'QR Code to Check In Hotel',
            content: <img src={qrCode} style={{ height: 270, width: 270 }}></img>,
            onOk() {},
        });
    }
    return (
        <div className={cx('Booking')}>
            {/* IMG */}
            <div className={cx('Booking_Img')}>
                <img src={imgUrl} alt={hotelName} />
            </div>
            {/* Content */}
            <div className={cx('Booking_Content')}>
                <div className={cx('Booking_Content_left')}>
                    <div style={{ fontSize: '20px', fontWeight: '600' }}>{hotelName}</div>
                    <div className={cx('Hotel_Address')}>
                        <i class="fa-solid fa-location-dot"></i> {hotelAddress}
                    </div>
                    <Divider></Divider>
                    <div className={cx('row')}>
                        <div className={cx('row_left')}>Mã Đơn Hàng:</div>
                        <div className={cx('row_right')} style={{ color: 'orange', fontWeight: '600' }}>
                            DIMS000{bookingId}
                        </div>
                    </div>

                    <div className={cx('row')}>
                        <div className={cx('row_left')}>Nhận Phòng:</div>
                        <div className={cx('row_right')}>{startDate}</div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('row_left')}>Trả Phòng:</div>
                        <div className={cx('row_right')}>{endDate}</div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('row_left')}>Loại Phòng:</div>
                        <div className={cx('row_right')}>{categoryName}</div>
                    </div>
                </div>
                {/* Total Price  */}
                <div className={cx('Booking_Content_right')}>
                    <div>
                        <div>Total Price: </div>
                        <div className={cx('Booking_Content_right_money')}>
                            {(totalPrice * 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} VNĐ
                        </div>
                    </div>
                    {/* <button>Quản Lý</button> */}
                    <div>
                        <Icon
                            path={mdiQrcode}
                            size={'40px'}
                            aria-label="QR Code"
                            onClick={info}
                            style={{ cursor: 'pointer' }}
                        ></Icon>
                    </div>
                </div>
            </div>
        </div>
    );
}
