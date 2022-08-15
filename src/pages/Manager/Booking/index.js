import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { Table, Input, Button, Icon, notification, Tag } from 'antd';
import * as Api from '../../../api/ManagerApi';
import Highlighter from 'react-highlight-words';
import RoomInfo from '../../../Components/Manager-HotelsDetail/ShowRoomStatus/RoomInfo';
import { useDispatch } from 'react-redux';
import { dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
import BookingInfo from '../../../Components/Manager-Dashboard-BoxInfo/BookingInfo';
import { mdiReload } from '@mdi/js';
import Icon2 from '@mdi/react';
export default function Booking() {
    const dispatch = useDispatch();
    const cx = classNames.bind(styles);
    const [data, setData] = useState([]);
    const auth = JSON.parse(localStorage.getItem('user'));
    const hotelSelected = JSON.parse(localStorage.getItem('hotelSelected'));
    const [state, setState] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput;
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
    const [pagination, setPagination] = useState({
        total: 1,
        totalPages: 0,
    });
    const refresh = () => {
        dispatch(dispatchHostFecth());
        Api.getBooking(hotelSelected.hotelid, 1, 10, auth.token)
            .then((data) => {
                setData(data.result);
                setPagination({ total: data.totalItems, totalPages: data.totalPages });
            })
            .finally(() => dispatch(dispatchHostSuccess()));
    };
    useEffect(() => {
        refresh();
    }, []);
    useEffect(() => {
        if (pagination.totalPages > 0) {
            Promise.all(getAllBooking)
                .catch((err) => console.log(err))
                .then((result) => {
                    setData([...data, ...datatmp]);
                });
        }
    }, [pagination]);
    let datatmp = [];
    const getAllBooking = [...Array(parseInt(pagination.totalPages))].map((e, i) => {
        return Api.getBooking(hotelSelected.hotelid, i + 2, 10, auth.token).then((result) => {
            datatmp.push(...result.result);
        });
    });
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
            title: 'Status',
            dataIndex: 'qrCheckUp',
            key: 'qrCheckUp',
            render: (tags) => (
                <span>
                    {tags === null ? (
                        <Tag color={'volcano'}>Chưa Check In</Tag>
                    ) : tags.checkOut === null ? (
                        <Tag color={'green'}>Chưa Check Out</Tag>
                    ) : (
                        <Tag color="geekblue">Đã Check Out</Tag>
                    )}
                </span>
            ),
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
                </div>
                <Table
                    columns={columns}
                    dataSource={data}
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
        </div>
    );
}
