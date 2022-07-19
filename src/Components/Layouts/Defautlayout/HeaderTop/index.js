import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogout } from '../../../../redux/actions/authAction';
import styles from './HeaderTop.module.scss';
import classNames from 'classnames/bind';
import logo from './Icon/vntrip.png';
import vnFlag from './Icon/vietnam.png';
import euFlag from './Icon/united-kingdom.png';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

export default function Header() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const isLogged = auth.isLogged;
    const handleLogout = () => {
        dispatch(dispatchLogout());
    };
    return (
        <header>
            <nav className={cx("navbar", "navbar-expand-lg" ,"navbar-light ","headertop-navbar")}>
  <div className={cx("container-fluid",'container')}>
    <div className="navbar-brand" ><img className={cx('logo-vntrip')} src={logo} alt="Logo" /></div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className={cx("collapse","navbar-collapse","topheader-navbar")} id="navbarSupportedContent">
      <ul className={cx("navbar-nav"," me-auto" ,"mb-2" ,"mb-lg-0","topheader-navbar-items")}>
        <li className={cx("nav-item ",'hot-line')}>
            <div className={cx('dropdown','hot-line-item')}>
                <i className="fa-solid fa-phone" style={{ padding: 5 }}></i>
                <span>Hotline</span>
                <div className={cx('dropdown-content')}>
                    <p>Hỗ trợ:</p>
                    <p>Mắng vốn:</p>
                </div>
            </div>
        </li>
        <li className={cx("nav-item" ,"dropdown","headertop-dropdown")}>
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
        </li>
        
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
                                    <button className={cx('btn-register', 'btn-primary', 'btn')}>Đăng Ký</button>
                                </Link>
                            </li>
                        </>
                    )}
      </div>
    </div>
  </div>
</nav>

        </header>
    );
}
