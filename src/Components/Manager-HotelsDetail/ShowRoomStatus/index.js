import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import FloorItem from './FloorItem';
import { mdiClose, mdiHome } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { Divider, Checkbox, Select, notification, Result, Modal } from 'antd';
import { mdiPlus } from '@mdi/js';
import * as Api from '../../../api/ManagerApi';
import { useDispatch } from 'react-redux';
import { dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
import { mdiPencil } from '@mdi/js';
import RoomInfo from './RoomInfo';
export default function ShowRoomStatus({ hotelId }) {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const { Option } = Select;
    const auth = JSON.parse(localStorage.getItem('user'));
    const [datas, setDatas] = useState([]);
    const [datatmp, setDataTmp] = useState([]);
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
    const [addRoom, setAddRoom] = useState(false);
    const [addRoomName, setAddRoomName] = useState('');
    const [addRoomFloor, setAddRoomFloor] = useState('');
    const [addRoomCategory, setAddRoomCategory] = useState('');
    let floorlist1 = [];
    let categoryList1 = [];
    const getStatusRoom = async () => {
        dispatch(dispatchHostFecth());
        await Api.getStatusAllRooms(auth.token, hotelId)
            .then((result) => {
                setDatas(result);
                setDataTmp(result);
                filterRoom(result);
            })
            .finally(() => {
                dispatch(dispatchHostSuccess());
            });
    };
    useEffect(() => {
        getStatusRoom();
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
    const filterRoom = (datatmp) => {
        if (datatmp.length > 0) {
            datatmp.forEach((data) => {
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
            setAddRoomCategory(categoryList1[0].id);
        }
    };
    const [AddRooms, setAddRooms] = useState([]);
    const handleAddRoom = () => {
        const check = datatmp.filter((e) => addRoomName === e.roomName);
        if (check.length > 0) {
            openNotificationWithIcon('error', 'Failed', `Đã có phòng tên ${addRoomName} !`);
            return;
        }
        const check2 = AddRooms.filter((e) => e.roomName === addRoomName);
        if (check2.length > 0) {
            openNotificationWithIcon('error', 'Failed', `Bạn vừa thêm phòng tên ${addRoomName} rồi !`);
            return;
        }
        const newdata = {
            roomName: addRoomName,
            categoryId: addRoomCategory,
            floor: parseInt(addRoomFloor),
            roomDescription: '',
            status: true,
        };
        setAddRooms([...AddRooms, newdata]);
        setDatas([...datas, newdata]);
        setAddRoomName('');
    };

    const handleAddRoomSubmit = () => {
        Api.addRoom(hotelId, AddRooms, auth.token)
            .then(() => {
                openNotificationWithIcon('success', 'Success', 'Đã Cập nhật thành công');
                setAddRooms([]);
                getStatusRoom();
            })
            .catch((err) => {
                console.log(err);
                openNotificationWithIcon('error', 'Failed', 'Đã có lỗi xảy ra khi cập nhật !');
            });
    };
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    const { confirm } = Modal;
    const showConfirm = (data) => {
        confirm({
            title: `Xác nhận đã dọn phòng ${data.roomName}`,
            content: ``,
            onOk() {
                Api.cleanRoom(data.roomId, auth.token)
                    .then(() => {
                        openNotificationWithIcon('success', 'Success', 'Đã Cập nhật thành công');
                        getStatusRoom();
                    })
                    .catch((err) => {
                        console.log(err);
                        openNotificationWithIcon('error', 'Failed', 'Đã có lỗi xảy ra khi cập nhật !');
                    });
            },
            onCancel() {},
        });
    };
    const [listRoomsDetail, SetListRoomsDetail] = useState([]);
    const handleRoomClick = (data) => {
        if (data.allStatus === 3) {
            showConfirm(data);
            console.log('1');
        }
        if (data.allStatus === 2) {
            dispatch(dispatchHostFecth());
            Api.getRoomInfo(data.roomId, auth.token)
                .then((result) => {
                    Api.getUsedMenu(result.bookingDetailId, auth.token)
                        .then((item) => {
                            const mergedObject = {
                                ...item,
                                ...result,
                            };
                            const datatmp = [mergedObject, ...listRoomsDetail];
                            SetListRoomsDetail(datatmp);
                        })
                        .catch();
                })
                .catch((err) => openNotificationWithIcon('error', 'Failed', 'Server đang bận vui lòng thử lại sau !'))
                .finally(() => dispatch(dispatchHostSuccess()));
        }
        if (data.allStatus === 1) {
            const newData = {
                roomId: data.roomId,
                roomName: data.roomName,
                hotelId: hotelId,
                roomStatus: 1,
                bookingDetailMenus: [],
                lsCustomer: [],
                floor: data.floor,
                categoryId: data.categoryId,
            };
            const newList = [newData, ...listRoomsDetail];
            SetListRoomsDetail([...newList]);
        }
    };
    const handleCloseRoom = (e, status) => {
        const newList = listRoomsDetail.filter((data) => data.roomId !== e);
        SetListRoomsDetail(newList);
        if (status) {
            getStatusRoom();
        }
    };
    return (
        <div>
            <div className={cx('body')}>
                <div className={cx('title')}>
                    <h3>Hotel : ABC</h3>
                    <div className={cx('title-right')}>
                        {!addRoom ? (
                            <div className={cx('addRoom-btn')} onClick={() => setAddRoom(!addRoom)}>
                                <Icon path={mdiPlus} size={'20px'} color={'white'}></Icon> Add Room
                            </div>
                        ) : (
                            <></>
                        )}
                        <h3>All Room Status</h3>
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        {(filterFloor ? floorlist : categoryList).map((filter) => {
                            return (
                                <div className={cx('Floor')} key={`${filter.id}a`}>
                                    <div>
                                        <h3 className={cx('Floor_title')}>
                                            {filterFloor ? `Lầu ${filter.floor} ` : filter.categoryName} :
                                        </h3>
                                    </div>
                                    {datas.map((data) => {
                                        if (filterFloor ? data.floor === filter.floor : data.categoryId === filter.id) {
                                            return (
                                                <div
                                                    className={cx('Room_Item')}
                                                    key={data.roomId}
                                                    onClick={() => handleRoomClick(data)}
                                                >
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
                        {addRoom ? (
                            <div className={cx('addNewRoom')}>
                                <div>
                                    <div>Tên Phòng:</div>
                                    <input
                                        placeholder="Room Name"
                                        style={{ width: 200 }}
                                        value={addRoomName}
                                        onChange={(e) => setAddRoomName(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <div>Lầu</div>

                                    <input
                                        placeholder="Lầu"
                                        className={cx('FloorInput')}
                                        type={'number'}
                                        value={addRoomFloor}
                                        onChange={(e) => setAddRoomFloor(e.target.value)}
                                    ></input>
                                </div>
                                <div>
                                    <div>Loại Phòng</div>
                                    <Select
                                        defaultValue={categoryList[0].id}
                                        value={addRoomCategory}
                                        style={{ width: 200 }}
                                        onChange={(e) => setAddRoomCategory(e)}
                                    >
                                        {categoryList.map((e) => {
                                            return <Option value={e.id}>{e.categoryName}</Option>;
                                        })}
                                    </Select>
                                </div>
                                <div className={cx('btn-add')} onClick={() => handleAddRoom()}>
                                    Add
                                </div>
                                <div className={cx('ActiveAdd')}>
                                    <div className={cx('btn-add-save')} onClick={() => handleAddRoomSubmit()}>
                                        Save
                                    </div>
                                    <div className={cx('btn-add-cancel')} onClick={() => setAddRoom(!addRoom)}>
                                        Cancel
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {' '}
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
                                                        onChange={() =>
                                                            setSelectRoomNotAvailable(!SelectRoomNotAvailable)
                                                        }
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
                        )}
                    </div>
                </div>
            </div>
            {listRoomsDetail.map((e) => {
                return (
                    <RoomInfo
                        data={e}
                        handleClose={handleCloseRoom}
                        categoryList={categoryList}
                        hotelId={hotelId}
                    ></RoomInfo>
                );
            })}
        </div>
    );
}
