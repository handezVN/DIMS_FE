import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import FloorItem from './FloorItem';
import { mdiHome } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { Divider, Checkbox } from 'antd';
export default function ShowRoomStatus() {
    const cx = classNames.bind(styles);

    const datatmp = [
        {
            roomId: 1,
            roomName: '1',
            hotelId: 0,
            categoryId: 1,
            categoryName: 'Single bedroom',
            roomPrice: 1000,
            floor: 0,
            roomDescription: null,
            allStatus: 3,
            cleanStatus: true,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 2,
            roomName: '2',
            hotelId: 0,
            categoryId: 2,
            categoryName: 'Double bedroom',
            roomPrice: 2000,
            floor: 1,
            roomDescription: null,
            allStatus: 2,
            cleanStatus: false,
            bookedStatus: true,
            status: true,
        },
        {
            roomId: 3,
            roomName: '3',
            hotelId: 0,
            categoryId: 3,
            categoryName: 'Triple bedroom',
            roomPrice: 3000,
            floor: 2,
            roomDescription: null,
            allStatus: 3,
            cleanStatus: true,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 4,
            roomName: '4',
            hotelId: 0,
            categoryId: 1,
            categoryName: 'Single bedroom',
            roomPrice: 1000,
            floor: 1,
            roomDescription: null,
            allStatus: 3,
            cleanStatus: true,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 5,
            roomName: '5',
            hotelId: 0,
            categoryId: 2,
            categoryName: 'Double bedroom',
            roomPrice: 2000,
            floor: 0,
            roomDescription: null,
            allStatus: 3,
            cleanStatus: true,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 6,
            roomName: '6',
            hotelId: 0,
            categoryId: 3,
            categoryName: 'Triple bedroom',
            roomPrice: 3000,
            floor: 1,
            roomDescription: null,
            allStatus: 3,
            cleanStatus: true,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 7,
            roomName: '7',
            hotelId: 0,
            categoryId: 1,
            categoryName: 'Single bedroom',
            roomPrice: 1000,
            floor: 0,
            roomDescription: null,
            allStatus: 3,
            cleanStatus: true,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 8,
            roomName: '8',
            hotelId: 0,
            categoryId: 2,
            categoryName: 'Double bedroom',
            roomPrice: 2000,
            floor: 1,
            roomDescription: null,
            allStatus: 1,
            cleanStatus: false,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 9,
            roomName: '9',
            hotelId: 0,
            categoryId: 3,
            categoryName: 'Triple bedroom',
            roomPrice: 3000,
            floor: 2,
            roomDescription: null,
            allStatus: 1,
            cleanStatus: false,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 10,
            roomName: '10',
            hotelId: 0,
            categoryId: 1,
            categoryName: 'Single bedroom',
            roomPrice: 1000,
            floor: 1,
            roomDescription: null,
            allStatus: 1,
            cleanStatus: false,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 1040,
            roomName: '11',
            hotelId: 0,
            categoryId: 1,
            categoryName: 'Single bedroom',
            roomPrice: 1000,
            floor: 0,
            roomDescription: null,
            allStatus: 1,
            cleanStatus: false,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 1041,
            roomName: '99',
            hotelId: 0,
            categoryId: 1,
            categoryName: 'Single bedroom',
            roomPrice: 1000,
            floor: 0,
            roomDescription: 'string',
            allStatus: 1,
            cleanStatus: false,
            bookedStatus: false,
            status: true,
        },
        {
            roomId: 1042,
            roomName: '98',
            hotelId: 0,
            categoryId: 2,
            categoryName: 'Double bedroom',
            roomPrice: 2000,
            floor: 0,
            roomDescription: 'string',
            allStatus: 1,
            cleanStatus: false,
            bookedStatus: false,
            status: true,
        },
    ];
    const [datas, setDatas] = useState(datatmp || []);
    const removeDulicate = (arr) => {
        const uniqueIds = [];
        const unique = arr.filter((element) => {
            const isDuplicate = uniqueIds.includes(element.id);

            if (!isDuplicate) {
                uniqueIds.push(element.id);

                return true;
            }

            return false;
        });
        return unique;
    };
    const [filterFloor, setFilterFloor] = useState(true);
    const [floorlist, setFloorlist] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [SelectRoomAvailable, setSelectRoomAvailable] = useState(false);
    const [SelectRoomNotAvailable, setSelectRoomNotAvailable] = useState(false);
    const [SelectRoomNotClean, setSelectRoomNotClean] = useState(false);
    const [searchRoom, setSearchRoom] = useState('');
    let floorlist1 = [];
    let categoryList1 = [];
    useEffect(() => {
        filterRoom();
    }, []);
    useEffect(() => {
        let newsData = [];
        let flag = false;
        if (SelectRoomAvailable) {
            const news = datatmp.filter((e) => e.allStatus === 1);
            newsData.push(...news);
            flag = true;
        }
        if (SelectRoomNotAvailable) {
            const news = datatmp.filter((e) => e.allStatus === 2);
            newsData.push(...news);
            flag = true;
        }
        if (SelectRoomNotClean) {
            const news = datatmp.filter((e) => e.allStatus === 3);
            newsData.push(...news);
            flag = true;
        }
        console.log(flag);
        if (!flag) {
            newsData = datatmp;
            setDatas(newsData);
        }
        if (searchRoom.length > 0) {
            const news = newsData.filter((e) => e.roomName.match(searchRoom));
            newsData = news;
        }
        setDatas(newsData);
    }, [SelectRoomAvailable, SelectRoomNotAvailable, SelectRoomNotClean, searchRoom]);
    const filterRoom = () => {
        if (datas.length > 0) {
            datas.forEach((data) => {
                floorlist1.push({
                    id: data.floor,
                    floor: data.floor,
                });
                categoryList1.push({
                    id: data.categoryId,
                    categoryName: data.categoryName,
                });
            });
            floorlist1 = removeDulicate(floorlist1);
            categoryList1 = removeDulicate(categoryList1);
            setFloorlist(floorlist1);
            setCategoryList(categoryList1);
        }
    };
    return (
        <div className={cx('body')}>
            <div className={cx('title')}>
                <h3>Hotel : ABC</h3>
                <h3>All Room Status</h3>
            </div>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    {(filterFloor ? floorlist : categoryList).map((filter) => {
                        return (
                            <div className={cx('Floor')}>
                                <div className={cx('Floor_title')}>
                                    <h3>{filterFloor ? `Lầu ${filter.floor} ` : filter.categoryName} :</h3>
                                </div>
                                {datas.map((data) => {
                                    if (filterFloor ? data.floor === filter.floor : data.categoryId === filter.id) {
                                        return (
                                            <div className={cx('Room_Item')}>
                                                <div>
                                                    <Icon
                                                        path={mdiHome}
                                                        size={'24px'}
                                                        color={
                                                            data.allStatus === 2
                                                                ? '#3DC5B5'
                                                                : data.allStatus === 3
                                                                ? '#E31717'
                                                                : data.allStatus === 1
                                                                ? '#000'
                                                                : '#F9A000'
                                                        }
                                                    ></Icon>
                                                </div>
                                                <div>{data.roomName}</div>
                                            </div>
                                        );
                                    }
                                    return <></>;
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className={cx('right')}>
                    <div className={cx('searchBox')}>
                        <input
                            placeholder="Nhâp tên phòng"
                            className={cx('searchRoom')}
                            value={searchRoom}
                            onChange={(e) => setSearchRoom(e.target.value)}
                        ></input>
                        <Icon path={mdiMagnify} size={'24px'} className={cx('searchIcon')}></Icon>
                    </div>
                    <Divider className={cx('divider')}>Filter</Divider>
                    <div className={cx('FilterRoom')}>
                        <div>Hiển Thị Phòng :</div>
                        <ul>
                            <li>
                                <div className={cx('FilterRoom_item')}>
                                    <div>Phòng trống</div>
                                    <div>
                                        <Checkbox
                                            value={SelectRoomAvailable}
                                            onChange={() => setSelectRoomAvailable(!SelectRoomAvailable)}
                                        ></Checkbox>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={cx('FilterRoom_item')}>
                                    <div>Phòng đang có khách</div>
                                    <div>
                                        <Checkbox
                                            value={SelectRoomNotAvailable}
                                            onChange={() => setSelectRoomNotAvailable(!SelectRoomNotAvailable)}
                                        ></Checkbox>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className={cx('FilterRoom_item')}>
                                    <div>Phòng cần vệ sinh</div>
                                    <div>
                                        <Checkbox
                                            value={SelectRoomNotClean}
                                            onChange={() => setSelectRoomNotClean(!SelectRoomNotClean)}
                                        ></Checkbox>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <Divider className={cx('divider')}>Sort</Divider>
                    <div className={cx('SortRoom')}>Sắp xếp phòng theo :</div>

                    <div className={cx('btn-Sort')}>
                        <div className={cx('btnSortFloor')} onClick={() => setFilterFloor(true)}>
                            Lầu
                        </div>{' '}
                        <div className={cx('btnSortCategory')} onClick={() => setFilterFloor(false)}>
                            Loại Phòng
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
