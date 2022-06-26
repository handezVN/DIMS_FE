import React, { useState, useEffect } from 'react';
import PaymentHeader from '../DefaultLayout/header';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import moment from 'moment';
export default function PaymentPage2() {
    const cx = classNames.bind(styles);
    const [img, setImg] = useState('');
    const [booking, setBooking] = useState({});
    const [viewInfo, setViewInfo] = useState(false);
    useEffect(() => {
        const stringif_booking = localStorage.getItem('booking');
        const parse_booking = JSON.parse(stringif_booking);
        const stringif_booking_info = localStorage.getItem('booking-info');
        const info = JSON.parse(stringif_booking_info);
        setImg(parse_booking.hotelImg[0].photoUrl);
        setBooking(parse_booking);
    }, []);
    const [method, setMethod] = useState('banking');
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
                                                method.match('banking') ? 'selection' : '',
                                            )}
                                            onClick={() => setMethod('banking')}
                                        >
                                            Chuyển khoản ngân hàng
                                        </button>
                                        <button
                                            className={cx(
                                                'inner-left-navbar-item',
                                                method.match('credit') ? 'selection' : '',
                                            )}
                                            onClick={() => setMethod('credit')}
                                        >
                                            Thẻ thanh toán
                                        </button>
                                    </div>
                                    <div className={cx('inner-left-content')}>
                                        <div className={cx('inner-left-content-title')}>Thông tin thanh toán</div>
                                        <div className={cx('inner-left-content-method')}>
                                            {method.match('banking') ? (
                                                <div>
                                                    <div className={cx('banking-title')}>
                                                        <h5>Chuyển khoản ngân hàng</h5>
                                                    </div>
                                                    <div className={cx('banking-note')}>
                                                        Bạn có thể chuyển tiền mặt tại quầy giao dịch hoặc chuyển khoản
                                                        qua Internet Banking và trạm ATM.
                                                    </div>
                                                    <div className={cx('banking-needread')}>
                                                        Lưu ý trước khi thanh toán
                                                    </div>
                                                    <div className={cx('banking-needread-content')}>
                                                        <ul>
                                                            <li>
                                                                Bạn cần phải nhập <b>mã chặt chỗ </b> vào mục
                                                                <b> Nội Dung Chuyển Khoản</b>.
                                                            </li>
                                                            <li>Phí chuyển khoản sẽ do người chuyển trả.</li>
                                                        </ul>
                                                    </div>
                                                    <div className={cx('banking-selection')}>
                                                        <div className={cx('banking-selection-title')}>
                                                            Chọn ngân hàng
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                            {method.match('credit') ? <div>Credit</div> : ''}
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
                                    </div>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={cx('inner-right-alert', 'alert')}>
                                Giá còn rẻ hơn khi nhập mã giảm giá (nếu có) ở bước sau
                            </div>
                        </div>
                    </div>
                    <div className={cx('step1-inner-alert')}></div>
                </div>
            </div>
        </div>
    );
}
