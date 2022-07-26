import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import GalleryImage from '../DetailHotel-ImageGallery';
import bedFront from '../../asset/bed-front.png';
import guestIcon from '../../asset/guest.png';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { roomContext } from '../../pages/hotelDetail';
export default function RoomType(props) {
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
            title: title,
            quantity: quantity,
            room: [roomId],
            hotelId: hotelId,
        };
        localStorage.setItem('booking', JSON.stringify(newContext));

        navigator('/payment/step1');
    };

    // const [count, setCount] = useState(0);
    const [comTmp, setComTmp] = useState([]);

    useEffect(() => {
        let flag = true;
        let tmp = [];
        if (props.props.rooms.length > 0) {
            props.props.rooms.map((room, index) => {
                if (tmp.length < 1) {
                    tmp.push({
                        description: room.roomDescription,
                        price: room.roomPrice,
                        count: 1,
                        room: [{ roomId: room.roomId }],
                    });
                } else {
                    const tmp_index = tmp.map((check, index) => {
                        flag = true;
                        if (check.price !== room.roomPrice) flag = false;
                        if (check.description !== room.roomDescription) flag = false;
                        if (flag) return index;
                        return null;
                    });

                    if (!flag) {
                        tmp.push({
                            description: room.roomDescription,
                            price: room.roomPrice,
                            count: 1,
                            room: [{ roomId: room.roomId }],
                        });
                    } else {
                        tmp[tmp_index].count = tmp[tmp_index].count + 1;
                        const abc = tmp[tmp_index].room;

                        tmp[tmp_index].room = [...abc, { roomId: room.roomId }];
                    }
                }

                setComTmp(tmp);
                // tmp.push(index);
                return null;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.props]);

    return (
        <div className={cx('DetailHotel_Room')} key={props.key}>
            <h5>{props.props.categoryName}</h5>
            <div className={cx('row', 'DetailHotel_Room_inner')}>
                <div className={cx('col-md-4', 'DetailHotel_Room_Image')}>
                    <GalleryImage list={props.props.catePhotos} />
                </div>
                <div className={cx('col-md-8', 'DetailHotel_Room_Info')}>
                    {comTmp.map((tmp, index) => {
                        return (
                            <>
                                <div key={index}>
                                    <h5>{props.props.categoryName}</h5>
                                    <div className="row">
                                        <div className={cx('col-md-4', 'DetailHotel_Room_Info_Header')}>
                                            <img
                                                src={bedFront}
                                                alt="Bed"
                                                style={{ height: 30, width: 30, marginRight: 7 }}
                                            ></img>
                                            <span>{props.props.quanity} Giường </span>
                                        </div>
                                        <div className={cx('col-md-8', 'DetailHotel_Room_Info_Header')}>
                                            <img
                                                src={guestIcon}
                                                alt="Bed"
                                                style={{ height: 30, width: 30, marginRight: 7 }}
                                            ></img>
                                            <span>{props.props.quanity * 2} Khách</span>
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
                                                <button
                                                    className={cx('DetailHotel_Room_Info_Button')}
                                                    onClick={() => {
                                                        handleBookNow({
                                                            price: tmp.price,
                                                            title: props.props.categoryName,
                                                            quantity: props.props.quanity,
                                                            roomId: tmp.room[0],
                                                            hotelId: props.props.hotelId,
                                                        });
                                                    }}
                                                >
                                                    Đặt Ngay
                                                </button>
                                                <i>Còn {tmp.count} phòng</i>
                                            </div>
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
