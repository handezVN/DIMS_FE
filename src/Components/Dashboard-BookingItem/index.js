import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Divider from 'antd/lib/divider';
export default function BookingItem({
    imgUrl,
    hotelName,
    hotelAddress,
    bookingId,
    startDate,
    endDate,
    categoryName,
    totalPrice,
}) {
    const cx = classNames.bind(styles);
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
                    <div>
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
                </div>
            </div>
        </div>
    );
}
