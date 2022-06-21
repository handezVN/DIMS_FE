import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import GalleryImage from '../DetailHotel-ImageGallery';
import bedFront from '../../../asset/bed-front.png';
import guestIcon from '../../../asset/guest.png';
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

    // const [count, setCount] = useState(0);
    const [comTmp, setComTmp] = useState([]);
    const [flag, setFlag] = useState(true);
    useEffect(() => {
        if (props.props.rooms.length > 0) {
            props.props.rooms.map((room) => {
                if (comTmp.length < 1) {
                    setComTmp([
                        {
                            price: room.price,
                            description: room.roomDescription,
                            count: 1,
                        },
                    ]);
                } else {
                    const newState = comTmp.map((item, index) => {
                        setFlag(true);
                        if (item.price !== room.price) setFlag(false);
                        if (item.description !== room.roomDescription) setFlag(false);
                        if (flag) {
                            return { ...item, count: item.count++ };
                        } else {
                            setComTmp([
                                ...comTmp,
                                {
                                    price: room.price,
                                    description: room.roomDescription,
                                    count: 1,
                                },
                            ]);
                        }
                        return item;
                    });
                    setComTmp(newState);
                }
                return null;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.props]);

    return (
        <div className={cx('DetailHotel_Room')}>
            <h5>{props.props.categoryName}</h5>
            <div className={cx('row', 'DetailHotel_Room_inner')}>
                <div className={cx('col-md-4', 'DetailHotel_Room_Image')}>
                    <GalleryImage list={props.props.catePhotos} />
                </div>
                <div className={cx('col-md-8', 'DetailHotel_Room_Info')}>
                    {comTmp.map((tmp) => {
                        return (
                            <>
                                <div>
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
                                                <button className={cx('DetailHotel_Room_Info_Button')}>Đặt Ngay</button>
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
