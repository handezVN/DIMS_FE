import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import Icon from '@mdi/react';
import { mdiClose, mdiHome, mdiPencil, mdiPlus, mdiTrashCan } from '@mdi/js';
import moment from 'moment';
import * as Api from '../../../../api/ManagerApi';
import { Modal, notification, Select, Option } from 'antd';

export default function RoomInfo({ data, handleClose, categoryList, hotelId }) {
    const cx = classNames.bind(styles);
    const { confirm } = Modal;
    const { Option } = Select;
    const auth = JSON.parse(localStorage.getItem('user'));
    const [useEdit, setUseEdit] = useState(false);
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    const [editRoomName, setEditRoomName] = useState('');
    const [editRoomFloor, setEditRoomFloor] = useState('');
    const [editRoomCategory, setEditRoomCategory] = useState('');
    function showConfirm() {
        confirm({
            title: `Do you Want to delete ${data.roomName} rooms?`,
            content: 'Some descriptions',
            onOk() {
                Api.removeRoom(data.roomId, auth.token)
                    .then(() => {
                        openNotificationWithIcon('success', 'Success', 'Đã xóa thành công');
                        handleClose(data.roomId, true);
                    })
                    .catch((err) => {
                        console.log(err);
                        openNotificationWithIcon('error', 'Failed', 'Phòng đang có lịch đặt !');
                    });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const handleOk = (e) => {
        Api.updateRoomInfo(data.roomId, editRoomName, hotelId, editRoomCategory, editRoomFloor, auth.token)
            .then(() => {
                openNotificationWithIcon('success', 'Success', 'Đã xóa thành công');
                handleClose(data.roomId, true);
            })
            .catch((err) => {
                console.log(err);
                openNotificationWithIcon('error', 'Failed', 'Phòng đang có lịch đặt !');
            });

        setUseEdit(false);
    };

    const handleCancel = (e) => {
        setUseEdit(false);
    };
    const handleDelete = () => {
        showConfirm();
    };
    const handleUpdate = () => {
        setEditRoomCategory(data.categoryId);
        setEditRoomFloor(data.floor);
        setEditRoomName(data.roomName);
        setUseEdit(true);
    };
    return (
        <div className={cx('body')}>
            <Modal title="Basic Modal" visible={useEdit} onOk={() => handleOk()} onCancel={() => handleCancel()}>
                <div className={cx('addNewRoom')}>
                    <div>
                        <div>Tên Phòng:</div>
                        <input
                            placeholder="Room Name"
                            style={{ width: 200 }}
                            value={editRoomName}
                            onChange={(e) => setEditRoomName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <div>Lầu</div>

                        <input
                            placeholder="Lầu"
                            className={cx('FloorInput')}
                            type={'number'}
                            value={editRoomFloor}
                            onChange={(e) => setEditRoomFloor(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <div>Loại Phòng</div>
                        <Select
                            defaultValue={editRoomCategory}
                            style={{ width: 200 }}
                            value={editRoomCategory}
                            onChange={(e) => setEditRoomCategory(e)}
                        >
                            {categoryList.map((e) => {
                                return <Option value={e.id}>{e.categoryName}</Option>;
                            })}
                        </Select>
                    </div>
                </div>
            </Modal>
            <div className={cx('title')}>
                <h3>
                    <Icon path={mdiHome} size={'30px'} color={data.userFullName ? '#2EC4B6' : ''}></Icon> Room :{' '}
                    {data.roomName}
                </h3>
                <div className={cx('title-right')}>
                    {data.userFullName ? (
                        <></>
                    ) : (
                        <div className={cx('d-flex')}>
                            <div className={cx('deleteRoom-btn')} onClick={() => handleDelete()}>
                                <Icon path={mdiTrashCan} size={'20px'} color={'white'}></Icon> Delete Room
                            </div>
                            <div className={cx('editRoom-btn')} onClick={() => handleUpdate()}>
                                <Icon path={mdiPencil} size={'20px'} color={'white'}></Icon> Edit Room Info
                            </div>
                        </div>
                    )}
                    <h3>Room Info</h3>
                    <Icon
                        path={mdiClose}
                        size={'30px'}
                        className={cx('close-Icon')}
                        onClick={() => handleClose(data.roomId)}
                    ></Icon>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('roomDetailContent-one')}>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Check In Date : </div>
                        <div>{moment(data.createDate).format('YYYY-MM-DD')}</div>
                    </div>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Check Out Date : </div>
                        <div>{moment(data.endDate).format('YYYY-MM-DD')}</div>
                    </div>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Type : </div>
                        <div>{data.paymentMethod}</div>
                    </div>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Status : </div>
                        <div>
                            {' '}
                            {data.paymentCondition !== undefined ? (
                                <div
                                    style={{
                                        color:
                                            data.paymentCondition === 'True'
                                                ? '#53A1FD'
                                                : data.deposit > 0
                                                ? '#F9A000'
                                                : '#D72C36',
                                    }}
                                >
                                    {data.paymentCondition === 'True' ? (
                                        <div>Đã Thanh Toán</div>
                                    ) : data.deposit < 1 ? (
                                        <div>Chưa Thanh Toán</div>
                                    ) : (
                                        <div>
                                            Đã Thanh Toán{' '}
                                            <div style={{ color: '#53A1FD' }}>
                                                {' '}
                                                {(data.deposit * 1000).toLocaleString(undefined, {
                                                    maximumFractionDigits: 0,
                                                })}
                                            </div>
                                            VNĐ
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <div className={cx(['d-flex', 'content_item'])}>
                        <div>Price :</div>
                        <div>
                            {((data.totalPrice - data.extraFee) * 1000).toLocaleString(undefined, {
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
                    {data.lsCustomer.map((customer, index) => {
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
                    {data.bookingDetailMenus.map((e) => {
                        return (
                            <div className={cx('customer-list')}>
                                <div className={cx('customer-index')}>{e.bookingDetailMenuQuanity}</div>
                                <div className={cx('customer-name')}>{e.bookingDetailMenuName}</div>
                                <div className={cx('customer-number')}>Price {e.bookingDetailMenuPrice}k</div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('roomDetailContent-four')}>
                    <div className={cx('item-title')}>Total</div>

                    <div>
                        Total Used Item :{' '}
                        {(data.extraFee * 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })} VNĐ
                    </div>
                    <div>
                        Room Price :{' '}
                        {((data.totalPrice - data.extraFee) * 1000).toLocaleString(undefined, {
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
