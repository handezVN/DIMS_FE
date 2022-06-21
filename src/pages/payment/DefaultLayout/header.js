import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import logo from './vntrip.png';

export default function PaymentHeader(props) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('header')}>
            <div className={cx('container')}>
                <div className={cx('header_inner')}>
                    <img src={logo} alt=""></img>
                    <div className={cx('header-right')}>
                        <div
                            className={cx(
                                'step-item',
                                props.step1 || props.step2 || props.step3 ? 'step-item-active' : '',
                            )}
                        >
                            <div className={cx('step-checkbox')}>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <span>1. Thông tin đặt phòng</span>
                        </div>
                        <div className={cx('step-space')}></div>
                        <div className={cx('step-item', props.step2 || props.step3 ? 'step-item-active' : '')}>
                            <div className={cx('step-checkbox')}>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <span>2. Thanh toán</span>
                        </div>
                        <div className={cx('step-space')}></div>
                        <div className={cx('step-item', props.step3 ? 'step-item-active' : '')}>
                            <div className={cx('step-checkbox')}>
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <span>3. Hoàn tất</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
