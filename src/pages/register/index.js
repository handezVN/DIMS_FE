import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './register.module.scss';
import { showErrMsg, showSuccessMsg } from '../../Components/utils/notification/notification';
import * as authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { dispatchFailed, dispatchFecth, dispatchLogin, dispatchSuccess } from '../../redux/actions/authAction';
import { notification } from 'antd';
const initialState = {
    email: '',
    password: '',
    cfPassword: '',
    err: '',
    success: '',
};
export default function Register() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(initialState);
    const { email, password, cfPassword, err, success } = user;
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    };
    const openNotificationWithIcon = (type, title, content) => {
        notification[type]({
            message: title,
            description: content,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        let check = true;
        let msg = '';
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (email.length < 1) {
            check = false;
            msg = msg + 'Bạn chưa nhập tên đăng nhập \n';
        }
        if (!filter.test(email)) {
            check = false;
            msg = msg + 'Please provide a valid email address\n';
        }
        if (password.length < 6) {
            check = false;
            msg = msg + 'Password cần phải lớn hơn 5 ký tự \n';
        }
        if (cfPassword !== password) {
            check = false;
            msg = msg + 'Confirm not match the password \n';
        }
        if (check) {
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
                            navigate('/');
                        })
                        .catch((err) => {
                            dispatch(dispatchFailed(err));
                            // openNotificationWithIcon('error', 'Error', 'Email này đã được sử dụng !');
                        });
                    // setUser({ ...user, err: '', success: data.msg });
                    // localStorage.setItem('user', JSON.stringify(data));
                    // dispatch(dispatchRegister(data));
                    // navigate('/');
                })
                .catch((err) => {
                    dispatch(dispatchFailed(err));
                    openNotificationWithIcon('error', 'Error', 'Email này đã được đăng ký !');
                });
        } else {
            openNotificationWithIcon('warning', 'Warning', msg);
        }

        // localStorage.setItem('user', JSON.stringify(token));
        // alert('Login Succes');
        // window.location.href = '/';
    };
    return (
        <>
            <div className={cx('container')}>
                <form className={cx('loginForm')} onSubmit={handleSubmit}>
                    <h4 className={cx('titleForm')}>Đăng Ký</h4>
                    <div className={cx('form-group')}>
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
                    <div className={cx('form-group')}>
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
                    <div className={cx('form-group')}>
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
                    <span style={{ padding: '10px 0' }}>Chúng tôi sẽ gửi mã xác thực cho bạn để đăng ký tài khoản</span>
                    <button type="submit" className={cx('btn', 'btn-primary', 'btn-register')}>
                        Submit
                    </button>
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
                    <span>
                        Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
                    </span>
                </form>
            </div>
        </>
    );
}
