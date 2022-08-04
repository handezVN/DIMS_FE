import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import classNames from 'classnames/bind';
import GalleryImage from '../../../DetailHotel-ImageGallery';
import bedFront from '../../../../asset/bed-front.png';
import guestIcon from '../../../../asset/guest.png';
import * as Api from '../../../../api/ManagerApi';
import { notification } from 'antd';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import { useDispatch } from 'react-redux';
import { dispatchHostSuccess, dispatchHostFailed, dispatchHostFecth } from '../../../../redux/actions/authAction';
import axios from 'axios';
export default function CategoryType({ data, hotelId, addnew, iconDelete, handleDeleteCategory }) {
    const dispatch = useDispatch();
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
    const [datas, setDatas] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [newPhotos, setNewPhotos] = useState([]);
    const cx = classNames.bind(styles);
    // const [count, setCount] = useState(0);
    const [edit, setEdit] = useState(addnew || false);
    const [categoryName, setCategoryName] = useState('');
    const [cateDescrpittion, setCateDescrpittion] = useState('');
    const [priceDefault, setPriceDefault] = useState(100);
    const [quanity, setQuanity] = useState(1);
    const auth = JSON.parse(localStorage.getItem('user'));
    const refresh = () => {
        if (data) {
            setPhotos(data.photos);
            setCategoryName(data.categoryName);
            setCateDescrpittion(data.cateDescrpittion);
            setPriceDefault(data.priceDefault);
            setQuanity(data.quanity);
        }
    };
    useEffect(() => {
        refresh();
    }, []); //react-hooks/exhaustive-deps
    const openNotificationWithIcon = (type, message, description) => {
        notification[type]({
            message: message,
            description: description,
        });
    };

    const handleDelete = (number) => {
        const photoid = photos[number].photoId;
        Api.RemovePhotos(photoid, auth.token).then(() => {
            openNotificationWithIcon('success', 'Success', 'Đã Xóa Thành Công .');
        });
        const newPhotos = photos.filter((e) => e.photoId != photoid);
        setPhotos(newPhotos);
    };
    const handleButton = () => {
        let flag = true;
        let msg = '';
        if (categoryName.length < 1) {
            msg = msg + 'Vui lòng không để trống tên loại phòng .';
            flag = false;
        }
        if (quanity < 1) {
            flag = false;
            msg = msg + 'Số lượng giường cần phải lớn hơn 1 .';
        }
        if (priceDefault < 50) {
            flag = false;
            msg = msg + 'Phòng của bạn quá rẻ ! Ít nhất phải lớn hơn 50k';
        }
        if (flag) {
            if (addnew) {
                dispatch(dispatchHostFecth());
                Api.AddHotelCategory({
                    token: auth.token,
                    hotelId: hotelId,
                    categoryName: categoryName,
                    cateDescrpittion: cateDescrpittion,
                    priceDefault: priceDefault,
                    quanity: quanity,
                })
                    .then(() => {
                        openNotificationWithIcon('success', 'Success', 'Đã Cập nhật thành công');
                        dispatch(dispatchHostSuccess());
                    })
                    .catch((err) => {
                        dispatch(dispatchHostFailed());
                        openNotificationWithIcon('error', 'Failed', 'Đã có lỗi xảy ra khi cập nhật !');
                    });
            } else if (edit) {
                Api.UpdateHotelCategory({
                    token: auth.token,
                    hotelId: hotelId,
                    categoryId: data.categoryId,
                    categoryName: categoryName,
                    cateDescrpittion: cateDescrpittion,
                    priceDefault: priceDefault,
                    quanity: quanity,
                })
                    .then(() => {
                        openNotificationWithIcon('success', 'Success', 'Đã Cập nhật thành công');
                    })
                    .catch((err) => {
                        console.log(err);
                        openNotificationWithIcon('error', 'Failed', 'Đã có lỗi xảy ra khi cập nhật !');
                    });
            }
            setEdit(!edit);
        } else {
            openNotificationWithIcon('warning', 'Warning', msg);
        }
    };
    const showUpImage = (files) => {
        let uploadImgs = [];
        let uploadImgs2 = [];
        [...Array(files.length)].forEach((e, i) => {
            uploadImgs.push(URL.createObjectURL(files[i]));
            uploadImgs2.push({ photoUrl: URL.createObjectURL(files[i]) });
        });
        setDatas([...datas, ...files]);
        setPhotos([...photos, ...uploadImgs2]);
        setNewPhotos([...newPhotos, ...uploadImgs2]);
    };

    let urls = [];
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
                    urls.push({ photoUrl: data.url });
                });
        });

        // Once all the files are uploaded
        axios
            .all(uploaders)
            .then(() => {
                Api.addCategoryPhotos(hotelId, data.categoryId, urls, auth.token)
                    .then(() => {
                        openNotificationWithIcon('success', 'Success', 'Đã Cập nhật thành công');
                    })
                    .catch((err) => {
                        console.log(err);
                        openNotificationWithIcon('error', 'Failed', 'Đã có lỗi xảy ra khi cập nhật !');
                    });
            })
            .catch(() => dispatch(dispatchHostFailed()))
            .finally(() => dispatch(dispatchHostSuccess()));
    };

    return (
        <div>
            <div className={cx('DetailHotel_Room')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h5>{categoryName}</h5>
                    <Icon
                        path={mdiDelete}
                        title="Delete Item"
                        size={'30px'}
                        horizontal
                        vertical
                        rotate={180}
                        onClick={() => handleDeleteCategory(data.categoryId)}
                    />
                </div>
                <div className={cx('row', 'DetailHotel_Room_inner')}>
                    <div className={cx('col-md-4', 'DetailHotel_Room_Image')}>
                        <GalleryImage props={photos} iconDelete={true} handleDelete={handleDelete} />

                        {addnew ? (
                            <></>
                        ) : (
                            <div className={cx('AddImage')}>
                                <div className={cx('AddImage-Btn')}>
                                    Thêm hình ảnh
                                    <input
                                        type={'file'}
                                        multiple
                                        className={cx('inputFile')}
                                        onChange={(e) => showUpImage(e.target.files)}
                                    ></input>
                                </div>
                            </div>
                        )}
                        {newPhotos.length > 0 ? (
                            <div className={cx('AddImage')} onClick={() => upLoadImage()}>
                                <div className={cx('AddImage-Btn')}>Save</div>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    <div className={cx('col-md-8', 'DetailHotel_Room_Info')}>
                        <div>
                            {edit ? (
                                <input
                                    placeholder="Category Name"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 600,
                                        color: 'black',
                                    }}
                                ></input>
                            ) : (
                                <h5>{categoryName}</h5>
                            )}
                            <div className="row">
                                <div className={cx('col-md-4', 'DetailHotel_Room_Info_Header')}>
                                    <img
                                        src={bedFront}
                                        alt="Bed"
                                        style={{ height: 30, width: 30, marginRight: 7 }}
                                    ></img>
                                    {edit ? (
                                        <div>
                                            <input
                                                value={quanity}
                                                onChange={(e) => setQuanity(e.target.value)}
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: 600,
                                                    color: 'black',
                                                    width: 50,
                                                }}
                                            ></input>{' '}
                                            Giường
                                        </div>
                                    ) : (
                                        <span>{quanity} Giường</span>
                                    )}
                                </div>
                                <div className={cx('col-md-8', 'DetailHotel_Room_Info_Header')}>
                                    <img
                                        src={guestIcon}
                                        alt="Bed"
                                        style={{ height: 30, width: 30, marginRight: 7 }}
                                    ></img>
                                    <span>{quanity * 2} Khách</span>
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
                                            {(priceDefault * 1000 * 1.5).toLocaleString(undefined, {
                                                maximumFractionDigits: 0,
                                            })}{' '}
                                            VNĐ
                                        </del>
                                        {edit ? (
                                            <div>
                                                <input
                                                    type={'number'}
                                                    value={priceDefault}
                                                    onChange={(e) => setPriceDefault(e.target.value)}
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: 600,
                                                        color: 'black',
                                                        width: 150,
                                                    }}
                                                ></input>{' '}
                                                VNĐ
                                            </div>
                                        ) : (
                                            <span>
                                                {(priceDefault * 1000).toLocaleString(undefined, {
                                                    maximumFractionDigits: 0,
                                                })}{' '}
                                                VNĐ
                                            </span>
                                        )}

                                        <i>/ phòng / đêm</i>
                                        <button
                                            className={cx('DetailHotel_Room_Info_Button')}
                                            onClick={() => handleButton()}
                                        >
                                            {addnew ? 'Thêm Loại Phòng' : edit ? 'Cập Nhật' : 'Chỉnh Sửa'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        {edit ? (
                            <div>
                                <textarea
                                    value={cateDescrpittion}
                                    onChange={(e) => setCateDescrpittion(e.target.value)}
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 600,
                                        color: 'black',
                                        width: '100%',
                                    }}
                                ></textarea>{' '}
                            </div>
                        ) : (
                            <div>{cateDescrpittion}</div>
                        )}
                    </div>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}
