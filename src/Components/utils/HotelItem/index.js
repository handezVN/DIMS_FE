import classNames from 'classnames/bind';
import styles from './index.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const HotelItem = (props) => {
    const price = parseInt(props.price);
    const oldPrice = parseInt(props.oldPrice);
    const navigator = useNavigate();
    const HandleViewRoom = () => {
        window.open(
            `/hotels/hoteldetail?hotelId=${props.id}&ArrivalDate=${props.checkinDate}&TotalNight=${
                props.night
            }&peopleQuanity=${1}`,
        );
    };
    return (
        <div className="listHotel__item">
            <div className="hotelItem">
                <div className="row">
                    <div className={cx('hotelItem__img', 'col-lg-4 col-4')}>
                        <img src={props.image} alt={props.name} class="" />
                    </div>
                    <div className={cx('hotelItem_mobile', 'col-lg-8', 'col-8')}>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="hotelItem__left">
                                    <h3>{props.name}</h3>
                                    <span>{props.address}</span>
                                    <br />
                                    <span>Dịch vụ</span>
                                    <br />
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="hotelItem__right">
                                    <del>{oldPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })} VNĐ</del>
                                    <br />
                                    <span color="red">
                                        {price.toLocaleString(undefined, { maximumFractionDigits: 0 })} VNĐ
                                    </span>
                                    <i>/phòng/đêm</i>
                                    <Button type="primary" className={cx('btn-viewroom')} onClick={HandleViewRoom}>
                                        <b>Xem phòng</b>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('mobile-click')} onClick={HandleViewRoom}></div>
        </div>
    );
};
export default HotelItem;
