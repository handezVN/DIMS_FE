import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
export default function Banner() {
    const cx = classNames.bind(styles);
    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
    };
    return (
        <div>
            <div className={cx('container')}>
                <Slider {...settings} className={cx('Banner')}>
                    <div>
                        <img src="https://picsum.photos/1920/400?random=1" alt="banner"></img>
                    </div>
                    <div>
                        <img src="https://picsum.photos/1920/400?random=2" alt="banner2"></img>
                    </div>
                </Slider>
            </div>
        </div>
    );
}
