import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import {
    dispatchFailed,
    dispatchFecth,
    dispatchGetUser,
    dispatchLogin,
    dispatchSuccess,
} from '../../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import * as authApi from '../../../../src/api/authApi';
import { message } from 'antd';
import { notification } from 'antd';
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
    const [islogin, setisLogin] = useState(true);
    const [isforgot, setIsForGot] = useState(false);
    const key = 'updatable';
    const { email, password, cfPassword, codeActive } = user;
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    };

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
            dispatch(dispatchSuccess());
            // const res = await axios.post('/api/Auth/login-user', { email, password });
        } catch (err) {
            err.message && setUser({ ...user, err: err.message, success: '' });
            console.log(err.message);
        }
    };

    const openNotificationWithIcon = (type, title, content) => {
        notification[type]({
            message: title,
            description: content,
        });
    };
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
                        dispatch(dispatchGetUser());
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
                openNotificationWithIcon('error', 'Error', 'Email này đã được đăng ký !');
                err.message && setUser({ ...user, err: err.message, success: '' });
            });
        // localStorage.setItem('user', JSON.stringify(token));
        // alert('Login Succes');
        // window.location.href = '/';
    };
    const [updateInfo, setUpdateInfo] = useState(false);
    const handleForgotPassWord = () => {
        authApi
            .Forgot_Password(email)
            .then((result) => {
                setUpdateInfo(true);
                openNotificationWithIcon(
                    'success',
                    'Success',
                    'Đã gửi yêu cầu khôi phục mật khẩu , vui lòng kiểm trả email của bạn !',
                );
            })
            .catch((err) => {
                console.log(err);
                openNotificationWithIcon(
                    'error',
                    'Error',
                    'Vui lòng kiểm tra lại email hoặc tài khoản của bạn chưa được đăng ký !',
                );
            });
    };
    const handleChangePassWord = () => {
        let check = true;
        let msg = '';
        if (email.length < 1) {
            check = false;
            msg = msg + 'Bạn chưa nhập tên đăng nhập \n';
        }
        if (password.length < 6) {
            check = false;
            msg = msg + 'Password cần phải lớn hơn 5 ký tự\n';
        }
        if (password !== cfPassword) {
            check = false;
            msg = msg + 'Password và Confirm Password không giống nhau\n';
        }
        if (check) {
            authApi
                .ChangeForGot_Password(email, password, cfPassword, codeActive)
                .then((result) => {
                    openNotificationWithIcon('success', 'Success', 'Đã thay đổi mật khẩu thành công !');
                    setUpdateInfo(false);
                    setIsForGot(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            openNotificationWithIcon('warning', 'Warning', msg);
        }
    };
    return (
        <div>
            <div className={cx('login-popup')}>
                <div className={cx('login-container')}>
                    {isforgot ? (
                        updateInfo ? (
                            <div className={cx('loginForm')}>
                                <h4>Khôi phục Mật Khẩu</h4>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Email hoặc số điện thoại"
                                        value={email}
                                        name="email"
                                        onChange={handleChangeInput}
                                        minLength={5}
                                    />
                                    <small id="emailHelp" className="form-text text-muted">
                                        We'll never share your email with anyone else.
                                    </small>
                                    <div></div>
                                    <label htmlFor="exampleInputEmail1">Password</label>
                                    <div className={cx('form-group')}>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="InputPassword"
                                            placeholder="Mật khẩu"
                                            value={password}
                                            name="password"
                                            onChange={handleChangeInput}
                                            minLength={5}
                                        />
                                    </div>
                                    <label htmlFor="exampleInputEmail1">Confirm Password</label>
                                    <div className={cx('form-group')}>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="InputConfirmPassword"
                                            placeholder="Nhập lại Mật khẩu"
                                            value={cfPassword}
                                            name="cfPassword"
                                            onChange={handleChangeInput}
                                            minLength={5}
                                        />
                                    </div>
                                    <label htmlFor="exampleInputEmail1">Code Active</label>
                                    <div className={cx('form-group')}>
                                        <input
                                            className="form-control"
                                            id="InputCode"
                                            placeholder="Nhập Code Active"
                                            value={codeActive}
                                            name="codeActive"
                                            onChange={handleChangeInput}
                                            maxLength={6}
                                            minLength={1}
                                        />
                                    </div>
                                    <br></br>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={() => handleChangePassWord()}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={cx('loginForm')}>
                                <div className="form-group">
                                    <h4>Quên Mật Khẩu</h4>
                                    <label htmlFor="exampleInputEmail1">Email address</label>
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
                                    <div className={cx('Forgot_Password')} onClick={() => setIsForGot(!isforgot)}>
                                        <span>Đăng nhập</span>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={() => handleForgotPassWord()}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )
                    ) : islogin ? (
                        <form className={cx('loginForm')} onSubmit={handleSubmitLogin}>
                            <div className={cx('loginForm-title')}>
                                {' '}
                                <h4>Đăng Nhập</h4> <h6>Bạn vui lòng đăng nhập để tiếp tục</h6>
                            </div>

                            <div className={cx('form-group', 'input')}>
                                <label htmlFor="exampleInputEmail1">Email address</label>
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
                            <div className={cx('form-group', 'input')}>
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
                                Chưa có tài khoản ?{' '}
                                <Link onClick={() => setisLogin(false)} to={''}>
                                    Đăng ký
                                </Link>
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
                    ) : (
                        <form className={cx('loginForm')} onSubmit={handleSubmitRegister}>
                            <h4 className={cx('loginForm-title')}>
                                Đăng Ký <h6>Bạn vui lòng đăng nhập để tiếp tục</h6>
                            </h4>

                            <div className={cx('form-group', 'input')}>
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
                            <div className={cx('form-group', 'input')}>
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
                            <div className={cx('form-group', 'input')}>
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
                                Bạn đã có tài khoản ?{' '}
                                <Link to="" onClick={() => setisLogin(true)}>
                                    Đăng nhập
                                </Link>
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
                    )}
                </div>
                <div className={cx('login-popup-over')}></div>
            </div>{' '}
        </div>
    );
}
