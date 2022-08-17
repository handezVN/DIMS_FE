import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { notification, List, Typography, DatePicker } from 'antd';
import * as Api from '../../../api/ManagerApi';
import { useDispatch } from 'react-redux';
import { dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
import BookingInfo from '../../../Components/Manager-Dashboard-BoxInfo/BookingInfo';
import { mdiReload } from '@mdi/js';
import Icon2 from '@mdi/react';
import moment from 'moment';
export default function DataLog() {
    const dispatch = useDispatch();
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const auth = JSON.parse(localStorage.getItem('user'));
    const hotelSelected = JSON.parse(localStorage.getItem('hotelSelected'));
    const { RangePicker } = DatePicker;
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const refresh = () => {};
    useEffect(() => {
        refresh();
    }, []);
    const dateFormat = 'YYYY-MM-DD';
    const [From, setFrom] = useState(moment().format('YYYY-MM-DD'));
    const [To, setTo] = useState(moment().subtract(-1, 'days').format(dateFormat));
    return (
        <div className={cx('body')}>
            <div className={cx('container')}>
                <div style={{ width: '100%', paddingLeft: 30, paddingBottom: 10 }}>
                    <div
                        onClick={() => refresh()}
                        style={{
                            width: 120,
                            height: 30,
                            cursor: 'pointer',
                            border: '1px solid',
                            borderRadius: 10,
                            textAlign: 'center',
                            background: 'white',
                        }}
                    >
                        <Icon2 path={mdiReload} size={'30px'}></Icon2> Refresh
                    </div>
                    <List
                        header={
                            <div>
                                Get QR Code DataLog{' '}
                                <RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    defaultValue={[moment(From, dateFormat), moment(To, dateFormat)]}
                                    // onChange={}
                                />
                            </div>
                        }
                        bordered
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark>[ITEM]</Typography.Text> {item}
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}
