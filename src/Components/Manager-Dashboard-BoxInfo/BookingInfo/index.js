import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import Icon from '@mdi/react';
import { mdiClose, mdiHome, mdiPencil, mdiPlus, mdiTrashCan, mdiWalletTravel } from '@mdi/js';
import moment from 'moment';
import { Modal, notification, Select, Option } from 'antd';
import { set } from 'date-fns';

export default function BookingInfo({ data, handleClose }) {
    const cx = classNames.bind(styles);
    const { confirm } = Modal;
    const { Option } = Select;
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    const [totalExtraFee, setTotalExtraFee] = useState(0);
    useEffect(() => {
        let extraTmp = 0;
        data.bookingDetails.map((e) => {
            extraTmp = extraTmp + e.extraFee;
        });
        setTotalExtraFee(extraTmp);
    }, [data]);
    console.log(data);
    return (
        <div className={cx('body')}>
            <div className={cx('title')}>
                <h3>
                    <Icon path={mdiWalletTravel} size={'30px'}></Icon> BookingId : {data.bookingId || ''}
                </h3>
                <div className={cx('title-right')}>
                    <h3>Booking Info</h3>
                    <Icon
                        path={mdiClose}
                        size={'30px'}
                        className={cx('close-Icon')}
                        onClick={() => handleClose(data.bookingId || '')}
                    ></Icon>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('roomDetailContent-one')}>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Check In Date : </div>
                        <div>{moment(data.qrCheckUp.checkIn).format('HH:MM ,DD-MM-YY')}</div>
                    </div>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Check Out Date : </div>
                        <div>{moment(data.qrCheckUp.checkOut).format('HH:MM ,DD-MM-YY')}</div>
                    </div>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Type : </div>
                        <div>{data.paymentMethod}</div>
                    </div>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Email : {data.email}</div>
                    </div>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Price :</div>
                        <div>
                            {((data.totalPrice - totalExtraFee) * 1000).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                            })}{' '}
                            VNĐ
                        </div>
                    </div>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Created by :</div>
                        <div>{data.userFullName} !</div>
                    </div>
                </div>
                <div className={cx('roomDetailContent-two')}>
                    <div className={cx('item-title')}>Customer List</div>
                    {data.inboundUsers.map((customer, index) => {
                        return (
                            <div className={cx('customer-list')} key={customer.inboundUserId}>
                                <div className={cx('customer-index')}>{index + 1}</div>
                                <div className={cx('customer-name')}>{customer.userName}</div>
                                <div className={cx('customer-number')}>{customer.userIdCard}</div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('roomDetailContent-three')}>
                    <div className={cx('item-title')}>Used Items List</div>
                    {data.bookingDetails.map((item) => {
                        return item.bookingDetailMenus.map((e) => {
                            return (
                                <div className={cx('customer-list')}>
                                    <div className={cx('customer-index')}>{e.bookingDetailMenuQuanity}</div>
                                    <div className={cx('customer-name')}>{e.bookingDetailMenuName}</div>
                                    <div className={cx('customer-number')}>Price {e.bookingDetailMenuPrice}k</div>
                                </div>
                            );
                        });
                    })}
                </div>
                <div className={cx('roomDetailContent-four')}>
                    <div className={cx('item-title')}>Total</div>

                    <div>
                        Total Used Item :{' '}
                        {(totalExtraFee * 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} VNĐ
                    </div>
                    <div>
                        Room Price :{' '}
                        {((data.totalPrice - totalExtraFee) * 1000).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })}{' '}
                        VNĐ
                    </div>
                    <div>
                        Deposit : {(data.deposit * 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} VNĐ
                    </div>
                    <hr></hr>
                    <div>
                        Total :{' '}
                        {(data.totalPrice * 1000).toLocaleString(undefined, {
                            maximumFractionDigits: 0,
                        })}{' '}
                        VNĐ
                    </div>
                </div>
            </div>
        </div>
    );
}
