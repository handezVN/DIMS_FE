import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import accountlogo from '../../../../asset/dp.jpg';
import { Divider } from 'antd';
import Icon from '@mdi/react';
import { mdiViewDashboard } from '@mdi/js';
import { useDispatch } from 'react-redux';
import { dispatchLogout } from '../../../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';
import { mdiHomeCity } from '@mdi/js';
import { mdiBriefcaseVariant } from '@mdi/js';
import { mdiChevronDown } from '@mdi/js';
import { mdiBedKing } from '@mdi/js';
import { mdiKey } from '@mdi/js';
export default function SlideBar({ SlideBar }) {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const handleLogout = () => {
        dispatch(dispatchLogout());
        navigation('/');
    };
    const hotelSelected = JSON.parse(localStorage.getItem('hotelSelected'));
    const [hotelshow, setHotelShow] = useState(false);
    return (
        <div className={cx(['SlideBar', SlideBar ? 'active' : 'unactive'])}>
            <div className={cx('SliderBar_Person')}>
                <div className={cx('SliderBar_Border_Avatar')}>
                    <img src={accountlogo} className={cx('SliderBar_Avatar')} alt="Avatar"></img>
                </div>
                <div className={cx('SliderBar_Person_Name')}>Handez</div>
                <div className={cx('SliderBar_Person_Role')}>Manager</div>
                <div className={cx('SliderBar_Person_Select')}>
                    <i className="fa-solid fa-user" title="Profile"></i>
                    <i className="fa-solid fa-gear" title="Settings"></i>
                    <i
                        className="fa-solid fa-arrow-right-from-bracket"
                        title="Logout"
                        onClick={() => handleLogout()}
                    ></i>
                </div>
            </div>
            <Divider>
                <div style={{ color: '#aaadb7' }}>Main</div>
            </Divider>
            <div className={cx('SlideBar_Container')}>
                <div className={cx('SlideBar_Item')}>
                    <div className={cx('SlideBar_Main_Item')}>
                        <div className={cx('d-flex')}>
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
                        <Icon
                            path={mdiChevronDown}
                            title="view-dashboard"
                            size={'20px'}
                            horizontal
                            vertical
                            rotate={180}
                        />
                    </div>
                </div>
                <div className={cx('SlideBar_Item', hotelshow ? 'Selected' : '')}>
                    <div className={cx('SlideBar_Main_Item')} onClick={() => setHotelShow(!hotelshow)}>
                        <div
                            className={cx('d-flex')}
                            onClick={() => navigation(`/mananger/hotels/detailHotels?hotelid=${hotelSelected.hotelid}`)}
                        >
                            <Icon
                                path={mdiHomeCity}
                                title="view-dashboard"
                                size={'20px'}
                                horizontal
                                vertical
                                rotate={180}
                            />
                            <div className={cx('SlideBar_Item_Title')}>Hotels</div>
                        </div>
                        <Icon
                            path={mdiChevronDown}
                            title="view-dashboard"
                            size={'20px'}
                            horizontal
                            vertical
                            rotate={180}
                        />
                    </div>
                    {hotelshow ? (
                        <div>
                            <div className={cx('SlideBar_Sub_Item')}>
                                <Icon
                                    path={mdiBedKing}
                                    title="view-dashboard"
                                    size={'20px'}
                                    horizontal
                                    vertical
                                    rotate={180}
                                />
                                <div className={cx('SlideBar_Item_Title')}>Category</div>
                            </div>
                            <div className={cx('SlideBar_Sub_Item')}>
                                <Icon
                                    path={mdiKey}
                                    title="view-dashboard"
                                    size={'20px'}
                                    horizontal
                                    vertical
                                    rotate={180}
                                />
                                <div className={cx('SlideBar_Item_Title')}>Rooms</div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className={cx('SlideBar_Item')}>
                    <div className={cx('SlideBar_Main_Item')}>
                        <div className={cx('d-flex')}>
                            <Icon
                                path={mdiBriefcaseVariant}
                                title="view-dashboard"
                                size={'20px'}
                                horizontal
                                vertical
                                rotate={180}
                            />
                            <div className={cx('SlideBar_Item_Title')}>Order</div>
                        </div>
                        <Icon
                            path={mdiChevronDown}
                            title="view-dashboard"
                            size={'20px'}
                            horizontal
                            vertical
                            rotate={180}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
