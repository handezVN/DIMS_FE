import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import moment from 'moment';
import { DatePicker , notification} from 'antd';
import * as Api from '../../../api/ManagerApi';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
export default function CategoryPrice() {
    const { RangePicker } = DatePicker;
    const cx = classNames.bind(styles);
    const [listCategory, setListCategory] = useState([]);
    const [listDate,setListDate] = useState([{
        fromDate : '',
        toDate:''
    }])
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    const hotel = JSON.parse(localStorage.getItem('hotelSelected'));
    const auth = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        Api.getListCategory(hotel.hotelid, auth.token).then((data) => setListCategory(data));
    }, []);
    const handleEditPrice = (categoryId,data) =>{
        const newData = listCategory.map(e =>{
            if(e.categoryId === categoryId){
                e.priceDefault = data
            }
            return e;
        })
        setListCategory(newData);
    }
    const handleUpdateDate = (data,index) =>{
        const newData = listDate.map((e,i) =>{
            if(index === i){
                e.fromDate = (moment(data[0]._d).format('YYYY-MM-DD'))
                e.toDate = (moment(data[1]._d).format('YYYY-MM-DD'))
            }
            return e 
        })
        setListDate(newData);
    }
    function disabledDate(current) {
        return current <= moment().subtract(1, 'days');
    }
    const ConvertData = () =>{
        let datas = [];
        listCategory.forEach(category =>{
            listDate.forEach(date =>{
                const listDates = getDates(date.fromDate,date.toDate);
                listDates.forEach(e=>{
                    datas.push({
                        categoryId: category.categoryId,
                        specialPrice1: category.priceDefault,
                        specialDate: e
                      })
                })
            })
        })
        return datas;
    }
    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }
    const handleSubmit = () =>{
        const datas = ConvertData();
        Api.AddPriceCategory(datas,auth.token).then(() => {
            openNotificationWithIcon('success', 'Success', 'Đã Cập nhật thành công');
        })
        .catch((err) => {
            openNotificationWithIcon('error', 'Failed', 'Đã có lỗi xảy ra khi cập nhật !');
        });
    }
    return (
        <div className={cx('body')}>
            <div>Cài Đặt Giá Cho Các Ngày Xác Định </div>
            <div className={cx('row')}>
                <div className={cx('datepicker')}>Khoảng Thời Gian</div>
                <div className={cx('categoryList')}>Loại Phòng</div>
                <div className={cx('PriceList')}>Giá phòng</div>
            </div>
            <div className={cx('row')}>
                <div className={cx('datepicker')}>
                   {listDate.map((e,index) =>{
                    return (
                        <div> <RangePicker
                        disabledDate={disabledDate}
                                    ranges={{
                                        Today: [moment(), moment().subtract(-1, 'days')],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                        onChange={e =>handleUpdateDate(e,index)} 
                    /> <Icon path={mdiClose} size={'20px'} onClick={()=>{
                        if(listDate.length>1){
                            const newList = listDate.filter((e,i) => index !== i)
                            setListDate(newList)
                        }
                        
                    }}></Icon> </div>
                    )
                   })}
                   <div onClick={()=>{
                    setListDate([...listDate,{
                        fromDate : '',
                        toDate:''
                    }])
                   }}>Add More</div>
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
                                <input type={'number'} className={cx('inputPrice')} value={e.priceDefault} onChange={data => handleEditPrice(e.categoryId, data.target.value)}></input>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div onClick={() => handleSubmit()}>Submit </div>
        </div>
    );
}
