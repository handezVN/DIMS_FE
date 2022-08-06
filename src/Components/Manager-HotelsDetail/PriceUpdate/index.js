import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
import { DatePicker, List, notification } from 'antd';
import * as Api from '../../../api/ManagerApi';
import Icon from '@mdi/react';
import { mdiBookEdit, mdiClose, mdiDelete, mdiPlus } from '@mdi/js';
import { useDispatch } from 'react-redux';
import { dispatchHostFailed, dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
export default function CategoryPrice() {
    const { RangePicker } = DatePicker;
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const [listCategory, setListCategory] = useState([]);
    const [listPrice, setListPrice] = useState([]);
    const [listDate, setListDate] = useState([
        {
            fromDate: '',
            toDate: '',
        },
    ]);
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    const hotel = JSON.parse(localStorage.getItem('hotelSelected'));
    const auth = JSON.parse(localStorage.getItem('user'));
    const getNumberDateFromTo = (a, b) => {
        // To calculate the time difference of two dates
        let date1 = new Date(a);
        let date2 = new Date(b);
        let Difference_In_Time = date1.getTime() - date2.getTime();

        // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return Difference_In_Days;
    };
    const [readListData, setReadListData] = useState([]);
    const [dataRemember, setDataRememer] = useState('');
    const ConvertDatatoRead = (datas) => {
        let ListData = [];
        datas.map((data) => {
            data.specialPrices.forEach((e) => {
                if (ListData.length < 1) {
                    ListData.push({
                        specialPriceId: e.specialPriceId,
                        categoryId: e.categoryId,
                        specialPrice1: e.specialPrice1,
                        startDate: e.specialDate,
                        endDate: e.specialDate,
                        categoryName: data.categoryName,
                        status: true,
                    });
                } else {
                    if (getNumberDateFromTo(e.specialDate, ListData[ListData.length - 1].endDate) === 1) {
                        if (ListData[ListData.length - 1].specialPrice1 === e.specialPrice1) {
                            ListData[ListData.length - 1].endDate = e.specialDate;
                        } else {
                            ListData.push({
                                specialPriceId: e.specialPriceId,
                                categoryId: e.categoryId,
                                specialPrice1: e.specialPrice1,
                                startDate: e.specialDate,
                                endDate: e.specialDate,
                                categoryName: data.categoryName,
                                status: true,
                            });
                        }
                    } else {
                        ListData.push({
                            specialPriceId: e.specialPriceId,
                            categoryId: e.categoryId,
                            specialPrice1: e.specialPrice1,
                            startDate: e.specialDate,
                            endDate: e.specialDate,
                            categoryName: data.categoryName,
                            status: true,
                        });
                    }
                }
            });
        });
        return ListData;
    };
    const getListPriceOfCategory = () => {
        Api.getListPriceOfCategory(hotel.hotelid, auth.token)
            .then((datas) => {
                const newData = ConvertDatatoRead(datas);
                let readData = [];
                newData.forEach((e, index) => {
                    if (readData.length < 1) {
                        readData.push({
                            id: index,
                            startDate: e.startDate,
                            endDate: e.endDate,
                            priceId: [e.specialPriceId],
                            categoryId: [e.categoryId],
                            price: [e.specialPrice1],
                            categoreList: [e.categoryName],
                            isEdit: false,
                        });
                    } else {
                        let flag = true;
                        readData.forEach((data) => {
                            if (data.startDate === e.startDate && data.endDate === e.endDate) {
                                data.priceId = [...data.priceId, e.specialPriceId];
                                data.categoryId = [...data.categoryId, e.categoryId];
                                data.price = [...data.price, e.specialPrice1];
                                data.categoreList = [...data.categoreList, e.categoryName];
                                flag = false;
                            }
                        });
                        if (flag) {
                            readData.push({
                                id: index,
                                startDate: e.startDate,
                                endDate: e.endDate,
                                priceId: [e.specialPriceId],
                                categoryId: [e.categoryId],
                                price: [e.specialPrice1],
                                categoreList: [e.categoryName],
                                isEdit: false,
                            });
                        }
                    }
                });
                setReadListData(readData);
                setDataRememer(JSON.stringify(readData));
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        Api.getListCategory(hotel.hotelid, auth.token).then((data) => setListCategory(data));
        getListPriceOfCategory();
    }, []);
    const handleEditPrice = (categoryId, data) => {
        const newData = listCategory.map((e) => {
            if (e.categoryId === categoryId) {
                e.priceDefault = data;
            }
            return e;
        });
        setListCategory(newData);
    };
    const handleUpdateDate = (data, index) => {
        const newData = listDate.map((e, i) => {
            if (index === i) {
                e.fromDate = moment(data[0]._d).format('YYYY-MM-DD');
                e.toDate = moment(data[1]._d).format('YYYY-MM-DD');
            }
            return e;
        });
        setListDate(newData);
    };
    function disabledDate(current) {
        return current <= moment().subtract(1, 'days');
    }
    const ConvertData = () => {
        let datas = [];
        listCategory.forEach((category) => {
            listDate.forEach((date) => {
                const listDates = getDates(date.fromDate, date.toDate);
                listDates.forEach((e) => {
                    datas.push({
                        categoryId: category.categoryId,
                        specialPrice1: category.priceDefault,
                        specialDate: e,
                    });
                });
            });
        });
        return datas;
    };
    function getDates(startDate, endDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(endDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'));
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    const handleSubmit = () => {
        if (listDate[0].fromDate !== '' && listDate[0].toDate !== '') {
            const datas = ConvertData();
            dispatch(dispatchHostFecth());
            Api.AddPriceCategory(datas, auth.token)
                .then(() => {
                    openNotificationWithIcon('success', 'Success', 'Đã Cập nhật thành công');
                    setReadListData([]);
                    dispatch(dispatchHostSuccess());
                })
                .catch((err) => {
                    openNotificationWithIcon('error', 'Failed', `Đã có lỗi xảy ra khi cập nhật ! ${err}`);
                    dispatch(dispatchHostFailed());
                })
                .finally(() => {
                    getListPriceOfCategory();
                    setIsAdd(!isAdd);
                });
        } else {
            openNotificationWithIcon('error', 'Failed', 'Bạn chưa chọn ngày !');
        }
    };

    const handleEditData = (i) => {
        const newData = readListData.map((data, index) => {
            if (data.id === i) data.isEdit = true;
            return data;
        });
        setReadListData(newData);
    };
    const handleCanCelEditDate = (i) => {
        const datas = JSON.parse(dataRemember);
        const newData = readListData.map((data, index) => {
            if (index === i) {
                data = datas[i];
                data.isEdit = false;
            }
            return data;
        });
        setReadListData(newData);
    };
    const handleChangeData = (index, index2, value) => {
        const newData = readListData.map((data, i) => {
            if (index === i) data.price[index2] = value;
            return data;
        });
        setReadListData(newData);
    };
    const handleDelete = (id) => {
        if (window.confirm('Are You Sure ?')) {
            const newData = readListData.filter((e) => e.id === id);
            let newList = [];
            newData[0].price.map((e, index) => {
                const listDate = getDates3(
                    moment(newData[0].startDate).format('YYYY-MM-DD'),
                    moment(newData[0].endDate).format('YYYY-MM-DD'),
                    newData[0].priceId[index],
                );
                newList.push(...listDate);
            });
            dispatch(dispatchHostFecth());
            Api.DeletePriceOfCategory(newList, auth.token)
                .then(() => {
                    openNotificationWithIcon('success', 'Success', 'Đã Xoá');
                    setReadListData([]);
                    dispatch(dispatchHostSuccess());
                })
                .catch((err) => {
                    openNotificationWithIcon('error', 'Failed', `Đã có lỗi xảy ra khi cập nhật ! ${err}`);
                    dispatch(dispatchHostFailed());
                })
                .finally(() => {
                    getListPriceOfCategory();
                });
        }
    };
    const handleUpdate = (id) => {
        const newData = readListData.filter((e) => e.id === id);
        let newList = [];
        newData[0].price.map((e, index) => {
            const listDate = getDates2(
                moment(newData[0].startDate).format('YYYY-MM-DD'),
                moment(newData[0].endDate).format('YYYY-MM-DD'),
                newData[0].priceId[index],
                newData[0].categoryId[index],
                newData[0].price[index],
            );
            newList.push(...listDate);
        });
        dispatch(dispatchHostFecth());
        Api.UpdatePriceOfCategory(newList, auth.token)
            .then(() => {
                openNotificationWithIcon('success', 'Success', 'Đã Cập nhật thành công');
                setReadListData([]);
                dispatch(dispatchHostSuccess());
            })
            .catch((err) => {
                openNotificationWithIcon('error', 'Failed', `Đã có lỗi xảy ra khi cập nhật ! ${err}`);
                dispatch(dispatchHostFailed());
            })
            .finally(() => {
                getListPriceOfCategory();
            });
    };
    function getDates2(startDate, endDate, priceId, categoryId, specialPrice1) {
        var dateArray = [];
        let idtmp = priceId;
        var currentDate = moment(startDate);
        var stopDate = moment(endDate);
        while (currentDate <= stopDate) {
            dateArray.push({
                specialDate: moment(currentDate).format('YYYY-MM-DD'),
                specialPriceId: idtmp,
                categoryId,
                specialPrice1,
                status: true,
            });
            currentDate = moment(currentDate).add(1, 'days');
            idtmp = idtmp + 1;
        }
        return dateArray;
    }
    function getDates3(startDate, endDate, priceId) {
        var dateArray = [];
        let idtmp = priceId;
        var currentDate = moment(startDate);
        var stopDate = moment(endDate);
        while (currentDate <= stopDate) {
            dateArray.push({
                specialPriceId: idtmp,
            });
            currentDate = moment(currentDate).add(1, 'days');
            idtmp = idtmp + 1;
        }
        return dateArray;
    }
    const [isAdd, setIsAdd] = useState(false);
    return (
        <div className={cx('body')}>
            <div>Cài Đặt Giá Cho Các Ngày Xác Định </div>
            <div className={cx('row')}>
                <div className={cx('datepicker')}>Khoảng Thời Gian</div>
                <div className={cx('categoryList')}>Loại Phòng</div>
                <div className={cx('PriceList')}>Giá phòng</div>
            </div>
            {isAdd ? (
                <div>
                    <div className={cx('row')}>
                        <div className={cx('datepicker')}>
                            {listDate.map((e, index) => {
                                return (
                                    <div>
                                        <RangePicker
                                            disabledDate={disabledDate}
                                            ranges={{
                                                Today: [moment(), moment().subtract(-1, 'days')],
                                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                                            }}
                                            onChange={(e) => handleUpdateDate(e, index)}
                                        />
                                        <Icon
                                            path={mdiClose}
                                            size={'20px'}
                                            onClick={() => {
                                                if (listDate.length > 1) {
                                                    const newList = listDate.filter((e, i) => index !== i);
                                                    setListDate(newList);
                                                }
                                            }}
                                        ></Icon>
                                    </div>
                                );
                            })}
                            <div
                                onClick={() => {
                                    setListDate([
                                        ...listDate,
                                        {
                                            fromDate: '',
                                            toDate: '',
                                        },
                                    ]);
                                }}
                                className={cx('btn-add')}
                            >
                                <Icon path={mdiPlus} size={'20px'}></Icon>
                                Add More
                            </div>
                        </div>
                        <div className={cx('categoryList')}>
                            {listCategory.map((e) => {
                                return <div>{e.categoryName}</div>;
                            })}
                        </div>
                        <div className={cx('PriceList')}>
                            {listCategory.map((e) => {
                                return (
                                    <div>
                                        <input
                                            type={'number'}
                                            className={cx('inputPrice')}
                                            value={e.priceDefault}
                                            onChange={(data) => handleEditPrice(e.categoryId, data.target.value)}
                                        ></input>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={cx('center')}>
                        <div onClick={() => handleSubmit()} className={cx('btn-save')} style={{ margin: 20 }}>
                            Submit{' '}
                        </div>
                        <div onClick={() => setIsAdd(!isAdd)} className={cx('btn-delete')} style={{ margin: 20 }}>
                            Cancel{' '}
                        </div>
                    </div>
                </div>
            ) : (
                <div className={cx('center')}>
                    <div className={cx('btn-addMore')} alt="Add" onClick={() => setIsAdd(true)}>
                        <Icon path={mdiPlus} size={'30px'}></Icon>
                    </div>
                </div>
            )}
            {readListData.map((e, index) => {
                return (
                    <div className={cx('row')}>
                        <div className={cx('datepicker')}>
                            {' '}
                            <div className={cx('showDatePicker')}>
                                <RangePicker
                                    disabledDate={disabledDate}
                                    ranges={{
                                        Today: [moment(), moment().subtract(-1, 'days')],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    // onChange={(e) => handleUpdateDate(e, index)}
                                    defaultValue={[moment(e.startDate, 'YYYY-MM-DD'), moment(e.endDate, 'YYYY-MM-DD')]}
                                    disabled={true}
                                />

                                {e.isEdit ? (
                                    <div className={cx('btn-editType')}>
                                        <div className={cx('btn-save')} onClick={() => handleUpdate(e.id)}>
                                            Save <Icon path={mdiBookEdit} size={'20px'}></Icon>
                                        </div>
                                        <div className={cx('btn-delete')} onClick={() => handleCanCelEditDate(e.id)}>
                                            Cancel <Icon path={mdiClose} size={'20px'}></Icon>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('btn-editType')}>
                                        <div className={cx('btn-edit')} onClick={() => handleEditData(e.id)}>
                                            Edit <Icon path={mdiBookEdit} size={'20px'}></Icon>
                                        </div>
                                        <div className={cx('btn-delete')} onClick={() => handleDelete(e.id)}>
                                            Delete <Icon path={mdiDelete} size={'20px'}></Icon>
                                        </div>
                                    </div>
                                )}

                                {/* <Icon
                                    path={mdiClose}
                                    size={'20px'}
                                    // onClick={() => {
                                    //     if (listDate.length > 1) {
                                    //         const newList = listDate.filter((e, i) => index !== i);
                                    //         setListDate(newList);
                                    //     }
                                    // }}
                                ></Icon> */}
                            </div>
                        </div>
                        <div className={cx('categoryList')}>
                            {e.categoreList.map((data) => {
                                return <div>{data}</div>;
                            })}
                        </div>
                        <div className={cx('PriceList')}>
                            {e.price.map((price, index2) => {
                                return (
                                    <div>
                                        {e.isEdit ? (
                                            <input
                                                type={'number'}
                                                className={cx('inputPrice')}
                                                value={e.price[index2]}
                                                onChange={(data) => handleChangeData(index, index2, data.target.value)}
                                            ></input>
                                        ) : (
                                            <>
                                                {(price * 1000).toLocaleString(undefined, {
                                                    maximumFractionDigits: 0,
                                                })}
                                                {` `}VNĐ
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
