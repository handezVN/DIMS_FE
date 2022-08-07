import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import GalleryImage from '../DetailHotel-ImageGallery';
import bedFront from '../../asset/bed-front.png';
import guestIcon from '../../asset/guest.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { roomContext } from '../../pages/hotelDetail';
import moment from 'moment';
import { notification } from 'antd';
import { AddCart_Fetch } from '../../redux/actions/addCartAction';
import { useDispatch } from 'react-redux';
export default function RoomType({ props, checkinDate, totalNight }) {
    const services = [
        {
            id: '01',
            icon: 'https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/80dec128db1e0351574ca3bb1198f813.svg',
            title: 'Miễn Phí Bữa Sáng',
            have: true,
        },
        {
            id: '02',
            icon: 'https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/5/5a913a9638da9c963966d8a962306abd.svg',
            title: 'Wifi Miễn Phí',
            have: true,
        },
        {
            id: '03',
            icon: 'https://ik.imagekit.io/tvlk/imageResource/2019/08/13/1565689038628-365690aa62503d6f8af8e1876c59f94a.png',
            title: 'Không hút thuốc',
            have: true,
        },
    ];
    const policys = [
        {
            id: '04',
            icon: 'https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/4315b319b782aba46e36b8ad6cee18ae.svg',
            title: 'Miễn phí hủy phòng',
            have: true,
        },
        {
            id: '05',
            icon: 'https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/b/b7f44a75a61d79df6226747661f37ca0.svg',
            title: 'Không hoàn tiền',
            have: false,
        },
    ];
    const cx = classNames.bind(styles);
    const navigator = useNavigate();
    const hotelContext = useContext(roomContext);
    const handleBookNow = ({ price, title, quantity, roomId, hotelId }) => {
        const newContext = {
            ...hotelContext,
            price: price,
            title: [title],
            quantity: [quantity],
            room: [roomId],
            hotelId: hotelId,
            roomQuantity: 1,
        };
        localStorage.setItem('booking', JSON.stringify(newContext));

        navigator('/payment/step1');
    };
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
            placement: 'bottomRight',
        });
    };
    const dispatch = useDispatch();
    const handleAddNow = ({ price, title, quantity, roomId, hotelId, categoryId, categoryImg, maxRoom }) => {
        dispatch(AddCart_Fetch());
        const readCard = JSON.parse(localStorage.getItem('add_booking_cart'));
        if (readCard === null) {
            const newContext = [
                {
                    ...hotelContext,
                    price: price,
                    title: title,
                    quantity: quantity,
                    roomId: roomId,
                    hotelId: hotelId,
                    roomQuantity: 1,
                    categoryId: categoryId,
                    categoryImg: categoryImg,
                    maxRoom: maxRoom,
                },
            ];
            openNotificationWithIcon('success', 'Success !', `Đã thêm vào danh sách phòng`);
            // console.log(newContext);
            localStorage.setItem('add_booking_cart', JSON.stringify(newContext));
        } else {
            const checkHotel = readCard.find((e) => e.hotelId === hotelId);
            if (checkHotel) {
                const check = readCard.find((e) => e.categoryId === categoryId);
                if (check !== undefined) {
                    const newData = readCard.map((e) => {
                        if (e.categoryId === categoryId) {
                            if (e.roomQuantity + 1 > roomId.length) {
                                openNotificationWithIcon(
                                    'error',
                                    'Error !',
                                    `Phòng này tối đa chỉ còn có ${roomId.length} phòng`,
                                );
                            } else {
                                e.roomQuantity = e.roomQuantity + 1;
                                openNotificationWithIcon('success', 'Success !', `Đã thêm vào danh sách phòng`);
                            }
                        }
                        return e;
                    });
                    localStorage.setItem('add_booking_cart', JSON.stringify(newData));
                    console.log(newData);
                } else {
                    const newContext = [
                        ...readCard,
                        {
                            ...hotelContext,
                            price: price,
                            title: title,
                            quantity: quantity,
                            roomId: roomId,
                            hotelId: hotelId,
                            roomQuantity: 1,
                            categoryId: categoryId,
                            categoryImg: categoryImg,
                            maxRoom: maxRoom,
                        },
                    ];
                    openNotificationWithIcon('success', 'Success !', `Đã thêm vào danh sách phòng`);
                    localStorage.setItem('add_booking_cart', JSON.stringify(newContext));
                }
            } else {
                const newContext = [
                    {
                        ...hotelContext,
                        price: price,
                        title: title,
                        quantity: quantity,
                        roomId: roomId,
                        hotelId: hotelId,
                        roomQuantity: 1,
                        categoryId: categoryId,
                        categoryImg: categoryImg,
                        maxRoom: maxRoom,
                    },
                ];
                openNotificationWithIcon('success', 'Success !', `Đã thêm vào danh sách phòng`);
                localStorage.setItem('add_booking_cart', JSON.stringify(newContext));
            }
        }
    };
    // const [count, setCount] = useState(0);
    const [comTmp, setComTmp] = useState([]);

    useEffect(() => {
        let flag = true;
        let tmp = [];
        if (props.rooms.length > 0) {
            props.rooms.map((room, index) => {
                if (tmp.length < 1) {
                    tmp.push({
                        description: room.roomDescription,
                        price: room.roomPrice,
                        count: 1,
                        room: [{ roomId: room.roomId }],
                    });
                } else {
                    tmp[0].count = tmp[0].count + 1;
                    const abc = tmp[0].room;
                    tmp[0].room = [...abc, { roomId: room.roomId }];
                }
                setComTmp(tmp);
                // tmp.push(index);
                return null;
            });
        }
        props.specialPPrice.forEach((e, index) => {
            if (moment(e.specialDate).format('YYYY-MM-DD') === moment(checkinDate).format('YYYY-MM-DD')) {
                let pricetmp = tmp[0].price;
                tmp[0].price = 0;
                if (totalNight > 1) {
                    for (let i = 1; i < totalNight; i++) {
                        if (props.specialPPrice[index + i]) {
                            tmp[0].price = tmp[0].price + props.specialPPrice[index + i].specialPrice1;
                        } else {
                            tmp[0].price = tmp[0].price + pricetmp;
                        }
                    }
                }
                tmp[0].price = tmp[0].price + e.specialPrice1;
                if (totalNight > 1) {
                    tmp[0].price = tmp[0].price / totalNight;
                }
                setComTmp(tmp);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    return (
        <div className={cx('DetailHotel_Room')} key={props.key}>
            <h5>{props.categoryName}</h5>
            <div className={cx('row', 'DetailHotel_Room_inner')}>
                <div className={cx('col-md-4', 'DetailHotel_Room_Image')}>
                    <GalleryImage props={props.catePhotos} />
                </div>
                <div className={cx('col-md-8', 'DetailHotel_Room_Info')}>
                    {comTmp.map((tmp, index) => {
                        return (
                            <>
                                <div key={index}>
                                    <h5>{props.categoryName}</h5>
                                    <div className="row">
                                        <div className={cx('col-md-4', 'DetailHotel_Room_Info_Header')}>
                                            <img
                                                src={bedFront}
                                                alt="Bed"
                                                style={{ height: 30, width: 30, marginRight: 7 }}
                                            ></img>
                                            <span>{props.quanity} Giường </span>
                                        </div>
                                        <div className={cx('col-md-8', 'DetailHotel_Room_Info_Header_Right')}>
                                            <div>
                                                <img
                                                    src={guestIcon}
                                                    alt="Bed"
                                                    style={{ height: 30, width: 30, marginRight: 7 }}
                                                ></img>
                                                <span>{props.quanity * 2} Khách</span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="row">
                                        <div className={cx('col-md-4')}>
                                            {services.map((service) => {
                                                return (
                                                    <div
                                                        key={service.id}
                                                        className={cx(
                                                            service.have
                                                                ? 'DetailHotel_Room_Info_Service_Yes'
                                                                : 'DetailHotel_Room_Info_Service_No',
                                                        )}
                                                    >
                                                        <img
                                                            src={service.icon}
                                                            style={{ height: 16, width: 16, margin: 5 }}
                                                            alt=""
                                                        ></img>
                                                        <span>{service.title}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className={cx('col-md-4')}>
                                            {policys.map((policy) => {
                                                return (
                                                    <div
                                                        key={policy.id}
                                                        className={cx(
                                                            policy.have
                                                                ? 'DetailHotel_Room_Info_Service_Yes'
                                                                : 'DetailHotel_Room_Info_Service_No',
                                                        )}
                                                    >
                                                        <img
                                                            src={policy.icon}
                                                            style={{ height: 16, width: 16, margin: 5 }}
                                                            alt=""
                                                        ></img>
                                                        <span>{policy.title}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className={cx('col-md-4')}>
                                            <div className={cx('DetailHotel_Room_Info_Price')}>
                                                <del>
                                                    {(tmp.price * 1000 * 1.5).toLocaleString(undefined, {
                                                        maximumFractionDigits: 0,
                                                    })}{' '}
                                                    VNĐ
                                                </del>
                                                <span>
                                                    {(tmp.price * 1000).toLocaleString(undefined, {
                                                        maximumFractionDigits: 0,
                                                    })}{' '}
                                                    VNĐ
                                                </span>
                                                <i>/ phòng / đêm</i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('method')}>
                                        <div className={cx('method-btn')}>
                                            <button
                                                className={cx('DetailHotel_Room_Info_Button_AddCard')}
                                                onClick={() => {
                                                    handleAddNow({
                                                        price: tmp.price * totalNight,
                                                        title: props.categoryName,
                                                        quantity: props.quanity,
                                                        roomId: tmp.room,
                                                        hotelId: props.hotelId,
                                                        categoryId: props.categoryId,
                                                        categoryImg: props.catePhotos[0],
                                                        maxRoom: tmp.count,
                                                    });
                                                }}
                                            >
                                                Thêm phòng
                                            </button>
                                            <button
                                                className={cx('DetailHotel_Room_Info_Button')}
                                                onClick={() => {
                                                    handleBookNow({
                                                        price: tmp.price * totalNight,
                                                        title: props.categoryName,
                                                        quantity: props.quanity,
                                                        roomId: tmp.room[0],
                                                        hotelId: props.hotelId,
                                                    });
                                                }}
                                            >
                                                Đặt Ngay
                                            </button>
                                        </div>
                                        <div className={cx('method-btn')} style={{ justifyContent: 'center' }}>
                                            <i>Còn {tmp.count} phòng</i>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
