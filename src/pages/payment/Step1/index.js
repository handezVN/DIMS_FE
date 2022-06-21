import React, { useState } from 'react';
import PaymentHeader from '../DefaultLayout/header';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Checkbox } from 'antd';
export default function PaymentPage2() {
    const cx = classNames.bind(styles);
    const [takeroom, setTakeRoom] = useState(true);
    const [moreinfo, setMoreInfo] = useState(false);
    const [viewInfo, setViewInfo] = useState(false);
    return (
        <div>
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
                                    <select name="danh-xung" id="role" className={cx('step1-input')}>
                                        <option value="Man">Anh</option>
                                        <option value="Women">Chị</option>
                                        <option value="Other">Khác</option>
                                    </select>
                                </div>
                                <div className="col-8">
                                    <input className={cx('step1-input')} placeholder="Họ và Tên"></input>
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
                                    <input className={cx('step1-input')} placeholder="Số Điện Thoại"></input>
                                </div>
                                <div className="col-6">
                                    <input className={cx('step1-input')} placeholder="Email"></input>
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
                                        ></input>
                                    </div>
                                    <div className="col-6">
                                        <input
                                            className={cx('step1-input')}
                                            placeholder="Số điện thoại người nhận phòng"
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
                                    ></textarea>
                                </div>
                            </div>
                            <div className={cx('step1-btn')}>
                                <button> Tiếp Tục</button>
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
                                <img
                                    src="https://i.vntrip.vn/345x180/smart/https://statics.vntrip.vn/data-v2/hotels/9998/img_max/9998_1499317278_89369849.jpg"
                                    alt=""
                                ></img>
                                <div className={cx('inner-right-content')}>
                                    <div className={cx('inner-right-content-title')}>
                                        <b>
                                            <h5>Roseland Centa Hotel</h5>
                                        </b>
                                    </div>
                                    <div className={cx('row', 'inner-right-content-address')}>
                                        <div className={cx('inner-right-content-address-icon', 'col-1')}>
                                            <i class="fa-solid fa-location-dot"></i>
                                        </div>
                                        <div className="col-11">
                                            <span>
                                                15/1A-15A/57A Đường Lê Thánh Tôn, Phường Bến Nghé, Quận 1, Thành phố Hồ
                                                Chí Minh
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('inner-right-content-info')}>
                                        <div>
                                            <span>Ngày nhận phòng</span>
                                        </div>
                                        <div>
                                            <span>20-06-2022</span>
                                        </div>
                                    </div>
                                    <div className={cx('inner-right-content-info')}>
                                        <div>
                                            <span>Ngày trả phòng</span>
                                        </div>
                                        <div>
                                            <span>22-06-2022</span>
                                        </div>
                                    </div>
                                    <div className={cx('inner-right-content-info')}>
                                        <div>
                                            <span>Số đêm</span>
                                        </div>
                                        <div>
                                            <span>2 đêm</span>
                                        </div>
                                    </div>
                                    <div className={cx('inner-right-content-edit')}>Sửa</div>
                                    <div className={cx('inner-right-content-confirm')}>
                                        <div className={cx('inner-right-content-confirm-title')}>
                                            <div className={cx('inner-right-content-confirm-title-right')}>
                                                Phòng: Roseland Centa Hotel
                                            </div>
                                            <div>x1</div>
                                        </div>
                                        <div className={cx('inner-right-content-confirm-price')}>
                                            <div className={cx('inner-right-content-confirm-price-left')}>
                                                Giá từ khách sạn
                                            </div>
                                            <div className={cx('inner-right-content-confirm-price-right')}>
                                                3.076.000₫
                                            </div>
                                        </div>
                                        <div>(Đã bao gồm phí dịch vụ khách sạn)</div>
                                        <div className={cx('inner-right-content-confirm-saleoff')}>
                                            <div className={cx('inner-right-content-confirm-saleoff-left')}>
                                                + Khuyến mại
                                            </div>
                                            <div className={cx('inner-right-content-confirm-saleoff-right')}>
                                                922.800₫
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div className={cx('inner-right-content-confirm-total')}>
                                            <div className={cx('inner-right-content-confirm-total-left')}>
                                                Tổng cộng:
                                            </div>
                                            <div className={cx('inner-right-content-confirm-total-right')}>
                                                2.153.200₫
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
