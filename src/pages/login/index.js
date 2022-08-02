import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import { dispatchFailed, dispatchFecth, dispatchLogin, dispatchSuccess } from '../../redux/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import { showErrMsg, showSuccessMsg } from '../../Components/utils/notification/notification';
import { notification } from 'antd';
import * as authApi from '../../api/authApi';
const initialState = {
    email: '',
    password: '',
    err: '',
    success: '',
};
function Login() {
    const navigate = useNavigate();
    const isHost = useSelector((state) => state.auth.isHost);
    useEffect(() => {
        if (isHost === true) {
            navigate('/');
        }
    }, [isHost]);
    const cx = classNames.bind(styles);
    const [user, setUser] = useState(initialState);
    const dispatch = useDispatch();
    const { email, password, err, success, cfPassword, codeActive } = user;
    const [forgotPass, setForGotPass] = useState(true);
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
        if (email.length < 1) {
            check = false;
            msg = msg + 'Bạn chưa nhập tên đăng nhập | ';
        }
        if (password.length < 6) {
            check = false;
            msg = msg + 'Password cần phải lớn hơn 5 ký tự | ';
        }
        if (check) {
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
                        openNotificationWithIcon('success', 'Success', 'Đã đăng nhập thành công !');
                    })
                    .catch((err) => {
                        dispatch(dispatchFailed(err));
                        openNotificationWithIcon(
                            'error',
                            'Error',
                            'Vui lòng kiểm tra lại email hoặc mật khẩu của bạn !',
                        );
                    });
                // const res = await axios.post('/api/Auth/login-user', { email, password });
            } catch (err) {
                err.message && setUser({ ...user, err: err.message, success: '' });
                console.log(err.message);
            }
        } else {
            openNotificationWithIcon('warning', 'Warning', msg);
        }

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
                    setForGotPass(true);
                })
                .catch((err) => {
                    openNotificationWithIcon('error', 'Error', 'Mã Active Code này không khả dụng');
                });
        } else {
            openNotificationWithIcon('warning', 'Warning', msg);
        }
    };
    return (
        <>
            <div className={cx('container')}>
                {forgotPass ? (
                    <form className={cx('loginForm')} onSubmit={handleSubmit}>
                        <h4>Đăng Nhập</h4>
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

                        <div className={cx('Forgot_Password')} onClick={() => setForGotPass(!forgotPass)}>
                            <span>Quên mật khẩu</span>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <div className={cx('login_orWrapper')}>
                            <span className={cx('login_or')}>Hoặc</span>
                        </div>

                        <span>
                            Chưa có tài khoản ? <Link to="/register">Đăng ký</Link>
                        </span>
                    </form>
                ) : updateInfo ? (
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
                            <button type="submit" className="btn btn-primary" onClick={() => handleChangePassWord()}>
                                Submit
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={cx('loginForm')}>
                        <h4>Quên Mật Khẩu</h4>
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
                            <div className={cx('Forgot_Password')} onClick={() => setForGotPass(!forgotPass)}>
                                <span>Đăng nhập</span>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={() => handleForgotPassWord()}>
                                Submit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Login;
