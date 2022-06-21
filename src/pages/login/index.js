import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import { dispatchFailed, dispatchFecth, dispatchLogin, dispatchSuccess } from '../../redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { showErrMsg, showSuccessMsg } from '../../Components/utils/notification/notification';
import * as authApi from '../../api/authApi';
const initialState = {
    email: '',
    password: '',
    err: '',
    success: '',
};
function Login() {
    const cx = classNames.bind(styles);
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, password, err, success } = user;
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(dispatchFecth());
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
                    err.message && setUser({ ...user, err: err.message, success: '' });
                });
            // const res = await axios.post('/api/Auth/login-user', { email, password });
        } catch (err) {
            err.message && setUser({ ...user, err: err.message, success: '' });
            console.log(err.message);
        }
        // localStorage.setItem('user', JSON.stringify(token));
        // alert('Login Succes');
        // window.location.href = '/';
    };
    return (
        <>
            <div className={cx('container')}>
                <form className={cx('loginForm')} onSubmit={handleSubmit}>
                    <h4>Đăng Nhập</h4>
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
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
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
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
                    <Link to="/forgotPassword">
                        <div>
                            <span>Quên mật khẩu</span>
                        </div>
                    </Link>

                    <button type="submit" className="btn btn-primary">
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
                        Chưa có tài khoản ? <Link to="/register">Đăng ký</Link>
                    </span>
                </form>
            </div>
        </>
    );
}

export default Login;
