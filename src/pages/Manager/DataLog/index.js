import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { notification, List, Typography, DatePicker, Select, Button } from 'antd';
import * as Api from '../../../api/ManagerApi';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
import BookingInfo from '../../../Components/Manager-Dashboard-BoxInfo/BookingInfo';
import { mdiCarSearch, mdiFileSearch, mdiReload, mdiSearchWeb } from '@mdi/js';
import Icon2, { Icon } from '@mdi/react';
import moment from 'moment';
export default function DataLog() {
    const dispatch = useDispatch();
    const ListRoom = useSelector((state) => state.RoomReducer.data) || [];
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const [door, setDoor] = useState([]);
    const dateFormat = 'YYYY-MM-DD';
    const [From, setFrom] = useState(moment().format('YYYY-MM-DD'));
    const [To, setTo] = useState(moment().subtract(-1, 'days').format(dateFormat));
    const [From2, setFrom2] = useState(moment().format('YYYY-MM-DD'));
    const [To2, setTo2] = useState(moment().subtract(-1, 'days').format(dateFormat));
    const [selectRoom, setRoom] = useState(-1);
    const auth = JSON.parse(localStorage.getItem('user'));
    const { RangePicker } = DatePicker;
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    const { Option } = Select;
    const refresh = () => {
        getQRCodeLog();
    };
    const getQRCodeLog = () => {
        dispatch(dispatchHostFecth());
        Api.getQRCodeLog(From, To, auth.token)
            .then((result) => {
                setData(result);
            })
            .finally(() => dispatch(dispatchHostSuccess()));
    };
    const getDoorLog = () => {
        dispatch(dispatchHostFecth());
        Api.getDoorLog(selectRoom, From2, To2, auth.token)
            .then((result) => {
                setDoor(result.reverse());
            })
            .finally(() => dispatch(dispatchHostSuccess()));
    };
    useEffect(() => {
        refresh();
    }, []);
    useEffect(() => {
        if (ListRoom.length > 0) {
            setRoom([ListRoom[0].roomId]);
        }
    }, [ListRoom]);
    function onChange(value) {
        setRoom(value);
    }

    function onSearch(val) {
        console.log('search:', val);
    }
    const handleSearchDoorLog = () => {
        getDoorLog();
    };
    const handleSearchGetQrCodeLog = () => {
        getQRCodeLog();
    };

    return (
        <div className={cx('body')}>
            <div className={cx('container')}>
                <div style={{ width: '100%', paddingLeft: 30, paddingBottom: 10 }}>
                    <List
                        header={
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Get QR Code DataLog </div>
                                <div>
                                    <RangePicker
                                        ranges={{
                                            Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        }}
                                        defaultValue={[moment(From, dateFormat), moment(To, dateFormat)]}
                                        onChange={(e) => {
                                            setFrom(e[0].format('YYYY-MM-DD'));
                                            setTo(e[1].format('YYYY-MM-DD'));
                                        }}
                                    />
                                    <Button type="link" onClick={() => handleSearchGetQrCodeLog()}>
                                        Search <Icon path={mdiFileSearch} size={'20px'}></Icon>
                                    </Button>
                                </div>
                            </div>
                        }
                        bordered
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark>[Room {item.roomName}]</Typography.Text> Get QR code by user :{' '}
                                <b>{item.userName}</b> at{' '}
                                <b> {moment(item.qrViewLogCreateDate).format('HH:MM:SS , DD-MM-YYYY')}</b>
                            </List.Item>
                        )}
                    />
                    <List
                        header={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>Get Door DataLog </div>
                                <div>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Select Room"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onSearch={onSearch}
                                    >
                                        {ListRoom.length > 0 ? (
                                            ListRoom.map((room) => {
                                                return (
                                                    <Option value={`${room.roomId}`} key={room.roomId}>
                                                        Phòng {room.roomName}
                                                    </Option>
                                                );
                                            })
                                        ) : (
                                            <Option value={`RoomID-99999`} key={-99999}>
                                                Phòng 99999
                                            </Option>
                                        )}
                                    </Select>
                                    ,
                                    <RangePicker
                                        ranges={{
                                            Today: [moment(), moment()],
                                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                                        }}
                                        defaultValue={[moment(From2, dateFormat), moment(To2, dateFormat)]}
                                        onChange={(e) => {
                                            setFrom2(e[0].format('YYYY-MM-DD'));
                                            setTo2(e[1].format('YYYY-MM-DD'));
                                        }}
                                    />
                                    <Button type="link" onClick={() => handleSearchDoorLog()}>
                                        Search <Icon path={mdiFileSearch} size={'20px'}></Icon>
                                    </Button>
                                </div>
                            </div>
                        }
                        bordered
                        dataSource={door}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark>
                                    [{moment(item.createDate).format('HH:MM:SS , DD-MM-YYYY')}]
                                </Typography.Text>{' '}
                                Door Status : QR Code <b>{item.doorCondition === '1' ? 'True' : 'False'}</b>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
