/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './hotelDetail.module.scss';
import classNames from 'classnames/bind';
import Feature_Icon from '../../Components/DetailHotel-Feature-Icon';
import RoomType from '../../Components/DetailHotel-Room';
import { useNavigate } from 'react-router-dom';
import * as SearchApi from '../../api/SearchApi';
import { useDispatch } from 'react-redux';
import { dispatchFecth, dispatchFailed, dispatchSuccess } from '../../redux/actions/authAction';
import { createContext } from 'react';
import GalleryMainImage from '../../Components/DetailHotel-MainImageGallery';
export const roomContext = createContext();
export default function HotelDetail() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const [Params] = useSearchParams();
    const navigator = useNavigate();
    // // UseState and set Params
    // eslint-disable-next-line
    const [checkinDate, setCheckInDate] = useState(Params.get('ArrivalDate')); // eslint-disable-next-line
    const [night, setNight] = useState(Params.get('TotalNight') || 1); // eslint-disable-next-line
    const [peopleQuanity, setPeopleQuanity] = useState(Params.get('peopleQuanity') || 1); // eslint-disable-next-line
    const hotelid = Params.get('hotelId');
    // UseState
    const [hotel, setHotel] = useState({});
    const [listImages, setListImages] = useState([]);
    const [roomSmallPrice, setRoomSmallPrice] = useState({});
    let list = [];
    // Call API
    useEffect(() => {
        // Fetch API
        dispatch(dispatchFecth());
        SearchApi.searchAvaiableHotel({
            hotelid: hotelid,
            quantity: peopleQuanity,
            date: checkinDate,
            night: night,
        })
            .then((data) => {
                setHotel(data);
                setListImages(data.photos);
                let tmp_price = {
                    categoryname: '',
                    price: 200000,
                    roomid: '',
                };
                data.lsCate.forEach((cate) => {
                    cate.rooms.forEach((room) => {
                        if (room.roomPrice < tmp_price.price)
                            tmp_price = {
                                categoryname: cate.categoryName,
                                price: room.roomPrice,
                                roomid: room.roomId,
                            };
                    });
                });
                setRoomSmallPrice(tmp_price);
                dispatch(dispatchSuccess());
            })
            .catch((err) => dispatch(dispatchFailed()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotelid, checkinDate, night, peopleQuanity]);
    useEffect(() => {
        // Add All Image to List

        if (hotel.hotelName) {
            hotel.lsCate.forEach((element, index) => {
                element.catePhotos.forEach((photo, index) => {
                    list.push(photo);
                });
            });
            setListImages([...listImages, ...list]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotel]);

    // Get height and width off screen
    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    });

    const detectSize = () => {
        detectHW({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', detectSize);

        return () => {
            window.removeEventListener('resize', detectSize);
        };
    }, [windowDimenion]);
    // Gallary
    const features = [
        {
            url: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301285653-0a04df7d3f807b32484ceec10d9681c6.png',
            title: 'Máy Lạnh',
        },
        {
            url: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833794378-eb51eee62d46110b712e327108299ea6.png',
            title: 'Nhà Hàng',
        },
        {
            url: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833772013-929572dff57d1755878aa79dc46e6be5.png',
            title: 'Hồ Bơi',
        },
        {
            url: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2016/12/21/1482301381776-c014a3111a6de5236d903c93b7647e4c.png',
            title: 'Lễ Tân',
        },
        {
            url: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833756238-56e24fb64a964d38b8f393bf093a77a9.png',
            title: 'Chỗ Đậu Xe',
        },
        {
            url: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833714411-48c9b7565018d02dc32837738df1c917.png',
            title: 'Thang Máy',
        },
        {
            url: 'https://s3-ap-southeast-1.amazonaws.com/cntres-assets-ap-southeast-1-250226768838-cf675839782fd369/imageResource/2017/06/07/1496833833458-7b6ab67bc5df6ef9f2caee150aae1f43.png',
            title: 'WiFi',
        },
    ];
    // Scroll Focus
    const scrolltoRoom = () => {
        const e = document.getElementById('rooms');
        e.scrollIntoView();
    };
    return (
        <div>
            <div className={cx('container_body')}>
                <div className={cx('detailHotel')}>
                    <div className="d-flex">
                        <Link to="/">
                            <h6>Trang Chủ {`>`} </h6>
                        </Link>
                        <div onClick={() => navigator(-1)}>
                            <h6>
                                {hotel.provinceName} {'>'}
                            </h6>
                        </div>
                        <div>
                            <h6>{hotel.hotelName}</h6>
                        </div>
                    </div>
                    <hr></hr>

                    {/* <h6 style={{ color: 'grey' }}>{hotel.hotelName}</h6> */}
                    <h3>{hotel.hotelName}</h3>
                    <div className={cx('detailHotel_Type')}>
                        <div className={cx('hotelType')}>Khách sạn</div>
                        <div className={cx('star')}>
                            {Array.from({ length: hotel.star }, (e) => {
                                return <i className="fa-solid fa-star"></i>;
                            })}
                        </div>
                    </div>
                    <div className={cx('detailHotel_Type')}>
                        <i className="fa-solid fa-location-dot" style={{ marginRight: 10 }}></i>
                        <span>{hotel.hotelAddress}</span>
                    </div>
                    <hr></hr>
                    <div className={cx('gallery_image')}>
                        <GalleryMainImage list={listImages}></GalleryMainImage>
                    </div>
                    <hr></hr>
                    <div className={cx('detailHotel_Rate-Price')}>
                        <div>
                            <h3>{roomSmallPrice.categoryname}</h3>
                            <h5 style={{ color: 'rgba(1,148,243,1.00)' }}>{hotel.totalRate} Điểm Ấn Tượng</h5>
                            <h6>Đánh giá từ 125 du khách</h6>
                        </div>
                        <div className={cx('detailHotel_Price')}>
                            <h3>Giá phòng mỗi đêm từ</h3>
                            <div>
                                <del>
                                    {(roomSmallPrice.price * 1000 * 1.5).toLocaleString(undefined, {
                                        maximumFractionDigits: 0,
                                    })}{' '}
                                    VNĐ
                                </del>
                                <br />
                                <span color="red">
                                    {(roomSmallPrice.price * 1000).toLocaleString(undefined, {
                                        maximumFractionDigits: 0,
                                    })}{' '}
                                    VNĐ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('detailHotel_Btn')}>
                        <button className={cx('detailHotel_Btn-Book')} onClick={scrolltoRoom}>
                            Đặt Ngay
                        </button>
                    </div>
                    <hr></hr>
                    <div className={cx('detailHotel_Feature')}>
                        <h5 className={cx('detailHotel_Feature_Title')}>Tiện Nghi Khách Sạn</h5>
                        <div className={cx('detailHotel_Feature_Icons')}>
                            <Feature_Icon url={features[0].url} title={features[0].title} />
                            <Feature_Icon url={features[1].url} title={features[1].title} />
                            <Feature_Icon url={features[2].url} title={features[2].title} />
                            <Feature_Icon url={features[3].url} title={features[2].title} />
                            <Feature_Icon url={features[4].url} title={features[2].title} />
                            <Feature_Icon url={features[5].url} title={features[2].title} />
                            <Feature_Icon url={features[6].url} title={features[2].title} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('container_body')}>
                <roomContext.Provider
                    value={{
                        date: checkinDate,
                        night: night,
                        hotelname: hotel.hotelName,
                        hotelAddress: hotel.hotelAddress,
                        hotelImg: listImages,
                    }}
                >
                    <div className={cx('DetailHotel_Rooms')} id="rooms">
                        {hotel.lsCate
                            ? hotel.lsCate.map((cate, index) => {
                                  if (cate.rooms.length > 0) {
                                      return (
                                          <RoomType
                                              props={cate}
                                              checkinDate={checkinDate}
                                              totalNight={night}
                                              key={index}
                                          />
                                      );
                                  }
                              })
                            : ''}
                    </div>
                </roomContext.Provider>
            </div>
        </div>
    );
}
