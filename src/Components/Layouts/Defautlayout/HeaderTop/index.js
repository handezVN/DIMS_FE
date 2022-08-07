import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogout } from '../../../../redux/actions/authAction';
import styles from './HeaderTop.module.scss';
import classNames from 'classnames/bind';
import logo from './Icon/vntrip.png';
import vnFlag from './Icon/vietnam.png';
import euFlag from './Icon/united-kingdom.png';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiClose, mdiHomeCity, mdiHomeOutline } from '@mdi/js';
import { Button, Empty, InputNumber } from 'antd';
import { useState } from 'react';
import moment from 'moment';
const cx = classNames.bind(styles);

export default function Header() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const isLogged = auth.isLogged;
    const handleLogout = () => {
        dispatch(dispatchLogout());
    };
    const [listCart, setListCart] = useState([]);
    const [numberRoom, setNumberRoom] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigator = useNavigate();
    const addCart = useSelector((state) => state.addCartReducer.cartFetch);
    useEffect(() => {
        const readCard = JSON.parse(localStorage.getItem('add_booking_cart'));
        if (readCard !== null) {
            let count = 0;
            let total = 0;
            readCard.forEach((element) => {
                count = count + element.roomQuantity;
                total = total + element.price * element.roomQuantity;
            });
            setNumberRoom(count);
            setTotalPrice(total);
            setListCart(readCard);
        }
    }, [localStorage.getItem('add_booking_cart'), addCart]);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleRemoveCart = (categoryId) => {
        const newData = listCart.filter((e) => e.categoryId !== categoryId);
        localStorage.setItem('add_booking_cart', JSON.stringify(newData));
        setListCart(newData);
    };
    const handleChangeRoom = (e, categoryId) => {
        const newData = listCart.map((item) => {
            if (item.categoryId === categoryId) {
                item.roomQuantity = e;
            }
            return item;
        });
        localStorage.setItem('add_booking_cart', JSON.stringify(newData));
        setListCart(newData);
    };
    const handlePayment = () => {
        const readCard = JSON.parse(localStorage.getItem('add_booking_cart'));
        let newContext = readCard[0];
        newContext.roomId = readCard[0].roomId.slice(0, readCard[0].roomQuantity);
        newContext.roomQuantity = [readCard[0].roomQuantity];
        newContext.title = [readCard[0].title];
        newContext.price = totalPrice;
        listCart.forEach((cart, index) => {
            if (index > 0) {
                newContext.title = [...newContext.title, cart.title];
                const room = cart.roomId.slice(0, cart.roomQuantity);
                newContext.roomId = [...newContext.roomId, ...room];
                newContext.roomQuantity = [...newContext.roomQuantity, cart.roomQuantity];
            }
        });
        localStorage.setItem('booking', JSON.stringify(newContext));
        navigator('/payment/step1');
    };
    return (
        <header>
            <nav
                className={cx(
                    'navbar',
                    'navbar-expand-lg',
                    'navbar-light ',
                    'headertop-navbar',
                    scrollPosition > 48 ? 'navbar-fixed' : '',
                )}
            >
                <div className={cx('container-fluid', 'container')}>
                    <div className="navbar-brand">
                        <img className={cx('logo-vntrip')} src={logo} alt="Logo" />
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className={cx('collapse', 'navbar-collapse', 'topheader-navbar')} id="navbarSupportedContent">
                        <ul className={cx('navbar-nav', ' me-auto', 'mb-2', 'mb-lg-0', 'topheader-navbar-items')}>
                            <li className={cx('nav-item ', 'hot-line')}>
                                <div className={cx('dropdown', 'hot-line-item')}>
                                    <i className="fa-solid fa-phone" style={{ padding: 5 }}></i>
                                    <span>Hotline</span>
                                    <div className={cx('dropdown-content')}>
                                        <p>Hỗ trợ:</p>
                                        <p>Mắng vốn:</p>
                                    </div>
                                </div>
                            </li>
                            {/* <li className={cx("nav-item" ,"dropdown","headertop-dropdown")}>
           <button className={cx("nav-link dropdown-toggle",'Lang-btn')} id="currentDropdown" data-bs-toggle="dropdown" aria-expanded="false"> <span>VND</span> </button>
            <ul className="dropdown-menu" aria-labelledby="currentDropdown">
                <button className={cx('Lang-btn')} style={{width:'100%'}}>
                <li className='d-flex'>
                    <span style={{width:'30%',color:'#389e0d'}}>VNĐ</span ><p style={{fontSize:'14px'}}>Việt Nam Đồng</p>
                </li>
                <li><hr className={cx("dropdown-divider")} /></li>
                </button>
                <button className={cx('Lang-btn')} style={{width:'100%'}}>
                <li className='d-flex'><span style={{width:'30%',color:'#389e0d'}}>USD</span ><p style={{fontSize:'14px'}}>Dollar US</p></li>
                </button>
            </ul>
        </li>
        <li className={cx("nav-item" ,"dropdown","headertop-dropdown")}>
          <button className={cx("nav-link dropdown-toggle",'Lang-btn')}  id="navbarDropdown"  data-bs-toggle="dropdown" aria-expanded="false">
          <img className={cx('flag')} src={vnFlag} alt="VietNam Flag"></img>
                             <span>Tiếng Việt</span>
          </button>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><button className={cx("dropdown-item",'Lang-btn')} href="#">
            <img className={cx('flag')} src={vnFlag} alt="VietNam Flag"></img>
                                 <span>Tiếng Việt</span>
                </button></li>
            <li><hr className={cx("dropdown-divider")} /></li>
            <li><button className={cx("dropdown-item",'Lang-btn')} href="#">
            <img className={cx('flag')} src={euFlag} alt="English Flag"></img> <span>English</span> 
                </button></li>
          </ul>
        </li> */}
                        </ul>

                        <div className={cx('headertop-right')}>
                            {isLogged === true ? (
                                <li>
                                    <button className={cx('btn-login', 'btn-primary', 'btn')} onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login">
                                            <button className={cx('btn-login', 'btn-primary', 'btn')}>Đăng nhập</button>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register">
                                            <button className={cx('btn-register', 'btn-primary', 'btn')}>
                                                Đăng Ký
                                            </button>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </div>
                        <div className={cx('card')}>
                            <div className={cx('card-hover')}>
                                {listCart.length < 1 ? (
                                    <div
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Empty
                                            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                                            imageStyle={{
                                                height: 60,
                                            }}
                                            description={<span>Bạn chưa có thêm phòng nào</span>}
                                        >
                                            <Button type="primary" onClick={() => navigator('/')}>
                                                Tìm kiếm ngay
                                            </Button>
                                        </Empty>
                                    </div>
                                ) : (
                                    <div style={{ padding: 20 }}>
                                        <div className={cx('cart-hotel')}>
                                            <div className={cx('cart-hotel-img')}>
                                                <img src={listCart[0].hotelImg[0].photoUrl}></img>
                                            </div>
                                        </div>
                                        <div className={cx('inner-right-content-title')}>
                                            <b>
                                                <h5
                                                    onClick={() => {
                                                        navigator(
                                                            `/hotels/hoteldetail?hotelId=${listCart[0].hotelId}&ArrivalDate=${listCart[0].date}&TotalNight=${listCart[0].night}&peopleQuanity=1`,
                                                        );
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {listCart[0].hotelname}
                                                </h5>
                                            </b>
                                        </div>
                                        <div className={cx('row', 'inner-right-content-address')}>
                                            <div className={cx('inner-right-content-address-icon', 'col-1')}>
                                                <i class="fa-solid fa-location-dot"></i>
                                            </div>
                                            <div className="col-11">
                                                <span>{listCart[0].hotelAddress}</span>
                                            </div>
                                        </div>
                                        <div className={cx('inner-right-content-info')}>
                                            <div>
                                                <span>Ngày nhận phòng</span>
                                            </div>
                                            <div>
                                                <span>{moment(listCart[0].date).format('DD-MM-YYYY')}</span>
                                            </div>
                                        </div>
                                        <div className={cx('inner-right-content-info')}>
                                            <div>
                                                <span>Ngày trả phòng</span>
                                            </div>
                                            <div>
                                                <span>
                                                    {moment(listCart[0].date)
                                                        .subtract(-listCart[0].night, 'days')
                                                        .format('DD-MM-YYYY')}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={cx('inner-right-content-info')}>
                                            <div>
                                                <span>Số đêm</span>
                                            </div>
                                            <div>
                                                <span>{listCart[0].night} đêm</span>
                                            </div>
                                        </div>
                                        <hr></hr>
                                        <div>
                                            {listCart.map((cart) => {
                                                return (
                                                    <div className={cx('cart-category')}>
                                                        <div
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                right: 5,
                                                                cursor: 'pointer',
                                                            }}
                                                            onClick={() => handleRemoveCart(cart.categoryId)}
                                                        >
                                                            <Icon path={mdiClose} size={'24px'}></Icon>
                                                        </div>
                                                        <div className={cx('cart-category-img')}>
                                                            <img src={cart.categoryImg.photoUrl}></img>
                                                        </div>
                                                        <div className={cx('cart-category-content')}>
                                                            <div>{cart.title}</div>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <div>Số lượng</div>
                                                                <div>
                                                                    <InputNumber
                                                                        min={1}
                                                                        max={cart.maxRoom}
                                                                        value={cart.roomQuantity}
                                                                        onChange={(e) =>
                                                                            handleChangeRoom(e, cart.categoryId)
                                                                        }
                                                                    />{' '}
                                                                    Phòng
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <div>Giá Phòng</div>
                                                                <div>
                                                                    <span style={{ color: '#0d6efd' }}>
                                                                        {(cart.price * 1000).toLocaleString(undefined, {
                                                                            maximumFractionDigits: 0,
                                                                        })}
                                                                    </span>{' '}
                                                                    VNĐ
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <hr></hr>
                                        <div className={cx('cart-total')}>
                                            <div>Total:</div>
                                            <div>
                                                <span style={{ color: '#0d6efd' }}>
                                                    {(totalPrice * 1000).toLocaleString(undefined, {
                                                        maximumFractionDigits: 0,
                                                    })}
                                                </span>{' '}
                                                VNĐ
                                            </div>
                                        </div>
                                        <div className={cx('cart-payment')}>
                                            <div className={cx('cart-payment-btn')} onClick={() => handlePayment()}>
                                                Payment
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Icon path={mdiHomeCity} size={'30px'}></Icon>
                            <div className={cx('text-card')}>
                                Phòng bạn đã chọn <div>{`(${numberRoom})`} phòng</div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
