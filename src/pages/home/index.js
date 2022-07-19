import { React } from 'react';
import Banner from '../../Components/Layouts/Defautlayout/Banner';
import classNames from 'classnames/bind';
import styles from './index.scss';
import SearchBox from '../../Components/utils/SearchBox';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
function Home() {
    const cx = classNames.bind(styles);
    const navigation = useNavigate();
    const handleNavigate = (title) => {
        navigation(`/hotels?checkinDate=${moment().format('YYYY-MM-DD')}&night=1&type=areas&namelocation=${title}`);
    };
    return (
        <div>
            <Banner />
            <SearchBox />
            <div className="homePlace">
                <h4 className={cx('text-center', 'mb30')}>ĐIỂM ĐẾN VIỆT NAM PHỔ BIẾN</h4>

                <div className="container">
                    <div className="row">
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')} onClick={() => handleNavigate('Hà Nội')}>
                                <img src="https://statics.vntrip.vn/website/images/dest.373x181.01.png" alt="Hà Nội" />
                                <div className={cx('homePlace__cont')}>
                                    <h3 className="text-center">Hà Nội</h3>
                                    <div className="homePlace__list">
                                        <ul>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>1000 khách sạn Hà
                                                    Nội
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Cẩm nang du lịch Hà
                                                    Nội
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Khuyến mại du lịch
                                                    Hà Nội
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('homePlace__col', 'col-xs-6', 'col-sm-2')}>
                            <div className={cx('homePlace__item')} onClick={() => handleNavigate('Đà Nẵng')}>
                                <img src="https://statics.vntrip.vn/website/images/dest.181x181.01.png" alt="Đà Nẵng" />
                                <div className={cx('homePlace__cont')}>
                                    <h3 className="text-center">Đà Nẵng</h3>
                                    <div className="homePlace__list">
                                        <ul>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>10 khách sạn Đà Nẵng
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Cẩm nang du lịch Đà
                                                    Nẵng
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Khuyến mại du lịch
                                                    Đà Nẵng
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('homePlace__col', 'col-xs-6', 'col-sm-2')}>
                            <div className={cx('homePlace__item')} onClick={() => handleNavigate('Vũng Tàu')}>
                                <img src="https://statics.vntrip.vn/images/dest/dest.181x181.02.png" alt="Vũng Tàu" />
                                <div className={cx('homePlace__cont')}>
                                    <h3 className="text-center">Vũng Tàu</h3>
                                    <div className="homePlace__list">
                                        <ul>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>1000 khách sạn Vũng
                                                    Tàu
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Cẩm nang du lịch
                                                    Vũng Tàu
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Khuyến mại du lịch
                                                    Vũng Tàu
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')} onClick={() => handleNavigate('Hồ Chí Minh')}>
                                <img
                                    src="https://statics.vntrip.vn/images/dest/dest.373x181.02.png"
                                    alt="Tp. Hồ Chí Minh"
                                />
                                <div className={cx('homePlace__cont')}>
                                    <h3 className="text-center">Hồ Chí Minh</h3>
                                    <div className="homePlace__list">
                                        <ul>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>1000 khách sạn Hồ
                                                    Chí Minh
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Cẩm nang du lịch Hồ
                                                    Chí Minh
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Khuyến mại du lịch
                                                    Hồ Chí Minh
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')} onClick={() => handleNavigate('Phú Quốc')}>
                                <img src="https://statics.vntrip.vn/images/dest/dest.373x181.03.png" alt="Phú Quốc" />
                                <div className={cx('homePlace__cont')}>
                                    <h3 className="text-center">Phú Quốc</h3>
                                    <div className="homePlace__list">
                                        <ul>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>1000 khách sạn Phú
                                                    Quốc
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Cẩm nang du lịch Phú
                                                    Quốc
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Khuyến mại du lịch
                                                    Phú Quốc
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')} onClick={() => handleNavigate('Nha Trang')}>
                                <img src="https://statics.vntrip.vn/images/dest/dest.373x181.04.png" alt="Nha Trang" />
                                <div className={cx('homePlace__cont')}>
                                    <h3 className="text-center">Nha Trang</h3>
                                    <div className="homePlace__list">
                                        <ul>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>1000 khách sạn Nha
                                                    Trang
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Cẩm nang du lịch Nha
                                                    Trang
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Khuyến mại du lịch
                                                    Nha Trang
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')} onClick={() => handleNavigate('Đà Lạt')}>
                                <img src="https://statics.vntrip.vn/images/dest/dest.373x181.05.png" alt="Đà Lạt" />
                                <div className={cx('homePlace__cont')}>
                                    <h3 className="text-center">Đà Lạt</h3>
                                    <div className="homePlace__list">
                                        <ul>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>1000 khách sạn Đà
                                                    Lạt
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Cẩm nang du lịch Đà
                                                    Lạt
                                                </span>
                                            </li>
                                            <li>
                                                <span>
                                                    <i className="fa-solid fa-magnifying-glass"></i>Khuyến mại du lịch
                                                    Đà Lạt
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
