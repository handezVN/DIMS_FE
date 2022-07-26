import React, { useState, useEffect } from 'react';
import PaymentHeader from '../DefaultLayout/header';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import moment from 'moment';
import { Link } from 'react-router-dom';
export default function PaymentPage3() {
    const cx = classNames.bind(styles);
    const [img, setImg] = useState('');
    const [booking, setBooking] = useState({});
    const [viewInfo, setViewInfo] = useState(false);
    const [bookinguser, setBooingUser] = useState('');
    useEffect(() => {
        const stringif_booking = localStorage.getItem('booking');
        const parse_booking = JSON.parse(stringif_booking);
        const stringif_booking_info = localStorage.getItem('booking-info');
        const info = JSON.parse(stringif_booking_info);
        setBooingUser(info);
        setImg(parse_booking.hotelImg[0].photoUrl);
        setBooking(parse_booking);
    }, []);
    return (
        <div>
            <PaymentHeader step3="true"></PaymentHeader>
            <div className="container">
                <div className={cx('step1-inner')}>
                    <div className={cx('inner-left')}>
                        <div className={cx('inner-left-container')}>
                            <div className={cx('Confirm-massage')}>
                                <div>
                                    <i
                                        class="fa-solid fa-circle-check"
                                        style={{ fontSize: '100px', color: 'green' }}
                                    ></i>
                                </div>
                                <div
                                    style={{
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Xác nhận thanh toán thành công{' '}
                                </div>
                                <div>Vui Lòng Kiểm Tra Email Của Bạn !</div>
                                <Link to={'/dashboard'}>
                                    <div className={cx('myBooked')}>Đặt Chỗ Của Tôi !</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={cx('inner-right', viewInfo ? 'inner-right-open' : '')}>
                        <div className={cx('headerPopup')}>
                            Thông tin đơn phòng
                            <button style={{ border: 'none', backgroundColor: '#1890ff' }}>
                                <i
                                    class="fa-solid fa-xmark"
                                    style={{ padding: 10 }}
                                    onClick={() => setViewInfo(!viewInfo)}
                                ></i>
                            </button>
                        </div>
                        <div className={cx('inner-right-img')}>
                            <img src={img} alt=""></img>
                            <div className={cx('inner-right-content')}>
                                <div className={cx('inner-right-content-title')}>
                                    <b>
                                        <h5>{booking.hotelname}</h5>
                                    </b>
                                </div>
                                <div className={cx('row', 'inner-right-content-address')}>
                                    <div className={cx('inner-right-content-address-icon', 'col-1')}>
                                        <i class="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div className="col-11">
                                        <span>{booking.hotelAddress}</span>
                                    </div>
                                </div>
                                <div className={cx('inner-right-content-info')}>
                                    <div>
                                        <span>Ngày nhận phòng</span>
                                    </div>
                                    <div>
                                        <span>{moment(booking.date).format('DD-MM-YYYY')}</span>
                                    </div>
                                </div>
                                <div className={cx('inner-right-content-info')}>
                                    <div>
                                        <span>Ngày trả phòng</span>
                                    </div>
                                    <div>
                                        <span>
                                            {moment(booking.date).subtract(-booking.night, 'days').format('DD-MM-YYYY')}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('inner-right-content-info')}>
                                    <div>
                                        <span>Số đêm</span>
                                    </div>
                                    <div>
                                        <span>{booking.night} đêm</span>
                                    </div>
                                </div>

                                <div className={cx('inner-right-content-confirm')}>
                                    <div className={cx('inner-right-content-confirm-title')}>
                                        <div className={cx('inner-right-content-confirm-title-right')}>
                                            Phòng: {booking.title}
                                        </div>
                                        <div>x1</div>
                                    </div>
                                    <div className={cx('inner-right-content-confirm-price')}>
                                        <div className={cx('inner-right-content-confirm-price-left')}>
                                            Giá từ khách sạn
                                        </div>
                                        <div className={cx('inner-right-content-confirm-price-right')}>
                                            {(booking.price * 1000 * 1.5).toLocaleString(undefined, {
                                                maximumFractionDigits: 0,
                                            })}
                                            ₫
                                        </div>
                                    </div>
                                    <div>(Đã bao gồm phí dịch vụ khách sạn)</div>
                                    <div className={cx('inner-right-content-confirm-saleoff')}>
                                        <div className={cx('inner-right-content-confirm-saleoff-left')}>
                                            + Khuyến mại
                                        </div>
                                        <div className={cx('inner-right-content-confirm-saleoff-right')}>
                                            {(booking.price * 1000 * 0.5).toLocaleString(undefined, {
                                                maximumFractionDigits: 0,
                                            })}
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className={cx('inner-right-content-confirm-total')}>
                                        <div className={cx('inner-right-content-confirm-total-left')}>Tổng cộng:</div>
                                        <div className={cx('inner-right-content-confirm-total-right')}>
                                            {(booking.price * 1000 * 1).toLocaleString(undefined, {
                                                maximumFractionDigits: 0,
                                            })}
                                            ₫
                                        </div>
                                    </div>
                                    <div>(Đã bao gồm thuế VAT)</div>
                                    <hr></hr>
                                    <div>
                                        <div className={cx('bookinguser-title')}>
                                            <div>Thông tin đặt phòng</div>{' '}
                                        </div>
                                        <div className={cx('bookinguser-info')}>
                                            <div className={cx('bookinguser-info-left')}>Người đặt phòng</div>
                                            <div className={cx('bookinguser-info-right')}>{bookinguser.name}</div>
                                        </div>
                                        <div className={cx('bookinguser-info')}>
                                            <div className={cx('bookinguser-info-left')}>Số điện thoại</div>
                                            <div className={cx('bookinguser-info-right')}>{bookinguser.number}</div>
                                        </div>
                                        <div className={cx('bookinguser-info')}>
                                            <div className={cx('bookinguser-info-left')}>Email</div>
                                            <div className={cx('bookinguser-info-right')}>{bookinguser.email}</div>
                                        </div>
                                        <div className={cx('bookinguser-info')}>
                                            <div className={cx('bookinguser-info-left')}>Người nhận phòng</div>
                                            <div className={cx('bookinguser-info-right')}>
                                                {bookinguser.name2 ? bookinguser.name2 : bookinguser.name}
                                            </div>
                                        </div>
                                        <div className={cx('bookinguser-info')}>
                                            <div className={cx('bookinguser-info-left')}>Số điện thoại</div>
                                            <div className={cx('bookinguser-info-right')}>
                                                {bookinguser.number2 ? bookinguser.number2 : bookinguser.number}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('step1-inner-alert')}></div>
            </div>
        </div>
    );
}
