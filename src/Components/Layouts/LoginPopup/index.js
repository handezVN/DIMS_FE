import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { dispatchFailed, dispatchFecth, dispatchLogin, dispatchSuccess } from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import * as authApi from '../../../../src/api/authApi';
import {  message } from 'antd';
const initialState = {
    email: '',
    password: '',
    err: '',
    success: '',
};
export default function LoginPopup() {
    const cx = classNames.bind(styles);
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, password, cfPassword } = user;
    const [islogin,setisLogin] = useState(true);
    const handleChangeInput = (e) => {
        const { name, value  } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    };
    const [isforgot,setIsForGot] = useState(false);
    const key = 'updatable';
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        try {
            dispatch(dispatchFecth());
            message.loading({ content: 'Loading...', key });
            authApi
                .LoginUser({ email, password })
                .then((data) => {
                    message.success({ content: 'Login Success !', key, duration: 2 });
                    localStorage.setItem('user', JSON.stringify(data));
                    dispatch(dispatchSuccess());
                    dispatch(dispatchLogin(data));
                    
                })
                .catch((err) => {
                    message.error({ content: 'Error ! Please check your account .', key, duration: 2 });
                    
                });
                dispatch(dispatchSuccess())
            // const res = await axios.post('/api/Auth/login-user', { email, password });
        } catch (err) {
            err.message && setUser({ ...user, err: err.message, success: '' });
            console.log(err.message);
        }
      }
      const handleSubmitRegister = async (e) => {
        e.preventDefault();
        dispatch(dispatchFecth());
        authApi
            .RegisterUser({ email, password, cfPassword })
            .then((data) => {
                dispatch(dispatchSuccess(data));
                authApi
                    .LoginUser({ email, password })
                    .then((data) => {
                        dispatch(dispatchSuccess(data));
                        setUser({ ...user, err: '', success: data.msg });
                        localStorage.setItem('user', JSON.stringify(data));
                        dispatch(dispatchLogin(data));
                        
                    })
                    .catch((err) => {
                        dispatch(dispatchFailed(err));
                        err.message && setUser({ ...user, err: err.message, success: '' });
                    });
                // setUser({ ...user, err: '', success: data.msg });
                // localStorage.setItem('user', JSON.stringify(data));
                // dispatch(dispatchRegister(data));
                // navigate('/');
            })
            .catch((err) => {
                dispatch(dispatchFailed(err));
                err.message && setUser({ ...user, err: err.message, success: '' });
            });
        // localStorage.setItem('user', JSON.stringify(token));
        // alert('Login Succes');
        // window.location.href = '/';
    };
  return (
    <div>  
    <div className={cx('login-popup')}>
    
        <div className={cx('login-container')}>
          {isforgot ? <div> 
            Nhập email
            <Link to="" onClick={() => setIsForGot(false)}>Đăng Nhập</Link>
          </div> : islogin ?
        <form className={cx('loginForm')} onSubmit={handleSubmitLogin}>
          <div className={cx('loginForm-title')}> <h4>Đăng Nhập</h4>  <h6>Bạn vui lòng đăng nhập để tiếp tục</h6></div>
          
                  
                    <div className={cx("form-group","input")}>
                        <label htmlFor="exampleInputEmail1" >Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Email hoặc số điện thoại"
                            value={email}
                            name="email"
                            onChange={handleChangeInput}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className={cx("form-group","input")}>
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Mật khẩu"
                            value={password}
                            name="password"
                            onChange={handleChangeInput}
                        />
                    </div>
                    <Link to="" onClick={() => setIsForGot(true)}>
                        <div>
                            <span>Quên mật khẩu</span>
                        </div>
                    </Link>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <span>
                        Chưa có tài khoản ? <Link onClick={() => setisLogin(false)} to={''}>Đăng ký</Link>
                    </span>
                    <div className={cx('login_orWrapper')}>
                        <span className={cx('login_or')}>Hoặc</span>
                    </div>

                    <div
                        className="fb-login-button"
                        data-width=""
                        data-size="large"
                        data-button-type="continue_with"
                        data-layout="default"
                        data-auto-logout-link="false"
                        data-use-continue-as="false"
                    ></div>
                    
                </form>
        
                : <form className={cx('loginForm')} onSubmit={handleSubmitRegister}>
                <h4 className={cx('loginForm-title')}>Đăng Ký <h6>Bạn vui lòng đăng nhập để tiếp tục</h6></h4>
              
                <div className={cx('form-group','input')}>
                  Email address
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Email hoặc số điện thoại"
                        value={email}
                        name="email"
                        onChange={handleChangeInput}
                    />
                </div>
                <div className={cx('form-group','input')}>
                  Password
                    <input
                        type="password"
                        className="form-control"
                        id="InputPassword"
                        placeholder="Mật khẩu"
                        value={password}
                        name="password"
                        onChange={handleChangeInput}
                    />
                </div>
                <div className={cx('form-group','input')}>
                  Confirm Password
                    <input
                        type="password"
                        className="form-control"
                        id="InputConfirmPassword"
                        placeholder="Nhập lại Mật khẩu"
                        value={cfPassword}
                        name="cfPassword"
                        onChange={handleChangeInput}
                    />
                </div>
                
                <button type="submit" className={cx('btn', 'btn-primary', 'btn-register')}>
                    Submit
                </button>
                <span>
                    Bạn đã có tài khoản ? <Link to="" onClick={() => setisLogin(true)}>Đăng nhập</Link>
                </span>
                <div className={cx('login_orWrapper')}>
                    <span className={cx('login_or')}>Hoặc</span>
                </div>
                <div
                    className="fb-login-button"
                    data-width=""
                    data-size="large"
                    data-button-type="continue_with"
                    data-layout="default"
                    data-auto-logout-link="false"
                    data-use-continue-as="false"
                ></div>
                
            </form>}</div>
        <div className={cx('login-popup-over')}></div>
    </div>  </div>
  )
}
