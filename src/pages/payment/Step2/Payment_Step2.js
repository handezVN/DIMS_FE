import React, { useState, useEffect } from 'react';
import PaymentHeader from '../DefaultLayout/header';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import moment from 'moment';
import Banking from './Banking';
import { Link } from 'react-router-dom';
import CreditCard from './Credit';
export default function PaymentPage2() {
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
    const [method, setMethod] = useState('credit');

    return (
        <div>
            <div className={cx('reset-css')}>
                <PaymentHeader step2="true"></PaymentHeader>
                <div className={cx('mobile')} onClick={() => setViewInfo(true)}>
                    Thông tin đơn phòng <i class="fa-solid fa-angle-down"></i>
                </div>
                <div className="container">
                    <div className={cx('step1-inner')}>
                        <div className={cx('inner-left')}>
                            <div className={cx('inner-left-container')}>
                                <div className="d-flex">
                                    <div className={cx('inner-left-navbar')}>
                                        <div className={cx('inner-left-navbar-title')}>PayMent Method</div>
                                        
                                        <button
                                            className={cx(
                                                'inner-left-navbar-item',
                                                method.match('credit') ? 'selection' : '',
                                            )}
                                            onClick={() => setMethod('credit')}
                                        >
                                            Thẻ thanh toán
                                        </button>
                                        <button
                                            className={cx(
                                                'inner-left-navbar-item',
                                                method.match('banking') ? 'selection' : '',
                                            )}
                                            onClick={() => setMethod('banking')}
                                        >
                                            Chuyển khoản ngân hàng
                                        </button>
                                    </div>
                                    <div className={cx('inner-left-content')}>
                                        <div className={cx('inner-left-content-title')}>Thông tin thanh toán</div>
                                        <div className={cx('inner-left-content-method')}>
                                            {method.match('credit') ? <CreditCard></CreditCard> : ''}
                                            {method.match('banking') ? <Banking></Banking> : ''}
                                        </div>
                                    </div>
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
                                                {moment(booking.date)
                                                    .subtract(-booking.night, 'days')
                                                    .format('DD-MM-YYYY')}
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
                                            <div className={cx('inner-right-content-confirm-total-left')}>
                                                Tổng cộng:
                                            </div>
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
                                                <Link className={cx('bookinguser-btnedit')} to={'/payment/step1'}>
                                                    Sửa
                                                </Link>
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
        </div>
    );
}
