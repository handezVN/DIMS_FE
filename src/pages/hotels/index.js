import classNames from 'classnames/bind';
import styles from './index.scss';
import moment from 'moment';
import { Slider, Radio, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import HotelItem from '../../Components/utils/HotelItem';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBox from '../../Components/utils/SearchBox';
import * as searchApi from '../../api/SearchApi';
import { useDispatch } from 'react-redux';
import { dispatchFecth, dispatchFailed, dispatchSuccess } from '../../redux/actions/authAction';
function Hotels() {
    const dispatch = useDispatch();
    const cx = classNames.bind(styles);
    const [valuefrom, setValueFrom] = useState(100000);
    const [valueto, setValueTo] = useState(5000000);
    // const [value, setValue] = useState(1);
    const [searchParams] = useSearchParams();
    // Get value on Params
    var checkinDate = moment().format('YYYY-MM-DD');
    if (searchParams.get('checkinDate')) {
        checkinDate = searchParams.get('checkinDate');
    }
    const night = searchParams.get('night') || 1;
    const namelocation = searchParams.get('namelocation') || 'Hồ Chí Minh';
    const locationtype = searchParams.get('type') || 'areas';

    const [hotels, setHotels] = useState([]);
    const [defaultHotels, setDefaultHotels] = useState([]);
    // Call API get Room
    useEffect(() => {
        dispatch(dispatchFecth());
        setHotels([]);
        searchApi
            .searchHotelbyLocation({
                type: locationtype,
                name: namelocation,
                night: night,
                date: checkinDate,
            })
            .then((data) => {
                setHotels(data);
                setDefaultHotels(data);
                dispatch(dispatchSuccess());
            })
            .catch((err) => dispatch(dispatchFailed()));
    }, [namelocation, locationtype, night, checkinDate, dispatch]);
    // Filter and Sort toggle for mobile media
    const [filter, setFilter] = useState(false);
    const [sort, setSort] = useState(false);
    const onChangeSelected = (e) => {
        console.log('radio checked', e.target.value);
    };
    function onChangeChecked(e) {
        console.log(` checked ${e.target.value}= ${e.target.checked} `);
    }
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const onAfterChange = (value: NewType | [number, number]) => {
        setValueFrom(value[0]);
        setValueTo(value[1]);
        const filtertmp = defaultHotels.filter(
            (hotel) => hotel.smallPrice * 1000 >= value[0] && hotel.smallPrice * 1000 <= value[1],
        );
        setHotels(filtertmp);
    };
    const [sortvalue, setSortValue] = useState(1);
    const handleSort = (e) => {
        setSortValue(e.target.value);
    };
    // Sort State
    useEffect(() => {
        const tmp = [...hotels];
        switch (sortvalue) {
            case 1:
                const tmp4 = [...tmp.sort((firstItem, secondItem) => secondItem.hotelId - firstItem.hotelId)];
                setHotels(tmp4);
                break;
            case 2:
                const tmp1 = [...tmp.sort((firstItem, secondItem) => firstItem.smallPrice - secondItem.smallPrice)];
                setHotels(tmp1);

                break;
            case 3:
                const tmp2 = [...tmp.sort((firstItem, secondItem) => secondItem.smallPrice - firstItem.smallPrice)];
                setHotels(tmp2);
                break;
            case 4:
                const tmp3 = [...tmp.sort((firstItem, secondItem) => secondItem.totalRate - firstItem.totalRate)];
                setHotels(tmp3);
                break;
            default:
                break;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortvalue]);
    //
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <SearchBox logo="false" location={namelocation} night={night} checkinDate={checkinDate} />

            <div className="hotelList__body">
                <div className="container">
                    <div className={cx('inner')}>
                        <div
                            className={cx(
                                'filter_box',
                                filter ? 'filter_box_open' : 'filter_box_close',
                                scrollPosition > 350 ? 'sticky' : '',
                            )}
                        >
                            <div className={cx('headerPopup')}>
                                Filter
                                <button style={{ border: 'none', backgroundColor: '#1890ff' }}>
                                    <i
                                        class="fa-solid fa-xmark"
                                        style={{ padding: 10 }}
                                        onClick={() => setFilter(!filter)}
                                    ></i>
                                </button>
                            </div>
                            <div className={cx('filter_box_body')}>
                                <div className="filterBox__item">
                                    <p className="filterBox__title">Filter Box</p>
                                </div>
                                <div className="filterBox__item">
                                    <p className="filterBox__title">Mức giá</p>
                                    <Slider
                                        range
                                        step={50000}
                                        defaultValue={[100000, 5000000]}
                                        onAfterChange={onAfterChange}
                                        min={100000}
                                        max={5000000}
                                    />
                                    <Radio.Group onChange={onChangeSelected} defaultValue={1}>
                                        <Radio style={radioStyle} value={1}>
                                            Giá từ {valuefrom.toLocaleString(undefined, { maximumFractionDigits: 0 })}{' '}
                                            tới {valueto.toLocaleString(undefined, { maximumFractionDigits: 0 })} VNĐ.
                                        </Radio>
                                        <Radio style={radioStyle} value={2}>
                                            Giá lớn {(5000000).toLocaleString(undefined, { maximumFractionDigits: 0 })}{' '}
                                            VNĐ
                                        </Radio>
                                    </Radio.Group>
                                </div>
                                <div className="filterBox__item">
                                    <div className="filterBox__checked">
                                        <p className="filterBox__title">Xếp hạng khách sạn</p>
                                        <Checkbox onChange={onChangeChecked} value={1} style={{ marginLeft: 8 }}>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </Checkbox>
                                        <Checkbox onChange={onChangeChecked} value={2}>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </Checkbox>
                                        <Checkbox onChange={onChangeChecked} value={3}>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </Checkbox>
                                        <Checkbox onChange={onChangeChecked} value={4}>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                        </Checkbox>
                                        <Checkbox onChange={onChangeChecked} value={5}>
                                            <i class="fa-solid fa-star"></i>
                                        </Checkbox>
                                    </div>
                                </div>
                                <div className="filterBox__item">
                                    <div className="filterBox__checked">
                                        <p className="filterBox__title">Tiện nghi</p>
                                        <div></div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'wifi'}>
                                                Wifi
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'pool'}>
                                                Hồ Bơi
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'parking'}>
                                                Chỗ Đậu Xe
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'restaurent'}>
                                                Nhà hàng
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'elevator'}>
                                                Thang máy
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'gym'}>
                                                Trung tâm thể dục
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'meeting'}>
                                                Phòng họp
                                            </Checkbox>
                                        </div>
                                    </div>
                                </div>
                                <div className="filterBox__item">
                                    <div className="filterBox__checked">
                                        <p className="filterBox__title">Tiện nghi</p>
                                        <div></div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'wifi'}>
                                                Wifi
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'pool'}>
                                                Hồ Bơi
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'parking'}>
                                                Chỗ Đậu Xe
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'restaurent'}>
                                                Nhà hàng
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'elevator'}>
                                                Thang máy
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'gym'}>
                                                Trung tâm thể dục
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'meeting'}>
                                                Phòng họp
                                            </Checkbox>
                                        </div>
                                    </div>
                                </div>
                                <div className="filterBox__item">
                                    <div className="filterBox__checked">
                                        <p className="filterBox__title">Loại hình lưu trú</p>
                                        <div></div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'hotel'}>
                                                Khách sạn
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'villa'}>
                                                Biệt Thự
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'homestay'}>
                                                Home Stay
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'apartment'}>
                                                Căn hộ
                                            </Checkbox>
                                        </div>
                                        <div className={cx('filterItem_Checkbox')}>
                                            <Checkbox onChange={onChangeChecked} value={'resort'}>
                                                Khu nghỉ dưỡng
                                            </Checkbox>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('hotels_box')}>
                            <div className={cx('hotels_box_title')}>
                                <h5>
                                    <Link to="/">
                                        <h5>{'Trang chủ >'}</h5>
                                    </Link>
                                    {namelocation} Tìm được : {hotels.length} Khách Sạn
                                </h5>
                                <hr></hr>
                            </div>
                            <div
                                className={cx('hotel-sort-box', sort ? 'hotel-sort-box-open' : '')}
                                onBlur={() => setSort(false)}
                            >
                                <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                                    <h5> Sắp xếp </h5>,
                                    {sort ? (
                                        <button style={{ border: 'none', backgroundColor: '#1890ff' }}>
                                            <i
                                                class="fa-solid fa-xmark"
                                                style={{ padding: 10 }}
                                                onClick={() => setSort(false)}
                                            ></i>
                                        </button>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <hr />
                                <div>
                                    <Radio.Group name="radiogroup" defaultValue={1} onChange={handleSort}>
                                        <div className={cx('sort-list')}>
                                            <div>
                                                <Radio value={1} className="sort-list-radio">
                                                    Được Gợi Ý
                                                </Radio>
                                            </div>
                                            <div>
                                                <Radio value={2} className="sort-list-radio">
                                                    Giá Thấp Nhất
                                                </Radio>
                                            </div>
                                            <div>
                                                <Radio value={3} className="sort-list-radio">
                                                    Giá Cao Nhất
                                                </Radio>
                                            </div>
                                            <div>
                                                <Radio value={4} className="sort-list-radio">
                                                    Đánh Giá Cao
                                                </Radio>
                                            </div>
                                        </div>
                                    </Radio.Group>
                                </div>
                            </div>
                            <div className="listHotel__item">
                                {hotels.length > 0 ? (
                                    hotels.map((hotel) => {
                                        return (
                                            <div key={hotel.hotelId}>
                                                <HotelItem
                                                    image={hotel.photos.map((photo) => {
                                                        if (photo.isMain) return photo.photoUrl;
                                                        return 'https://picsum.photos/200/300?random=1';
                                                    })}
                                                    name={hotel.hotelName}
                                                    address={hotel.hotelAddress}
                                                    oldPrice={hotel.smallPrice * 1500}
                                                    price={hotel.smallPrice * 1000}
                                                    id={hotel.hotelId}
                                                    province={namelocation}
                                                    checkinDate={checkinDate}
                                                    night={night}
                                                />
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>Các Khách Sạn Đã Hết Phòng !</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('hotelList__tab')}>
                <ul className={cx('hotelList__tab__list')}>
                    <button className={cx('hotelList__tab__item')} onClick={() => setFilter(!filter)}>
                        <li>Bộ Lọc</li>
                    </button>
                    <button className={cx('hotelList__tab__item')} onClick={() => setSort(!sort)}>
                        <li>Sắp Xếp</li>
                    </button>
                </ul>
            </div>
            <div className="jumbotron text-center">
                <h1>Hotels</h1>
                <p>Resize this responsive page to see the effect!</p>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <h3>Column 1</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                    <div className="col-sm-4">
                        <h3>Column 2</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                    <div className="col-sm-4">
                        <h3>Column 3</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hotels;
