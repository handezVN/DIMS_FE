import { React, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { DatePicker, Input } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import * as searchApi from '../../../api/SearchApi';
export default function SearchBox(props) {
    const cx = classNames.bind(styles);
    const { RangePicker } = DatePicker;
    const [search, setSearch] = useState(props.location || '');
    const [suggest, setSuggest] = useState(false);
    const [checkinDate, setCheckInDate] = useState(props.checkinDate || moment().format('YYYY-MM-DD'));
    const [night, setNight] = useState(props.night || 1);
    const [namelocation, setNameLocation] = useState(props.location || '');
    const [isInput, setIsInput] = useState(false);
    const [locationType, setLocationType] = useState(props.locationtype || 'areas');
    const [hotels, setHotels] = useState([]);
    function disabledDate(current) {
        return current <= moment().subtract(1, 'days');
    }
    const navigate = useNavigate();
    const dateFormat = 'YYYY-MM-DD';
    const defaultLocation = [
        { id: '01', name: 'Thành phố Hà Nội', type: 'Thành phố ' },
        { id: '79', name: 'Thành phố Hồ Chí Minh', type: 'Thành phố ' },
        { id: '77', name: 'Tỉnh Bà Rịa - Vũng Tàu', type: 'Tỉnh' },
    ];
    const handleChangeInput = (e) => {
        setSearch(e.target.value);
        setIsInput(true);
        setTimeout(() => {
            setIsInput(false);
        }, 200);
    };
    useEffect(() => {
        setTimeout(() => {
            if (!isInput) {
                if (search.length > 1) {
                    searchApi
                        .searchLocation(search)
                        .then((data) => {
                            setLocations(data.areas);
                            setHotels(data.hotels);
                        })
                        .catch((err) => console.log(err));
                }
            }
        }, 200);
        if (search.length < 2) {
            setLocations(defaultLocation);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, isInput]);
    const [locations, setLocations] = useState(defaultLocation);

    // setSuggest(false)
    const handleSelect = ({ select, type }) => {
        setSearch(select.name || select.hotelName);
        setSuggest(false);
        setNameLocation(select.name || select.hotelName);
        setLocationType(type);
    };
    const handleBlur = () => {
        setTimeout(() => {
            setSuggest(false);
        }, 300);
    };

    return (
        <div>
            <div className={cx('Search-box')}>
                <div className={cx('container')}>
                    <div className={cx('btn-hotels', props.logo ? 'btn-hide' : '')}>
                        <button
                            id="btnHotel"
                            type="button"
                            className={cx('btn-hotel')}
                            onClick={() => console.log('Search ngay')}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="24"
                                viewBox="0 0 25 24"
                                fill="none"
                            >
                                <g clipPath="url(#clip0)">
                                    <path
                                        d="M13.53 1.87022L2.54 0.200225C2.03 0.120225 1.51 0.260225 1.12 0.590224C0.73 0.930224 0.5 1.42022 0.5 1.93022V23.0002C0.5 23.5502 0.95 24.0002 1.5 24.0002H4.75V18.7502C4.75 17.7802 5.53 17.0002 6.5 17.0002H9C9.97 17.0002 10.75 17.7802 10.75 18.7502V24.0002H15V3.60022C15 2.74022 14.38 2.01022 13.53 1.87022ZM6 14.7502H4.5C4.086 14.7502 3.75 14.4142 3.75 14.0002C3.75 13.5862 4.086 13.2502 4.5 13.2502H6C6.414 13.2502 6.75 13.5862 6.75 14.0002C6.75 14.4142 6.414 14.7502 6 14.7502ZM6 11.7502H4.5C4.086 11.7502 3.75 11.4142 3.75 11.0002C3.75 10.5862 4.086 10.2502 4.5 10.2502H6C6.414 10.2502 6.75 10.5862 6.75 11.0002C6.75 11.4142 6.414 11.7502 6 11.7502ZM6 8.75022H4.5C4.086 8.75022 3.75 8.41422 3.75 8.00022C3.75 7.58622 4.086 7.25022 4.5 7.25022H6C6.414 7.25022 6.75 7.58622 6.75 8.00022C6.75 8.41422 6.414 8.75022 6 8.75022ZM6 5.75022H4.5C4.086 5.75022 3.75 5.41422 3.75 5.00022C3.75 4.58622 4.086 4.25022 4.5 4.25022H6C6.414 4.25022 6.75 4.58622 6.75 5.00022C6.75 5.41422 6.414 5.75022 6 5.75022ZM11 14.7502H9.5C9.086 14.7502 8.75 14.4142 8.75 14.0002C8.75 13.5862 9.086 13.2502 9.5 13.2502H11C11.414 13.2502 11.75 13.5862 11.75 14.0002C11.75 14.4142 11.414 14.7502 11 14.7502ZM11 11.7502H9.5C9.086 11.7502 8.75 11.4142 8.75 11.0002C8.75 10.5862 9.086 10.2502 9.5 10.2502H11C11.414 10.2502 11.75 10.5862 11.75 11.0002C11.75 11.4142 11.414 11.7502 11 11.7502ZM11 8.75022H9.5C9.086 8.75022 8.75 8.41422 8.75 8.00022C8.75 7.58622 9.086 7.25022 9.5 7.25022H11C11.414 7.25022 11.75 7.58622 11.75 8.00022C11.75 8.41422 11.414 8.75022 11 8.75022ZM11 5.75022H9.5C9.086 5.75022 8.75 5.41422 8.75 5.00022C8.75 4.58622 9.086 4.25022 9.5 4.25022H11C11.414 4.25022 11.75 4.58622 11.75 5.00022C11.75 5.41422 11.414 5.75022 11 5.75022Z"
                                        fill="#8C8C8C"
                                    ></path>
                                    <path
                                        d="M23.12 10.8421L16 9.35107V24.0001H22.75C23.715 24.0001 24.5 23.2151 24.5 22.2501V12.5521C24.5 11.7261 23.937 11.0231 23.12 10.8421ZM20.75 21.0001H19.25C18.836 21.0001 18.5 20.6641 18.5 20.2501C18.5 19.8361 18.836 19.5001 19.25 19.5001H20.75C21.164 19.5001 21.5 19.8361 21.5 20.2501C21.5 20.6641 21.164 21.0001 20.75 21.0001ZM20.75 18.0001H19.25C18.836 18.0001 18.5 17.6641 18.5 17.2501C18.5 16.8361 18.836 16.5001 19.25 16.5001H20.75C21.164 16.5001 21.5 16.8361 21.5 17.2501C21.5 17.6641 21.164 18.0001 20.75 18.0001ZM20.75 15.0001H19.25C18.836 15.0001 18.5 14.6641 18.5 14.2501C18.5 13.8361 18.836 13.5001 19.25 13.5001H20.75C21.164 13.5001 21.5 13.8361 21.5 14.2501C21.5 14.6641 21.164 15.0001 20.75 15.0001Z"
                                        fill="#BFBFBF"
                                    ></path>
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="24" height="24" fill="white" transform="translate(0.5)"></rect>
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>Tìm Nhanh</span>
                        </button>
                    </div>
                    <div className={cx('vntsearch', 'row')}>
                        <div className={cx('placeInput', 'col-sm-6')}>
                            <p>Thành phố, địa điểm hoặc tên khách sạn</p>

                            <Input
                                size="large"
                                placeholder="Nhập điểm đến, khách sạn"
                                value={search}
                                onChange={handleChangeInput}
                                onFocus={() => setSuggest(true)}
                                onBlur={handleBlur}
                            />

                            <div
                                className={cx('suggestDefault')}
                                style={suggest ? { display: 'block' } : { display: 'none' }}
                            >
                                <div className={cx('suggestDefault_body')}>
                                    <ul className={cx('listPlace')}>
                                        {locations.length > 0 ? (
                                            <div>
                                                <div className={cx('suggestDefault_title')}>
                                                    <span>Khu vực</span>
                                                </div>
                                                {locations.map((location, index) => {
                                                    return (
                                                        <button
                                                            key={index}
                                                            className={cx('listPlace_click')}
                                                            onClick={() =>
                                                                handleSelect({ select: location, type: 'areas' })
                                                            }
                                                        >
                                                            <li className={cx('listPlace_item')}>
                                                                <span>{location.name}</span>
                                                                <div className={cx('listPlace_label')}>
                                                                    {location.type}
                                                                </div>
                                                            </li>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div></div>
                                        )}
                                        {hotels.lenght > 0 ? (
                                            <div></div>
                                        ) : (
                                            <div>
                                                <div className={cx('suggestDefault_title')}>
                                                    <span>Khách Sạn</span>
                                                </div>
                                                {hotels.map((hotel, index) => {
                                                    return (
                                                        <button
                                                            key={index}
                                                            className={cx('listPlace_click')}
                                                            onClick={() =>
                                                                handleSelect({ select: hotel, type: 'hotels' })
                                                            }
                                                        >
                                                            <li className={cx('listPlace_item')}>
                                                                <span>{hotel.hotelName}</span>
                                                            </li>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <p>Ngày nhận phòng / trả phòng</p>
                            <div className={cx('search-right')}>
                                <RangePicker
                                    size="large"
                                    disabledDate={disabledDate}
                                    ranges={{
                                        Today: [moment(), moment().subtract(-1, 'days')],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    defaultValue={[
                                        moment(checkinDate, dateFormat),
                                        moment(checkinDate, dateFormat).subtract(-night, 'days'),
                                    ]}
                                    className={cx('dates-input')}
                                    onChange={(e) => {
                                        setCheckInDate(e[0].format('YYYY-MM-DD'));
                                        const tmp = (e[1] - e[0]) / (24 * 3600 * 1000);
                                        setNight(tmp);
                                    }}
                                />
                                <button
                                    className={cx('search-btn', 'btn', 'btn-primary')}
                                    onClick={() =>
                                        navigate(
                                            `/hotels?checkinDate=${checkinDate}&night=${night}&type=${locationType}&namelocation=${namelocation}`,
                                        )
                                    }
                                >
                                    Tìm Kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
