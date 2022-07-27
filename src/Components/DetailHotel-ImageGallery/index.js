import React, { useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
export default function GalleryImage({ props, handleDelete, iconDelete }) {
    const cx = classNames.bind(styles);
    const images = [
        {
            original: 'https://picsum.photos/1920/1080?random=8',
            thumbnail: 'https://picsum.photos/1920/1080?random=8',
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
                {props.length > 0 ? (
                    props.map((image, index) => {
                        if (index <= 3) {
                            return (
                                <img
                                    importance="low"
                                    loading="lazy"
                                    decoding="async"
                                    width={287}
                                    height={144}
                                    style={{ objectFit: 'fill', objectPosition: '50% 50%' }}
                                    src={image.photoUrl}
                                    key={`${image.photoId}` || index}
                                    onClick={() => handleOpenImage(index)}
                                    alt=""
                                />
                            );
                        } else {
                            return null;
                        }
                    })
                ) : (
                    <img
                        importance="low"
                        loading="lazy"
                        decoding="async"
                        width={287}
                        height={144}
                        style={{ objectFit: 'fill', objectPosition: '50% 50%' }}
                        src={images[0].thumbnail}
                        alt=""
                    />
                )}
            </div>
            <div className={cx('numbers_Image')}>
                <span>1/{props.length}</span>
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
                    {iconDelete ? (
                        <div className={cx('Image_Container')}>
                            <img
                                src={props.length > 0 ? props[indexImage].photoUrl : images[0].original}
                                alt="hello"
                            ></img>
                            <div
                                className={cx('middle')}
                                onClick={() => {
                                    if (window.confirm('Bạn muốn xóa hình ảnh này ?')) {
                                        const tmp = parseInt(indexImage);
                                        setIndexImage(indexImage - 1);
                                        handleDelete(indexImage);
                                    }
                                }}
                            >
                                Xóa{' '}
                                <Icon
                                    path={mdiDelete}
                                    title="Delete Item"
                                    size={'60px'}
                                    horizontal
                                    vertical
                                    rotate={180}
                                />
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
                <div className={cx('gallery_thumnail')}>
                    {props.map((image, index) => {
                        return (
                            <img
                                style={{ objectFit: 'fill', objectPosition: '50% 50%' }}
                                src={image.photoUrl}
                                key={`${image.photoId}`}
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
