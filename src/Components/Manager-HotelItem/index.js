import React, { useEffect } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import GalleryMainImage from '../DetailHotel-MainImageGallery';
import Feature_Icon from '../DetailHotel-Feature-Icon';
import { useNavigate } from 'react-router-dom';
export default function HotelItem({ hotel }) {
    const navigation = useNavigate();
    const cx = classNames.bind(styles);
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
    const handleEdit = () => {
        navigation(`/mananger/hotels/detailHotels?hotelid=${hotel.hotelId}`);
    };
    return (
        <div className={cx('container_body')}>
            <div className={cx('detailHotel')}>
                {/* <h6 style={{ color: 'grey' }}>{hotel.hotelName}</h6> */}
                <h3>{hotel.hotelName}</h3>
                <div className={cx('detailHotel_Type')}>
                    <div className={cx('hotelType')}>Khách sạn</div>
                    <div className={cx('star')}>
                        {[...Array(hotel.star)].map((e, i) => (
                            <i class="fa-solid fa-star"></i>
                        ))}
                    </div>
                </div>
                <div className={cx('detailHotel_Type')}>
                    <i className="fa-solid fa-location-dot" style={{ marginRight: 10 }}></i>
                    <span>{hotel.hotelAddress}</span>
                </div>
                <hr></hr>
                <div className={cx('gallery_image')}>
                    <GalleryMainImage list={hotel.photos}></GalleryMainImage>
                </div>
                <hr></hr>
                <div className={cx('detailHotel_Rate-Price')}>
                    <div>
                        <h3></h3>
                        <h5 style={{ color: 'rgba(1,148,243,1.00)' }}>{hotel.totalRate} Điểm Ấn Tượng</h5>
                        <h6>Đánh giá từ 125 du khách</h6>
                    </div>
                </div>
                <div className={cx('detailHotel_Btn')}>
                    <button className={cx('detailHotel_Btn-Book')} onClick={handleEdit}>
                        Chỉnh Sửa
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
    );
}
