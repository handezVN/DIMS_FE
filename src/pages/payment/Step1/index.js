import React, { useEffect, useState } from 'react';
import PaymentHeader from '../DefaultLayout/header';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import moment from 'moment';
import { Checkbox, notification } from 'antd';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPopup from '../../../Components/Layouts/LoginPopup';
export default function PaymentPage2() {
    const cx = classNames.bind(styles);
    const [takeroom, setTakeRoom] = useState(true);
    const [moreinfo, setMoreInfo] = useState(false);
    const [viewInfo, setViewInfo] = useState(false);
    const [booking, setBooking] = useState({});
    const navigator = useNavigate();
    const [role, setRole] = useState('Man');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [specicalSuggest, setSpecicalSuggest] = useState('');
    const [name2, setName2] = useState('');
    const [number2, setNumber2] = useState('');
    const [img, setImg] = useState('');
    const islogged = useSelector((state) => state.auth.isLogged);
    console.log(islogged);
    useEffect(() => {
        const stringif_booking = localStorage.getItem('booking');
        const parse_booking = JSON.parse(stringif_booking);
        const stringif_booking_info = localStorage.getItem('booking-info');
        const info = JSON.parse(stringif_booking_info);
        console.log(parse_booking);
        if (info) {
            setName(info.name);
            setNumber(info.number);
            setEmail(info.email);
            setRole(info.role);
            setBooking(parse_booking);
            setImg(parse_booking.hotelImg[0].photoUrl);
        }
        setBooking(parse_booking);
        // localStorage.removeItem('booking');
    }, []);
    const handleSubmit = () => {
        let flag = true;
        let msg = '';
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (name.length < 1) {
            flag = false;
            msg = msg + 'Tên vui lòng không để trống !';
        }
        if (number.length > 11 || number.length < 10) {
            flag = false;
            msg = msg + 'Số điện thoại của bạn không được tìm thấy tại Việt Nam ! ';
        }
        if (!filter.test(email)) {
            flag = false;
            msg = msg + 'Please provide a valid email address !';
        }
        if (flag) {
            const newState = {
                role: role,
                name: name,
                email: email,
                number: number,
                specicalSuggest: specicalSuggest,
                name2: name2,
                number2: number2,
            };
            localStorage.setItem('booking-info', JSON.stringify(newState));
            navigator('/payment/step2');
        } else {
            openNotificationWithIcon('warning', 'Warning', msg);
        }
    };
    const openNotificationWithIcon = (type, title, content) => {
        notification[type]({
            message: title,
            description: content,
            placement: 'topLeft',
        });
    };
    return (
        <div>
            {booking ? (
                <div className={cx('reset-css')}>
                    <PaymentHeader step1="true"></PaymentHeader>
                    <div className={cx('mobile')} onClick={() => setViewInfo(true)}>
                        Thông tin đơn phòng <i class="fa-solid fa-angle-down"></i>
                    </div>
                    <div className="container">
                        <div className={cx('step1-inner')}>
                            <div className={cx('inner-left')}>
                                <h2>Thông tin đặt phòng</h2>
                                <h6>Thông tin người đặt phòng</h6>
                                <hr></hr>
                                <div className={cx('row', 'step1-content')}>
                                    <div className="col-4">
                                        Danh Xưng <b style={{ color: 'red' }}>*</b>
                                    </div>
                                    <div className="col-8">
                                        Họ và Tên <b style={{ color: 'red' }}>*</b>
                                    </div>
                                </div>
                                <div className={cx('row', 'step1-content')}>
                                    <div className="col-4">
                                        <select
                                            name="danh-xung"
                                            id="role"
                                            className={cx('step1-input')}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="Man">Anh</option>
                                            <option value="Women" selected={role === 'Women'}>
                                                Chị
                                            </option>
                                        </select>
                                    </div>
                                    <div className="col-8">
                                        <input
                                            className={cx('step1-input')}
                                            placeholder="Họ và Tên"
                                            onChange={(e) => {
                                                setName(e.target.value);
                                            }}
                                            value={name}
                                        ></input>
                                    </div>
                                </div>
                                <div className={cx('row', 'step1-content')}>
                                    <div className="col-6">
                                        Số điện thoại <b style={{ color: 'red' }}>*</b>
                                    </div>
                                    <div className="col-6">
                                        Email <b style={{ color: 'red' }}>*</b>
                                    </div>
                                </div>
                                <div className={cx('row', 'step1-content')}>
                                    <div className="col-6">
                                        <input
                                            className={cx('step1-input')}
                                            placeholder="Số Điện Thoại"
                                            onChange={(e) => {
                                                setNumber(e.target.value);
                                            }}
                                            value={number}
                                        ></input>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            className={cx('step1-input')}
                                            placeholder="Email"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                            value={email}
                                        ></input>
                                    </div>
                                </div>
                                <Checkbox defaultChecked onChange={() => setTakeRoom(!takeroom)}>
                                    Tôi là người nhận phòng
                                </Checkbox>
                                <div className={cx(takeroom ? 'hidden' : 'display')}>
                                    <br></br>
                                    Thông tin người nhận phòng
                                    <hr></hr>
                                    <div className={cx('row', 'step1-content')}>
                                        <div className="col-6">
                                            Họ và Tên <b style={{ color: 'red' }}>*</b>
                                        </div>
                                        <div className="col-6">
                                            Số điện thoại <b style={{ color: 'red' }}>*</b>
                                        </div>
                                    </div>
                                    <div className={cx('row', 'step1-content')}>
                                        <div className="col-6">
                                            <input
                                                className={cx('step1-input')}
                                                placeholder="Họ và Tên người nhận phòng"
                                                onChange={(e) => {
                                                    setName2(e.target.value);
                                                }}
                                            ></input>
                                        </div>
                                        <div className="col-6">
                                            <input
                                                className={cx('step1-input')}
                                                placeholder="Số điện thoại người nhận phòng"
                                                onChange={(e) => {
                                                    setNumber2(e.target.value);
                                                }}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <button className={cx('step1-another-info')} onClick={() => setMoreInfo(!moreinfo)}>
                                    Thông tin khác <i class="fa-solid fa-angle-down"></i>
                                </button>
                                <div className={cx(moreinfo ? 'display' : 'hidden')}>
                                    <div className={cx('step1-content')}>
                                        <b>Chính Sách Hủy Phòng</b>
                                        <br></br>
                                        Không hoàn không hủy
                                    </div>
                                    <div className={cx('step1-content')}>
                                        <b>Yêu cầu Đặc Biệt</b>
                                        <br></br>
                                        <textarea
                                            placeholder="Yêu cầu đặc biệt"
                                            className={cx('step-another-info-specical')}
                                            onChange={(e) => {
                                                setSpecicalSuggest(e.target.value);
                                            }}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className={cx('step1-btn')}>
                                    <button onClick={handleSubmit}> Tiếp Tục</button>
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
                                                <span>14:00 {moment(booking.date).format('DD-MM-YYYY')}</span>
                                            </div>
                                        </div>
                                        <div className={cx('inner-right-content-info')}>
                                            <div>
                                                <span>Ngày trả phòng</span>
                                            </div>
                                            <div>
                                                <span>
                                                    12:00{' '}
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
                                            {booking.title ? (
                                                booking.title.map((title, index) => {
                                                    return (
                                                        <div className={cx('inner-right-content-confirm-title')}>
                                                            <div
                                                                className={cx(
                                                                    'inner-right-content-confirm-title-right',
                                                                )}
                                                            >
                                                                Phòng: {title}
                                                            </div>
                                                            <div>x {booking.roomQuantity[index]}</div>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <></>
                                            )}

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
            ) : (
                <Result
                    title="Your operation has been executed"
                    extra={
                        <Button type="primary" key="console" onClick={() => navigator(-1)}>
                            Go Back To Hotel
                        </Button>
                    }
                />
            )}
            {islogged ? '' : <LoginPopup />}
        </div>
    );
}
