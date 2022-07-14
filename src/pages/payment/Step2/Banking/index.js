import React, { useState } from 'react';
import BankingMethod from './BankingMethod';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Switch from 'antd/lib/switch';
export default function Banking() {
    const cx = classNames.bind(styles);
    const [selectBank, setBank] = useState('1');
    const [show, setShow] = useState(false);
    const [inputCoupon, setInputCoupon] = useState('');
    const navigator = useNavigate();
    const handlePayMent = () => {
        navigator('/payment/step3');
    };
    return (
        <div>
            {' '}
            <div>
                <div className={cx('banking-title')}>
                    <h5>Chuyển khoản ngân hàng</h5>
                </div>
                <div className={cx('banking-note')}>
                    Bạn có thể chuyển tiền mặt tại quầy giao dịch hoặc chuyển khoản qua Internet Banking và trạm ATM.
                </div>
                <div className={cx('banking-needread')}>Lưu ý trước khi thanh toán</div>
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
                    <div className={cx('banking-selection-title')}>Chọn ngân hàng</div>

                    <button className={cx('banking-selection-items')} onClick={() => setBank('1')}>
                        <BankingMethod
                            name="VietComBank"
                            logo="http://dangkylogo.net/wp-content/uploads/2013/08/vietcombank-dang-ky-bao-ho-logo.png"
                            selection={selectBank === '1' ? true : false}
                        ></BankingMethod>
                    </button>
                    <button className={cx('banking-selection-items')} onClick={() => setBank('2')}>
                        <BankingMethod
                            name="TpBank"
                            logo="https://cdn.haitrieu.com/wp-content/uploads/2022/02/Logo-TPBank.png"
                            selection={selectBank === '2' ? true : false}
                        ></BankingMethod>
                    </button>
                    <button className={cx('banking-selection-items')} onClick={() => setBank('3')}>
                        <BankingMethod
                            name="MB Bank"
                            logo="https://web2s.vn/files/uploads/2022/02/logo-mbbanksd.png"
                            selection={selectBank === '3' ? true : false}
                        ></BankingMethod>
                    </button>
                </div>
                <hr></hr>
                <div className={cx('banking-coupon')}>
                    <Switch checked={show} onChange={() => setShow(!show)} /> Thêm mã Coupon
                </div>
                <div className={cx('banking-usecoupon', show ? '' : 'hidden')}>
                    <input
                        className={cx('banking-coupon-input')}
                        placeholder="EXAMPLE : CHEAPTRAVEL"
                        onChange={(e) => setInputCoupon(e.target.value)}
                    ></input>
                    <button className={cx('banking-coupon-input-btn', inputCoupon.length > 0 ? 'active' : 'disable')}>
                        Use Coupon
                    </button>
                </div>
                <div className={cx('banking-payment')}>
                    <button onClick={handlePayMent}> Thanh Toán </button>
                </div>
            </div>
        </div>
    );
}
