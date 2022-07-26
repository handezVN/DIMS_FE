import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
export default function GalleryImage(props) {
    const cx = classNames.bind(styles);
    const images = [
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1018/1000/600/',
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1015/1000/600/',
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: 'https://picsum.photos/id/1019/1000/600/',
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];
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
                setIndexImage(images.length - 1);
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
            if (indexImage === images.length - 1) {
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
    return (
        <div>
            <div className={cx('DetailHotel_Room_Image')}>
                {images.map((image, index) => {
                    if (index <= 3) {
                        return (
                            <img
                                importance="low"
                                loading="lazy"
                                decoding="async"
                                width={287}
                                height={144}
                                style={{ objectFit: 'fill', objectPosition: '50% 50%' }}
                                src={image.thumbnail}
                                key={index}
                                onClick={() => handleOpenImage(index)}
                            />
                        );
                    } else {
                        return;
                    }
                })}
            </div>
            <div className={cx('numbers_Image')}>
                <span>1/{images.length}</span>
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
                    <img src={images[indexImage].original} alt="hello"></img>
                </div>
                <div className={cx('gallery_thumnail')}>
                    {images.map((image, index) => {
                        return (
                            <img
                                style={{ objectFit: 'fill', objectPosition: '50% 50%' }}
                                src={image.original}
                                key={index}
                                onClick={() => handleOpenImage(index)}
                                className={cx(indexImage === index ? 'selected' : '')}
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
