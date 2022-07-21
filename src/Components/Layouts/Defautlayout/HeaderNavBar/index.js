import React from 'react';
import styles from './HeaderNavBar.module.scss';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
export default function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('navbar', 'row')}>
                    <div className={cx('col-4', 'page-navigator')}>
                        <NavLink to="/" className={cx('nav', (isActive) => (!isActive ? ' active' : ''))}>
                            <span>Tìm Nhanh</span>
                        </NavLink>
                    </div>
                    <div className={cx('col-4', 'page-navigator')}>
                        <NavLink to="/hotels" className={cx('nav', (isActive) => (!isActive ? ' active' : ''))}>
                            <span>Khách Sạn</span>
                        </NavLink>
                    </div>
                    <div className={cx('col-4', 'page-navigator')}>
                        <NavLink to="/dashboard" className={cx('nav', (isActive) => (!isActive ? ' active' : ''))}>
                            <span>Đơn Hàng</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
}
