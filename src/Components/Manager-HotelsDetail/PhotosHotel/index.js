import React, { useEffect, useState } from 'react';

import { notification } from 'antd';
import axios from 'axios';
import * as HostApi from '../../../api/ManagerApi';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchHostFailed, dispatchHostFecth, dispatchHostSuccess } from '../../../redux/actions/authAction';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import Icon from '@mdi/react';
import { mdiCloseThick } from '@mdi/js';
export default function PhotosHotel({ hotelid }) {
    const cx = classNames.bind(styles);
    const [datas, setDatas] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [newPhotos, setNewPhotos] = useState([]);
    useEffect(() => {
        getPhoto();
    }, []);
    const auth = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();
    let urls = [];
    const showUpImage = (files) => {
        let uploadImgs = [];
        [...Array(files.length)].map((e, i) => {
            uploadImgs.push(URL.createObjectURL(files[i]));
        });
        setDatas([...datas, ...files]);
        setNewPhotos([...newPhotos, ...uploadImgs]);
    };
    const getPhoto = () => {
        dispatch(dispatchHostFecth());
        HostApi.getHotelPhotos(auth.token, hotelid)
            .then((result) => {
                setPhotos(result);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                dispatch(dispatchHostSuccess());
            });
    };
    const upLoadImage = () => {
        dispatch(dispatchHostFecth());
        const uploaders = [...Array(datas.length)].map((e, i) => {
            // Initial FormData
            const formData = new FormData();
            formData.append('file', datas[i]);
            // formData.append('tags', `codeinfuse, medium, gist`);
            formData.append('upload_preset', 'qhkvnmid'); // Replace the preset name with your own
            // formData.append('api_key', '1234567'); // Replace API key with your own Cloudinary key
            formData.append('timestamp', (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios
                .post('https://api.cloudinary.com/v1_1/demo-unihome/image/upload', formData, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                })
                .then((response) => {
                    const data = response.data;
                    urls.push({ hotelId: hotelid, photoUrl: data.url });
                });
        });

        // Once all the files are uploaded
        axios
            .all(uploaders)
            .then(() => {
                HostApi.addHotelPhotos(urls, auth.token).then(() => getPhoto(), setNewPhotos([]));
            })
            .catch(() => dispatch(dispatchHostFailed()))
            .finally(() => dispatch(dispatchHostSuccess()));
    };
    const handleDelete = (photoid) => {
        if (window.confirm('Bạn muốn xóa hình ảnh này ?')) {
            HostApi.RemovePhotos(photoid, auth.token).then(() => {
                openNotificationWithIcon('success', 'Success', 'Đã Xóa Thành Công .');
            });
            const newTmp = photos.filter((e) => e.photoId != photoid);
            setPhotos(newTmp);
        }
    };
    const handSetIsMain = (photoid) => {
        if (window.confirm('Bạn muốn đặt hình ảnh này làm hình đại diện cho khách sạn ?')) {
            HostApi.UpdateMainPhoto(hotelid, photoid, auth.token).then(() => {
                openNotificationWithIcon('success', 'Success', 'Đã Cập Nhật Thành Công .');
            });
        }
    };
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };
    const handleDeleteTmp = (number) => {
        const newTmp = newPhotos.filter((e, index) => index != number);
        const newData = datas.filter((e, index) => index != number);
        setNewPhotos(newTmp);
        setDatas(newData);
    };
    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>All Photos of Hotel</h3>
            <div className={cx('photos')}>
                {photos.map((photo, index) => {
                    return (
                        <div className={cx('Image_Container')} key={`${photo.photoId}Main`}>
                            <img src={photo.photoUrl} style={{ height: 200, width: 'auto' }}></img>
                            <div className={cx('middle')}>
                                <div className={cx('button')} onClick={() => handSetIsMain(photo.photoId)}>
                                    Set MainImage
                                </div>

                                <div className={cx('button')} onClick={() => handleDelete(photo.photoId)}>
                                    Delete
                                </div>
                            </div>
                        </div>
                    );
                })}
                {newPhotos.map((photo, index) => {
                    return (
                        <div className={cx('Image_Container')}>
                            <img src={photo} style={{ height: 200, width: 'auto' }} key={index}></img>
                            <div className={cx('middle')}>
                                <Icon
                                    path={mdiCloseThick}
                                    title="Delete Item"
                                    size={'30px'}
                                    horizontal
                                    vertical
                                    rotate={180}
                                    onClick={() => handleDeleteTmp(index)}
                                />
                            </div>
                        </div>
                    );
                })}
                <div>
                    {/* <div className={cx('plus', 'alt')}></div> */}
                    <input
                        type={'file'}
                        onChange={(e) => showUpImage(e.target.files)}
                        multiple
                        accept="image/*"
                        className={cx('addImage')}
                    ></input>
                </div>
            </div>
            {newPhotos.length > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
                    <button onClick={upLoadImage} className={cx('Save_Buton')}>
                        Save
                    </button>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
