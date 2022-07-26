import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
export default function GalleryMainImage(props) {
    const cx = classNames.bind(styles);
    const [indexImage, setIndexImage] = useState(0);
    const [gallery, setGallery] = useState(false);
    const handleOpenImage = (e) => {
        setIndexImage(e);
        setGallery(true);
    };
    const [slideLeft, setSlideLeft] = useState(false);
    const [slideRight, setSlideRight] = useState(false);
    const [slideLeft_S1, setSlideLeft_S1] = useState(false);
    const [slideRight_S1, setSlideRight_S1] = useState(false);
    const handlePrevious = () => {
        setSlideLeft_S1(true);
        setTimeout(() => {
            setSlideLeft_S1(false);
            if (indexImage === 0) {
                setIndexImage(props.list.length - 1);
            } else {
                setIndexImage(indexImage - 1);
            }
            setSlideLeft(true);
        }, 500);
        setTimeout(() => {
            setSlideLeft(false);
        }, 1000);
    };
    const handleNext = () => {
        setSlideRight_S1(true);
        setTimeout(() => {
            setSlideRight_S1(false);
            if (indexImage === props.list.length - 1) {
                setIndexImage(0);
            } else {
                setIndexImage(indexImage + 1);
            }
            setSlideRight(true);
        }, 500);
        setTimeout(() => {
            setSlideRight(false);
        }, 1000);
    };
    if (props.list.length > 0) {
        return (
            <div>
                <div className="row">
                    <div className={cx('col-md-9', 'gallery_image-main')} onClick={() => setGallery(!gallery)}>
                        <img src={props.list[0].photoUrl || props.list[1].photoUrl} alt=""></img>
                    </div>
                    <div className={cx('col-md-3', 'gallery_image-thumnail')}>
                        {props.list.map((image, index) => {
                            if (index < 3)
                                return (
                                    <div key={`${index}main`} className={cx('gallery_image-thumnail-item')}>
                                        <div
                                            className={cx(index === 2 ? 'viewAll' : 'hidden')}
                                            onClick={() => setGallery(!gallery)}
                                        >
                                            Xem toàn bộ
                                        </div>
                                        <img src={image.photoUrl} alt="" onClick={() => setGallery(!gallery)}></img>
                                    </div>
                                );
                            return <></>;
                        })}
                    </div>
                </div>

                <div className={cx('gallery', gallery ? 'show' : '')}>
                    <div className={cx('control_close')} onClick={() => setGallery(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div
                        className={cx(
                            'gallery_inner',
                            slideLeft ? 'animation_slideLeft' : '',
                            slideRight ? 'animation_slideRight' : '',
                            slideLeft_S1 ? 'animation_slideLeft_S1' : '',
                            slideRight_S1 ? 'animation_slideRight_S1' : '',
                        )}
                    >
                        <img src={props.list[indexImage].photoUrl} alt="hello"></img>
                    </div>
                    <div className={cx('gallery_thumnail')}>
                        {props.list.map((image, index) => {
                            return (
                                <img
                                    style={{ objectFit: 'fill', objectPosition: '50% 50%' }}
                                    src={image.photoUrl}
                                    key={`Thumnailmain${index}`}
                                    onClick={() => handleOpenImage(index)}
                                    className={cx(indexImage === index ? 'selected' : '')}
                                    alt=""
                                ></img>
                            );
                        })}
                    </div>
                    <div className={cx('control_prev')}>
                        <i className="fa-solid fa-chevron-left" onClick={handlePrevious}></i>
                    </div>
                    <div className={cx('control_next')}>
                        <i className="fa-solid fa-chevron-right" onClick={handleNext}></i>
                    </div>
                </div>
            </div>
        );
    }
    return <></>;
}
