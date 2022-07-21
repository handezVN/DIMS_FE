import React from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';

export default function dashboard() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('body')}>
            <div className={cx('container')}>
                <div>Quản lý đơn hàng </div>
                <div className={cx('Booking')}>
                    {/* IMG */}
                    <div className={cx('Booking_Img')}>
                        <img
                            src="https://i.vntrip.vn/200x205/smart/https://statics.vntrip.vn/data-v2/hotels/616077/img_max/616077_1587351127_237696762.jpg"
                            alt="SPOT ON 726 SAKURA HOSTEL Saigon"
                        />
                    </div>
                    {/* Content */}
                    <div className={cx('Booking_Content')}>
                        <div className={cx('Booking_Content_left')}>
                            <div style={{ fontSize: '20px', fontWeight: '600' }}>Name</div>
                            <div>
                                <i class="fa-solid fa-location-dot"></i> Address
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('row_left')}>Mã Đơn Hàng:</div>
                                <div className={cx('row_right')} style={{ color: 'orange', fontWeight: '600' }}>
                                    Mã Đơn Hàng
                                </div>
                            </div>

                            <div className={cx('row')}>
                                <div className={cx('row_left')}>Nhận Phòng:</div>
                                <div className={cx('row_right')}>Mã Đơn Hàng</div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('row_left')}>Trả Phòng:</div>
                                <div className={cx('row_right')}>Mã Đơn Hàng</div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('row_left')}>Loại Phòng:</div>
                                <div className={cx('row_right')}>Mã Đơn Hàng</div>
                            </div>
                        </div>
                        {/* Total Price  */}
                        <div className={cx('Booking_Content_right')}>
                            <div>
                                <div>Total Price: </div>
                                200,000 VNĐ
                            </div>
                            <button>Quản Lý</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
