import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Table, Input, Button, Icon, notification, Tag } from 'antd';
import Icon2 from '@mdi/react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { mdiClose } from '@mdi/js';
import * as Api from '../../api/ManagerApi';
import { dispatchFecth, dispatchHostFecth, dispatchHostSuccess } from '../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import BookingInfo from '../Manager-Dashboard-BoxInfo/BookingInfo';
export default function TableInfo({ data, onClose }) {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    let searchInput;
    const [state, setState] = useState({
        searchText: '',
        searchedColumn: '',
    });
    const [pagination, setPagination] = useState({
        total: data.bookings.length,
        totalPages: data.bookings.length / 10,
    });
    const auth = JSON.parse(localStorage.getItem('user'));
    let getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered) => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: (text) =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setState({ searchText: '' });
    };
    const columns = [
        {
            title: 'Id',
            dataIndex: 'bookingId',
            key: 'bookingId',
            ...getColumnSearchProps('bookingId'),
        },
        {
            title: 'FullName',
            dataIndex: 'fullName',
            key: 'fullName',
            ...getColumnSearchProps('fullName'),
        },
        {
            title: 'Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...getColumnSearchProps('phoneNumber'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Arrive',
            dataIndex: 'startDate',
            key: 'startDate',
            ...getColumnSearchProps('startDate'),
        },
        {
            title: 'Depart',
            dataIndex: 'endDate',
            key: 'endDate',
            ...getColumnSearchProps('endDate'),
        },
        {
            title: 'Method',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            ...getColumnSearchProps('paymentMethod'),
        },

        {
            title: 'Total Earning',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            ...getColumnSearchProps('totalPrice'),
            render: (e) => (
                <div className={cx('money')}>
                    {(e * 1000).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                    })}{' '}
                    VNĐ
                </div>
            ),
        },
    ];
    const handleClick = (e) => {
        dispatch(dispatchHostFecth());
        Api.getBookingDetail(e.bookingId, auth.token)
            .then((result) => {
                SetListBookingDetail([result, ...listBookingDetail]);
            })
            .catch((err) => openNotificationWithIcon('error', 'Failed', 'Server đang bận vui lòng thử lại sau !'))
            .finally(() => dispatch(dispatchHostSuccess()));
    };
    const [listBookingDetail, SetListBookingDetail] = useState([]);
    const handleCloseBooking = (e, status) => {
        const newList = listBookingDetail.filter((data) => data.bookingId !== e);
        SetListBookingDetail(newList);
    };
    return (
        <div className={cx('body')}>
            <div
                style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 30, cursor: 'pointer' }}
                onClick={() => onClose(data.tableId)}
            >
                <Icon2 path={mdiClose} size={'30px'}>
                    {' '}
                </Icon2>
            </div>
            <Table
                columns={columns}
                dataSource={data.bookings}
                className={cx('table')}
                pagination={pagination}
                rowKey={(e) => e.bookingId}
                key={(e) => e.bookingId}
                onRowClick={(e) => handleClick(e)}
            />
            {listBookingDetail.map((e) => {
                // return <RoomInfo data={e} handleClose={handleCloseRoom}></RoomInfo>;
                return <BookingInfo data={e} handleClose={handleCloseBooking}></BookingInfo>;
            })}
        </div>
    );
}
