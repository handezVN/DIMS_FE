import { React } from 'react';
import Banner from '../../Components/Layouts/Defautlayout/Banner';
import classNames from 'classnames/bind';
import styles from './index.scss';
import SearchBox from '../../Components/utils/SearchBox';
function Home() {
    const cx = classNames.bind(styles);

    return (
        <div>
            <Banner />

            <SearchBox />
            <div className="homePlace">
                <h4 className={cx('text-center', 'mb30')}>ĐIỂM ĐẾN VIỆT NAM PHỔ BIẾN</h4>

                <div className="container">
                    <div className="row">
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')}>
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
                            <div className={cx('homePlace__item')}>
                                <img src="https://statics.vntrip.vn/website/images/dest.181x181.01.png" alt="Đà Nẵng" />
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
                            <div className={cx('homePlace__item')}>
                                <img src="https://statics.vntrip.vn/images/dest/dest.181x181.02.png" alt="Hội An" />
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
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')}>
                                <img
                                    src="https://statics.vntrip.vn/images/dest/dest.373x181.02.png"
                                    alt="Tp. Hồ Chí Minh"
                                />
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
                    </div>
                    <div className="row">
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')}>
                                <img src="https://statics.vntrip.vn/images/dest/dest.373x181.03.png" alt="Phú Quốc" />
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
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')}>
                                <img src="https://statics.vntrip.vn/images/dest/dest.373x181.04.png" alt="Nha Trang" />
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
                        <div className={cx('homePlace__col', 'col-xs-12', 'col-sm-4')}>
                            <div className={cx('homePlace__item')}>
                                <img src="https://statics.vntrip.vn/images/dest/dest.373x181.05.png" alt="Đà Lạt" />
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
