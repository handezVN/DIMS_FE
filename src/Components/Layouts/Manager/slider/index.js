import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import accountlogo from '../../../../asset/dp.jpg';
import { Divider } from 'antd';
import Icon from '@mdi/react';
import { mdiViewDashboard } from '@mdi/js';
import { useDispatch } from 'react-redux';
import { dispatchLogout } from '../../../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

export default function SlideBar() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const handleLogout = () => {
        dispatch(dispatchLogout());
        navigation('/');
    };
    return (
        <div className={cx('SlideBar')}>
            <div className={cx('SliderBar_Person')}>
                <div className={cx('SliderBar_Border_Avatar')}>
                    <img src={accountlogo} className={cx('SliderBar_Avatar')}></img>
                </div>
                <div className={cx('SliderBar_Person_Name')}>Handez</div>
                <div className={cx('SliderBar_Person_Role')}>Manager</div>
                <div className={cx('SliderBar_Person_Select')}>
                    <i class="fa-solid fa-user" title="Profile"></i>
                    <i class="fa-solid fa-gear" title="Settings"></i>
                    <i class="fa-solid fa-arrow-right-from-bracket" title="Logout" onClick={() => handleLogout()}></i>
                </div>
            </div>
            <Divider>
                <div style={{ color: '#aaadb7' }}>Main</div>
            </Divider>
            <div className={cx('SlideBar_Container')}>
                <div className={cx('SlideBar_Item')}>
                    <Icon
                        path={mdiViewDashboard}
                        title="view-dashboard"
                        size={'20px'}
                        horizontal
                        vertical
                        rotate={180}
                    />
                    <div className={cx('SlideBar_Item_Title')}>DashBoard</div>
                </div>
            </div>
        </div>
    );
}
