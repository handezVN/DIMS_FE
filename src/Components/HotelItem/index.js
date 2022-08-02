import classNames from 'classnames/bind';
import styles from './index.module.scss';
import { Button } from 'antd';
const cx = classNames.bind(styles);
const HotelItem = (props) => {
    const price = parseInt(props.price);
    const oldPrice = parseInt(props.oldPrice);
    const HandleViewRoom = () => {
        window.open(
            `/hotels/hoteldetail?hotelId=${props.id}&ArrivalDate=${props.checkinDate}&TotalNight=${
                props.night
            }&peopleQuanity=${1}`,
        );
    };
    return (
        <div className="listHotel__item">
            <div className={cx('mobile-click')} onClick={HandleViewRoom}>
                <div className={cx('hotelItem')}>
                    <div className="row">
                        <div className={cx('hotelItem__img', 'col-lg-4 col-4')}>
                            <img src={props.image} alt={props.name} class="" />
                        </div>
                        <div className={cx('hotelItem_mobile', 'col-lg-8', 'col-8')}>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="hotelItem__left">
                                        <h3>
                                            {props.name}{' '}
                                            <div>
                                                {Array.from({ length: props.star }, (e) => {
                                                    return (
                                                        <i
                                                            className="fa-solid fa-star"
                                                            style={{ fontSize: '16px', color: '#2a78ec' }}
                                                        ></i>
                                                    );
                                                })}
                                            </div>
                                        </h3>
                                        <span>{props.address}</span>
                                        <br />

                                        <br />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="hotelItem__right">
                                        <div style={{ color: '#2a78ec' }}>
                                            Điểm Đánh Giá{' '}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <svg
                                                    width="32"
                                                    height="10"
                                                    viewBox="0 0 32 10"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        clip-rule="evenodd"
                                                        d="M12.9044 10L16.224 8.2918L19.5436 10L18.9096 6.38197L21.5952 3.81966L17.8838 3.2918L16.224 0L14.5642 3.2918L10.8528 3.81966L13.5384 6.38197L12.9044 10ZM11.1806 7.45236C10.8445 7.93589 6.1599 5.25182 4.25782 3.96241C4.01059 3.79823 3.79641 3.59082 3.62604 3.3506C3.43729 3.0902 3.39202 2.7554 3.50506 2.45591C3.52894 2.39111 3.56052 2.32928 3.59915 2.2717V2.24539C3.64287 2.19105 3.69121 2.14043 3.74366 2.09408C3.99412 1.8828 4.3362 1.80867 4.65437 1.89672C4.94329 1.97089 5.21563 2.09693 5.45754 2.26841C7.34954 3.58414 11.5066 6.95897 11.1705 7.44249L11.1806 7.45236ZM11.1974 8.53756C11.0025 9.25134 4.34184 8.05403 1.5425 7.33367C1.18011 7.24621 0.837988 7.09218 0.534329 6.87975C0.201688 6.65647 0.00203054 6.28774 0 5.89296C0.0010422 5.80753 0.0123212 5.72253 0.0336056 5.63968V5.60021C0.0579015 5.51777 0.0917258 5.43831 0.134422 5.36338C0.337646 5.01738 0.702445 4.79207 1.10898 4.76143C1.47969 4.72822 1.85347 4.76279 2.21125 4.8634C5.00387 5.60679 11.3822 7.82378 11.1873 8.54743L11.1974 8.53756ZM27.7388 3.9624C25.8367 5.2518 21.1555 7.93588 20.8194 7.45235L20.8362 7.44248C20.5002 6.95896 24.6605 3.58413 26.5492 2.2684C26.7914 2.0975 27.0637 1.97152 27.3524 1.89671C27.6663 1.8104 28.0036 1.88184 28.253 2.08749C28.3017 2.13509 28.3445 2.18808 28.3807 2.24538L28.3975 2.27169C28.4385 2.3284 28.4713 2.39039 28.4949 2.45589C28.6082 2.75579 28.5616 3.0912 28.3706 3.35058C28.2002 3.59081 27.986 3.79821 27.7388 3.9624ZM20.8026 8.53793C20.9975 9.25171 27.6581 8.05441 30.4575 7.33405C30.8196 7.24592 31.1616 7.09193 31.4657 6.88012C31.7992 6.65762 31.9991 6.2884 32 5.89333C31.9983 5.80815 31.9882 5.72332 31.9697 5.64005V5.60058C31.9428 5.51858 31.9079 5.43928 31.8656 5.36375C31.6632 5.01693 31.2979 4.79131 30.891 4.76181C30.5192 4.72872 30.1443 4.76329 29.7854 4.86378C26.9927 5.60716 20.6144 7.82416 20.8093 8.5478L20.8026 8.53793Z"
                                                        fill="#2a78ec"
                                                    ></path>
                                                </svg>
                                                {props.totalRate}
                                            </div>
                                        </div>
                                        <br></br>
                                        <br></br>
                                        <del>
                                            {oldPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })} VNĐ
                                        </del>

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
            </div>
        </div>
    );
};
export default HotelItem;
