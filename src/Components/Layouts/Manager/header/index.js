import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Input, Menu, Dropdown, Icon } from 'antd';
import accountlogo from '../../../../asset/dp.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { dispatchLogout } from '../../../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../asset/Logo-ver2.png';
export default function Header({ slidebar, setSlideBar }) {
    const cx = classNames.bind(styles);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { Search } = Input;
    const handleLogout = () => {
        if (window.confirm('Are you sure ?')) {
            dispatch(dispatchLogout());
            navigation('/');
        } else {
            console.log('No');
        }
    };
    const menu = (
        <Menu>
            <Menu.Item>
                <div className={cx('dropdown_item')}>
                    <Icon type="user" /> Profile
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className={cx('dropdown_item')}>
                    <Icon type="setting" />
                    Settings
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className={cx('dropdown_item')} onClick={handleLogout}>
                    <Icon type="logout" />
                    Logout
                </div>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={cx('header')}>
            <div className={cx('header__inner')}>
                <div
                    className={cx(['slide-bar', slidebar ? 'active' : 'unactive'])}
                    onClick={() => setSlideBar(!slidebar)}
                ></div>
                <div className={cx('header-container')}>
                    <img src={logo} alt=""></img>
                    <div>
                        <Dropdown overlay={menu} className={cx('header_account')}>
                            <div>
                                <img alt="" src={accountlogo} className={cx('header_avatar', 'img-circle ')} />
                                Handez
                                <i className="fa-solid fa-chevron-down"></i>
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
